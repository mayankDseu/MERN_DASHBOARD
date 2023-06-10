const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema(
    {
        senderId:{type: String, required: true},
        order: {type: Object, required: true},
        orderId: {type: String, required: true},
        price: {type: Number, required: true}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Response", responseSchema);
