const { verify } = require("jsonwebtoken");
const Response = require("../models/Response");
const { verifyToken, verifyAuthorization, verifyAdmin } = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/", verifyToken, async (req,res) => {
    const newResponse = new Response(req.body);

    try{
        const savedResponse = await newResponse.save();
        res.status(200).json(savedResponse);
    } catch(err){
        res.status(500).json(err);
    }
})

//UPDATE
router.put("/:id", verifyAdmin, async (req,res) => {
    try{
        const updatedResponse = await Response.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedResponse);
    } catch(err){
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", verifyAdmin, async (req,res) => {
    try{
        await Response.findByIdAndDelete(req.params.id);
        res.status(200).json("Response has been deleted ...");
    } catch(err){
        res.status(500).json(err);
    }
})

//FIND RESPONSE
router.get("/find/:id", async (req, res) => {
    try{
        const response = await Response.find({orderId: req.params.id});
        res.status(200).json(response);
    } catch(err){
        res.status(500).json(err);
    }
})

//FIND
router.get("/:id", async (req, res) => {
    try{
        const response = await Response.find({senderId: req.params.id});
        res.status(200).json(response);
    } catch(err){
        res.status(500).json(err);
    }
})

//FIND ALL
router.get("/", async (req,res) => {
    try{
        const responses = await Response.find();
        res.status(200).json(responses);
    }catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
