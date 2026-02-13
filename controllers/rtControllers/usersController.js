const jwt = require("jsonwebtoken");
const { jwtSecret, jwtExpiresIn } = require("../../config");
const userdata = require('../../data/userdata');

const signup = async (req, res)=>{
    try {
        const dfc = req.body;
        console.log("dfc: ", dfc);
        if(typeof dfc.username === 'string' && dfc.username.length > 3 && dfc.username.length < 10){
            if(typeof dfc.password === 'string' && dfc.password.length > 3 && dfc.password.length < 10){
                const result = await userdata.checkaddUser(dfc);
                console.log(result)
                if(result.res){
                    const token = jwt.sign({userid: result.userid}, jwtSecret, { expiresIn: jwtExpiresIn });
                    res.status(200).send({res:true, token:token});
                }else{
                    res.status(418).send({res:false});
                }
            }
        }
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const getuserdata = async (req, res)=>{
    try {
        const result = await userdata.getuser(req.user.userid);
        if(result){
            res.status(200).send(result);
        }else{
            res.status(418).send(false);
        }
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const addcoins = async (req, res)=>{
    try {
        const result = await userdata.addcoins(req.user.userid);
        if(result){
            res.status(200).send(result);
        }else{
            res.status(418).send(false);
        }
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const signout = async (req,res)=>{
    try {
        res.clearCookie("jwt");
        res.status(200).send(true);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

module.exports = {
    signup,
    getuserdata,
    addcoins,
    signout
}