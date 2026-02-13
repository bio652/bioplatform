const admin = require("./admins.json");

let admins = [
    ...admin
]

const isAdmin = async (req, res, next) => {
    try{
        if(admins.includes(req.user.userid)){
            next();
        }else{
            console.log("not admin");
            return res.status(401).send(false);
        }
    }catch(error){
        return res.status(401).send(false);
    }
};

module.exports = {isAdmin}