require('dotenv').config();
const express=require('express');
const fs=require('fs');
const path = require('path');
const session=require('express-session');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });
const mongoose=require('mongoose');
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Error connecting to MongoDB", err));
const userrole=require('./models/role');
const productdata=require('./models/product');
const cart=require('./models/cart');
const app=express();
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}));
const bodyParser=require('body-parser');
const port=process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.static('public'));
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});
app.get('/',(req,res)=>{
    res.render('index');
})
app.get('/admin', async (req, res) => {

    if (!req.session.username || req.session.role !== 'admin') {
        return res.redirect('/');
    }

    const products = await productdata.find();

    const orders = await Order.find()
        .populate('products.productId')
        .sort({ createdAt: -1 });

    res.render('admin', { products, orders });
});
app.get('/register',(req,res)=>{
    res.render('register');
})
app.post('/register',async (req,res)=>{
    const check=await userrole.findOne({username:req.body.username});
    if(check){
        return res.send('<script>alert("Username already exists");window.location.href="/register";</script>');
    }
    const {username,password,role}=req.body;
    const newUser=new userrole({username,password,role});
    await newUser.save();
    res.redirect('/');
})
app.post('/login',async (req,res)=>{
    const {username,password}=req.body;
    const check=await userrole.findOne({username,password});
    if(!check){
       return res.send('<script>alert("Invalid username or password");window.location.href="/";</script>');
    }
    else{
        req.session.username=req.body.username;
        req.session.role=check.role;
        if(check.role==='admin'){
            const products=await productdata.find();
            res.redirect('/admin')
        }
        else if(check.role==='user'){
            res.redirect('/user');
        }
    }    
});
app.post('/save-product',upload.single('image'),async (req,res)=>{
    const {name,price,discription,quantity,category}=req.body;
    const products=new productdata({name,price,discription,quantity,category,image: req.file ? req.file.filename : null});
    await products.save();
    res.redirect('/admin');
});
app.post('/delete/:id',async (req,res)=>{
    const productid=req.params.id;
    const product=await productdata.findById(productid);
    const imagePath = path.join(__dirname, 'public', 'uploads', product.image);
    fs.unlinkSync(imagePath);
    await productdata.findByIdAndDelete(productid);
    res.redirect('/admin');
});
app.get('/product/:id',async (req,res)=>{
    if(!req.session.username){
        return res.send('<script>alert("Page interrupted!");window.location.href="/";</script>');
    }
    const productid=req.params.id;
    const product=await productdata.findById(productid);
    res.render('product',{product});
})
app.get('/user',async (req,res)=>{
    if(!req.session.username || req.session.role !== 'user'){
        return res.send('<script>alert("Page interrupted!");window.location.href="/";</script>');
    }
    const starters=await productdata.find({category:'starters'});
    const maincourses=await productdata.find({category:'maincourses'});
    const desserts=await productdata.find({category:'desserts'});
    res.render('user',{starters,maincourses,desserts});
})
app.post('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/');
});
app.get('/userproduct/:id',async(req,res)=>{
     if(!req.session.username || req.session.role !== 'user'){
        return res.send('<script>alert("Page interrupted!");window.location.href="/";</script>');
    }
    const productid=req.params.id;
    const product = await productdata.findById(productid);
    res.render('userproduct',{product});
});
app.get('/userproducts',async(req,res)=>{
     if(!req.session.username || req.session.role !== 'user'){
        return res.send('<script>alert("Page interrupted!");window.location.href="/";</script>');
    }
    const products=await productdata.find();
    res.render('userproducts',{products});
})
app.post('/save-cart/:id',async(req,res)=>{
    const productid=req.params.id;
    const username=req.session.username;
    const newcart=new cart({productid,username});
    await newcart.save();
    res.redirect('/userproducts');
});
app.get('/cart', async (req, res) => {
     if(!req.session.username || req.session.role !== 'user'){
        return res.send('<script>alert("Page interrupted!");window.location.href="/";</script>');
    }
    const cartitems = await cart.find({ username: req.session.username });
    const items = [];
    for (const cartitem of cartitems) {
        const item = await productdata.findById(cartitem.productid);
        if (item) {
            items.push(item);
        }
    }
    res.render('cart', { items });
});


const Order = require('./models/order');
app.post('/place-order', async (req, res) => {
    const products = req.body.products;
    if (!products || products.length === 0) {
        return res.send('<script>alert("No products selected.");window.location.href="/cart";</script>');
    }
    let totalAmount = 0;
    const orderProducts = [];
    for (let item of products) {
        const product = await productdata.findById(item.id);
        if (!product) {
            return res.send('<script>alert("Product not found!");window.location.href="/cart";</script>');
        }
        const quantity = Number(item.quantity);

        if (!quantity || isNaN(quantity) || quantity <= 0) {
            return res.send(`
                <script>
                    alert("Invalid quantity selected for ${product.name}");
                    window.location.href="/cart";
                </script>
            `);
        };
        if (quantity > product.quantity) {
            return res.send(`
                <script>
                    alert("Not enough stock for ${product.name}. Available: ${product.quantity}");
                    window.location.href="/cart";
                </script>
            `);
        }
        product.quantity -= quantity;
        await product.save();

        totalAmount += product.price * quantity;

        orderProducts.push({
            productId: product._id,
            quantity: quantity
        });
    }
    await Order.create({
        username: req.session.username,
        products: orderProducts,
        totalAmount
    });
    res.redirect('/orders');
});


app.get('/orders', async (req, res) => {

     if(!req.session.username || req.session.role !== 'user'){
        return res.send('<script>alert("Page interrupted!");window.location.href="/";</script>');
    }
    try {
        const orders = await Order.find({ username: req.session.username })
            .populate('products.productId')   
            .sort({ createdAt: -1 });        
        res.render('orders', {orders});
    } catch (error) {
        console.log(error);
        res.send("Error loading orders");
    }
});
app.post('/remove-cart/:id', async (req, res) => {
    const productid = req.params.id;
    await cart.findOneAndDelete({
        productid: productid,
        username: req.session.username
    });
    res.redirect('/cart');
});