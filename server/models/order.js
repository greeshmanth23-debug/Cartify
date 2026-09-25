const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    email: String,

    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "product"  
            },
            quantity: Number
        }
    ],

    totalAmount: Number,

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', orderSchema);
