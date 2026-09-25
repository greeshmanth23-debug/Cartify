require('dotenv').config();
const express = require('express');
const fs = require('fs');
const path = require('path');
const session = require('express-session');
const multer = require('multer');
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB", err));

const userrole = require('./models/role');
const productdata = require('./models/product');
const cart = require('./models/cart');
const Order = require('./models/order');

const app = express();
const port = process.env.PORT || 5000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: false
    }
}));

app.use('/uploads', express.static(uploadsDir));

const oldUploadsDir = path.join(__dirname, '..', 'public', 'uploads');
if (fs.existsSync(oldUploadsDir)) {
    const files = fs.readdirSync(oldUploadsDir);
    files.forEach(file => {
        const src = path.join(oldUploadsDir, file);
        const dest = path.join(uploadsDir, file);
        if (!fs.existsSync(dest) && fs.statSync(src).isFile()) {
            fs.copyFileSync(src, dest);
        }
    });
}

function requireAuth(req, res, next) {
    if (!req.session.email) {
        return res.status(401).json({ error: 'Not authenticated' });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!req.session.email || req.session.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
    }
    next();
}

function requireUser(req, res, next) {
    if (!req.session.email || req.session.role !== 'user') {
        return res.status(403).json({ error: 'User access required' });
    }
    next();
}

app.post('/api/register', async (req, res) => {
    try {
        const { email, password } = req.body;
        const role = 'user'; // Hardcode role to user to prevent admin registration
        const check = await userrole.findOne({ email });
        if (check) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        const newUser = new userrole({ email, password, role });
        await newUser.save();
        res.json({ message: 'Registration successful' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const check = await userrole.findOne({ email, password });
        if (!check) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        req.session.email = email;
        req.session.role = check.role;
        res.json({ message: 'Login successful', role: check.role, email });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out' });
});

app.get('/api/me', (req, res) => {
    if (req.session.email) {
        res.json({ email: req.session.email, role: req.session.role });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
});

app.get('/api/products', async (req, res) => {
    try {
        const products = await productdata.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/products/:id', requireAuth, async (req, res) => {
    try {
        const product = await productdata.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/products/category/:category', async (req, res) => {
    try {
        const products = await productdata.find({ category: req.params.category });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/products', requireAdmin, upload.single('image'), async (req, res) => {
    try {
        const { name, price, discription, quantity, category } = req.body;
        const product = new productdata({
            name, price, discription, quantity, category,
            image: req.file ? req.file.filename : null
        });
        await product.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/products/:id', requireAdmin, async (req, res) => {
    try {
        const product = await productdata.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });

        const imagePath = path.join(uploadsDir, product.image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);

        await productdata.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/cart', requireUser, async (req, res) => {
    try {
        const cartitems = await cart.find({ email: req.session.email });
        const items = [];
        for (const cartitem of cartitems) {
            const item = await productdata.findById(cartitem.productid);
            if (item) items.push(item);
        }
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/cart/:id', requireUser, async (req, res) => {
    try {
        const newcart = new cart({
            productid: req.params.id,
            email: req.session.email
        });
        await newcart.save();
        res.json({ message: 'Added to cart' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/cart/:id', requireUser, async (req, res) => {
    try {
        await cart.findOneAndDelete({
            productid: req.params.id,
            email: req.session.email
        });
        res.json({ message: 'Removed from cart' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.post('/api/orders', requireUser, async (req, res) => {
    try {
        const { products } = req.body;
        if (!products || products.length === 0) {
            return res.status(400).json({ error: 'No products selected' });
        }

        let totalAmount = 0;
        const orderProducts = [];

        for (let item of products) {
            const product = await productdata.findById(item.id);
            if (!product) {
                return res.status(404).json({ error: `Product not found` });
            }

            const quantity = Number(item.quantity);
            if (!quantity || isNaN(quantity) || quantity <= 0) {
                return res.status(400).json({ error: `Invalid quantity for ${product.name}` });
            }
            if (quantity > product.quantity) {
                return res.status(400).json({
                    error: `Not enough stock for ${product.name}. Available: ${product.quantity}`
                });
            }

            product.quantity -= quantity;
            await product.save();

            totalAmount += product.price * quantity;
            orderProducts.push({ productId: product._id, quantity });
        }

        const order = await Order.create({
            email: req.session.email,
            products: orderProducts,
            totalAmount
        });

        res.json(order);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/orders', requireUser, async (req, res) => {
    try {
        const orders = await Order.find({ email: req.session.email })
            .populate('products.productId')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.get('/api/admin/orders', requireAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('products.productId')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
