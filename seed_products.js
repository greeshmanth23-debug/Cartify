const { MongoClient } = require('mongodb');

async function seedProducts() {
    const client = new MongoClient('mongodb://127.0.0.1:27017');
    try {
        await client.connect();
        const db = client.db('cartify');
        const products = db.collection('products');
        
        // Clear existing local products if any
        await products.deleteMany({});
        
        const newProducts = [
            {
                name: "Chicken 65",
                price: 220,
                discription: "Spicy and crispy fried chicken pieces",
                quantity: 50,
                category: "starters",
                image: "1775199764755-Chicken-65-recipe.webp"
            },
            {
                name: "Apricot Delight",
                price: 180,
                discription: "A classic sweet delight dessert",
                quantity: 30,
                category: "desserts",
                image: "1775204954034-Spicy Venue-apricot delight.jpg"
            },
            {
                name: "Paneer Butter Masala",
                price: 250,
                discription: "Rich and creamy paneer curry",
                quantity: 40,
                category: "maincourses",
                image: "1775199879036-images (1).jpeg"
            },
            {
                name: "Chocolate Lava Cake",
                price: 150,
                discription: "Warm chocolate cake with a gooey center",
                quantity: 20,
                category: "desserts",
                image: "1775205105198-hq720.jpg"
            }
        ];
        
        await products.insertMany(newProducts);
        console.log('Products seeded successfully!');
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

seedProducts();
