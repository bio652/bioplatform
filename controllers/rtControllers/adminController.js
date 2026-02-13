const nftdata = require("../../data/nftdata");
const userdata = require('../../data/userdata');

const killuser = async (req,res) => {
    console.log(req.params.userid);
    try{
        const user = await userdata.getuser(req.params.userid);
        if(user){
            const result = await userdata.killuser(req.params.userid);

            let nftsres;
            if(user.inventory.length > 0){
                nftsres = await nftdata.confnfts(user.inventory);
            }else {nftsres = true};

            console.log(result, nftsres);
            if(!result || !nftsres.res){
                res.status(418).send(false);
                return;
            }
            res.status(200).send(true);
            return;
        }
        res.status(418).send(false);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const confiscateall = async (req,res) =>{
    console.log(req.params.userid);
    try{    
        const user = await userdata.getuser(req.params.userid);
        if(user){
            const result = await userdata.confiscateitems(req.params.userid);

            let nftsres;
            if(user.inventory.length > 0){
                nftsres = await nftdata.confnfts(user.inventory);
            }else nftsres = true;

            console.log(result, nftsres);
            if(!result || !nftsres.res){
                res.status(418).send(false);
                return;
            }
            res.status(200).send(true);
            return;
        }
        res.status(418).send(false);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const killnft = async (req,res) => {
    try{
        const result = await nftdata.killnft(req.params.nft);
        console.log("result: ",result);
        if(result.res){
            if(result.owner){
                const resowner = await userdata.confiscatekillednft(result.owner, req.params.nft);
                if(!resowner){
                    console.log("fail with owner");
                }
            }
            res.status(200).send(true);
            return;
        }
        res.status(418).send(false);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

const confiscatenft = async (req,res) => {
    try{
        const result = await nftdata.confnfts([req.params.nft]);
        console.log("result: ",result);
        if(result.res){
            if(result.owner){
                const resowner = await userdata.confiscatekillednft(result.owner, req.params.nft);
                if(!resowner){
                    console.log("fail with owner");
                }
            }
            res.status(200).send(true);
            return;
        }
        res.status(418).send(false);
    }catch (err) {
        console.log('err in router:', err.message);
    }
};

module.exports = {
    killuser,
    confiscateall,
    killnft,
    confiscatenft
}