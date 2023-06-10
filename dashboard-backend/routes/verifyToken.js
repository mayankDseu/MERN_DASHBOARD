const jwt = require("jsonwebtoken");

const JWT = "mayank";

const verifyToken = (req,res,next) => {
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, JWT, (err, user) => {
            if(err) return res.status(403).json("Token is not valid.");
            req.user = user;
            next();
        })
    } else{
        res.status(401).json("You are not authenticated.");
    }
}

const verifyAuthorization = (req,res, next) => {
    verifyToken(req, res, () => {
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();
        } else{
            res.status(403).json("You are not authorized.")
        }
    })
}

const verifyAdmin = (req,res,next) => {
    verifyToken(req, res, () => {
        if(req.user.isAdmin){
            next();
        } else{
            res.status(403).json("You are not authorized.")
        }
    })
}

module.exports = {verifyToken, verifyAuthorization, verifyAdmin};
