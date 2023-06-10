const User = require("../models/User");
const { verifyToken, verifyAuthorization, verifyAdmin } = require("./verifyToken");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

const router = require("express").Router();

//UPDATE
router.put("/:id", verifyAuthorization, async (req,res) => {
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS).toString()
    }

    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {new: true})
        res.status(200).json(updatedUser);
    } catch(err){
        res.status(500).json(err);
    }
})

//DELETE
router.delete("/:id", verifyAuthorization, async (req,res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted ...");
    } catch(err){
        res.status(500).json(err);
    }
})

//FIND
router.get("/find/:id", verifyAdmin, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user;
        res.status(200).json(others);
    } catch(err){
        res.status(500).json(err);
    }
})

//FIND TRANSPORTER
router.get("/transporter", async (req,res) => {
  try{
      const users = await User.find({role: "transporter" });
      res.status(200).json(users);
  } catch(err){
      res.status(500).json(err);
  }
})

//FIND ALL
router.get("/", verifyAdmin, async (req, res) => {
    const query = req.query.new;
    try{
        const users = query ? await User.find().sort({_id: -1}).limit(5) : await User.find();
        res.status(200).json(users);
    } catch(err){
        res.status(500).json(err);
    }
})

module.exports = router;
