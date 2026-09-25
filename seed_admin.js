const mongoose = require('mongoose');
const userrole = require('./server/models/role');

mongoose.connect('mongodb://127.0.0.1:27017/cartify')
    .then(async () => {
        // Check if admin already exists
        const exists = await userrole.findOne({ email: 'admin@gmail.com' });
        if (!exists) {
            await userrole.create({ email: 'admin@gmail.com', password: 'admin123', role: 'admin' });
            console.log('Predefined admin inserted successfully!');
        } else {
            console.log('Admin already exists.');
        }
        process.exit(0);
    })
    .catch((err) => {
        console.error('Error:', err);
        process.exit(1);
    });
