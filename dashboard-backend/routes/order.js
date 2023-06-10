const { verify } = require("jsonwebtoken");
const Order = require("../models/Order");
const { verifyToken, verifyAuthorization, verifyAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req,res) => {
    const newOrder = new Order(req.body);

    try{
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", verifyAdmin, async (req,res) => {
    try{
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedOrder);
    } catch(err){
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", async (req,res) => {
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted ...");
    } catch(err){
        res.status(500).json(err);
    }
})

//FIND
router.get("/find/:id", async (req, res) => {
    try{
        const order = await Order.find({orderId: req.params.id});
        res.status(200).json(order);
    } catch(err){
        res.status(500).json(err);
    }
})

//FIND ALL
router.get("/", async (req,res) => {
    try{
        const orders = await Order.find();
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

//FIND ORDERS FOR TRANSPORTER
router.get("/:name", async (req,res) => {
  try{
      const orders = await Order.find({transporter: req.params.name});
      res.status(200).json(orders);
  }catch(err){
      res.status(500).json(err);
  }
})

module.exports = router;
