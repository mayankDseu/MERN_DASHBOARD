const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        userId:{type: String, required: true},
        orderId: {type: String, required: true},
        to: {type: String, required: true},
        from: {type: String, required: true},
        quantity: {type: String, required: true},
        address: {type: String, required: true},
        transporter: {type: String, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);
