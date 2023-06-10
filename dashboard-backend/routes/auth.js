const router = require("express").Router();
const User = require("../models/User.js");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")

const PASS = "mayank";
const JWT = "mayank";

//REGISTER
router.post("/register", async (req,res) => {

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, PASS).toString(),
        role: req.body.role,
        address: req.body.address
    });

    try {
        const savedUser = await newUser.save();
        console.log(savedUser);
        res.status(201).json(savedUser);
    } catch(err) {
        console.log(err);
        res.status(500).json(err);
    }
})

//LOGIN
router.post("/login", async (req,res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(401).json("Wrong Credentials!")
        };

        const hashedPassword = CryptoJS.AES.decrypt(user.password, PASS);
        const origPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
        if(origPassword !== req.body.password){
            return res.status(401).json("Wrong Credentials!")
        };

        const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, JWT,
            {expiresIn: "3d"}
        );

        const {password, ...others} = user._doc;
        res.status(201).json({...others, accessToken});
    } catch(err){
        res.status(500).json(err);
    }
    
})

module.exports = router;
