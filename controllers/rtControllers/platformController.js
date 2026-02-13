const nftdata = require("../../data/nftdata");
const userdata = require('../../data/userdata');
const https = require('https');

const getcatalog = async (req, res)=>{
    try {
        const dfc = req.body;
        const result = await nftdata.getcatalog(req.user.userid, dfc);
        if(!result || result.length == 0){
            res.status(418).send(false);
            return;
        }
        res.status(200).json(result);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const getitem = async (req, res)=>{
    try{
        const { itemtoken } = req.params;
        const result = await nftdata.getitem(itemtoken);
        if(!result){
            res.status(418).send(false);
             return;
        }
        res.status(200).json(result);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const getinv = async (req,res)=>{
    try{
        if(!req.user.userid){
            console.log("invalid userid");
            return;
        }
        const data = await userdata.getuser(req.user.userid);
        if(!data.inventory){
            res.status(418).send(false);
            return;
        }
        const result = await nftdata.getinv(data.inventory);
        if(!result){
            res.status(418).send(false);
            return;
        }
        res.status(200).json(result);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const buynft = async (req, res)=>{
    try{
        console.log("buynft", req.body.nfttoken);
        const nft = await nftdata.getitem(req.body.nfttoken);
        const boughter = await userdata.getuser(req.user.userid);
        console.log("nft: ", nft);
        if(!nft.onSale || nft.owner == boughter.userid){
            console.log("unable to sale");
            res.status(418).send(false);
            return;
        }
        if(!boughter.balance || boughter.balance < nft.price){
            console.log("not enough biocoins");
            res.status(418).send(false);
            return;
        }

        let smres = true;
        if(nft.owner != null || await userdata.checkUserById(nft.owner)){
            smres = await userdata.saleSalesman(nft);
            console.log(smres, "FOR SALESMAN");
        }
        if(!smres){
            console.log("FAIL WITH SALESMAN");
            res.status(418).send(false);
            return;
        }
        
        const brres = await userdata.saleBoughter(req.user.userid, nft);
        if(!brres){
            console.log("FAIL WITH BOUGHTER");
            res.status(418).send(false);
            return;
        }

        const result = await nftdata.updateowner(req.user.userid, nft);
        if(!result){
            console.log("FAIL WITH NFT");
            res.status(418).send(false);
            return;
        }
        res.status(200).json(true);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const putonsale = async (req, res)=>{
    try{
        console.log("salenft", req.body.nfttoken,req.body.newprice);
        const result = await nftdata.putonsale({userid: req.user.userid, token: req.body.nfttoken, newprice: req.body.newprice});
        if(!result){
            res.status(418).send(false);
            return;
        };
        res.status(200).json(true);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const putoutsale = async (req, res)=>{
    try{
        console.log("unsalenft", req.body.nfttoken);
        const result = await nftdata.putoutsale({userid: req.user.userid, token: req.body.nfttoken});
        if(!result){
            res.status(418).send(false);
            return;
        };
        res.status(200).json(true);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const isImgUrl = async (url) => {
    return new Promise((resolve) => {
        try {
            const req = https.request(url, { method: 'HEAD' }, (res) => {
                const contentType = res.headers['content-type'];
                resolve(contentType?.startsWith('image/'));
            });

            req.on('error', () => resolve(false));
            req.end();
        } catch (err) {
            console.error('Error with URL:', err.message);
            resolve(false);
        }
    });
};

const createnft = async (req, res)=>{
    try{
        console.log("create", req.body);
        if(!req.body.name || !req.body.img || req.body.name.length < 2 || !isImgUrl(req.body.img)){
            console.log("err with dfc");
            res.status(418).send(false);
            return;
        }

        const user = await userdata.getuser(req.user.userid);
        if(user.balance < 10){
            console.log("not enough money");
            res.status(418).send(false);
            return;
        }

        const payment = await userdata.payment(10, req.user.userid);
        if(!payment){
            res.status(418).send(false);
            return;
        };

        const resnft = await nftdata.createnft({name: req.body.name, img: req.body.img, owner: req.user.userid});
        if(!resnft){
            await userdata.addcoins(req.user.userid);
            res.status(418).send(false);
            return;
        }
        const result = await userdata.addnft(resnft, req.user.userid);
        if(!result){
            await userdata.addcoins(req.user.userid);
            res.status(418).send(false);
            return;
        };

        res.status(200).send(true);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const getrand = async (req, res)=>{
    try{
        const result = await nftdata.getrandnft();
        if(!result){
            res.status(418).send(false);
            return;
        }
        res.status(200).json(result);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

module.exports = {
    getcatalog,
    getitem,
    getinv,
    buynft,
    putonsale,
    putoutsale,
    createnft,
    getrand
}