const { Nft } = require('./models/Nft');
const random = require('../utils/random');
const { Op } = require('sequelize');

async function getcatalog(userid, filters) {
  try {
    const where = {
      onSale: true,
      owner: { [Op.ne]: userid }
    };
    if (filters.name && filters.name.trim() !== '') {
      where.name = { [Op.iLike]: `%${filters.name}%` };
    }
    if (filters.minp) {
      where.price = { ...(where.price || {}), [Op.gte]: filters.minp };
    }
    if (filters.maxp) {
      where.price = { ...(where.price || {}), [Op.lte]: filters.maxp };
    }
    const result = await Nft.findAll({ where });
    return result;
  } catch (error) {
    console.log('Error with db:', error.message);
    return [];
  }
}

async function getitem(itemtoken) {
  try {
    const result = await Nft.findByPk(itemtoken);
    return result;
  } catch (error) {
    console.log('Error with db:', error.message);
    return null;
  }
}

async function getinv(inv) {
  try {
    const result = await Nft.findAll({
      where: {
        token: inv
      }
    });
    console.log(result);
    return result;
  } catch (error) {
    console.log('Error with db:', error.message);
    return [];
  }
}

async function updateowner(userid, nft) {
  try {
    await Nft.update(
      { owner: userid, onSale: false },
      { where: { token: nft.token } }
    );
    return true;
  } catch (error) {
    console.error("Error with nftdata:", error);
    return false;
  }
}

async function putonsale(dfc) {
  try {
    const [changed] = await Nft.update(
      {
        price: dfc.newprice ? dfc.newprice : undefined,
        onSale: true
      },
      {
        where: {
          token: dfc.token,
          owner: dfc.userid
        }
      }
    );
    if (!changed) return false;
    return true;
  } catch (error) {
    console.error("Error with nftdata:", error);
    return false;
  }
}

async function putoutsale(dfc) {
  try {
    const [changed] = await Nft.update(
      { onSale: false },
      {
        where: {
          token: dfc.token,
          owner: dfc.userid
        }
      }
    );
    if (!changed) return false;
    return true;
  } catch (error) {
    console.error("Error with nftdata:", error);
    return false;
  }
}

async function createnft(data) {
  try {
    const token = random.getRandToken();
    await Nft.create({
      token: token,
      name: data.name,
      img: data.img,
      owner: data.owner,
      onSale: false,
      price: 13
    });
    return token;
  } catch (error) {
    console.error("Error with nftdata:", error);
    return false;
  }
}

async function getrandnft() {
  try {
    const count = await Nft.count();
    if (count === 0) return false;
    const rand = random.getRandId(0, count - 1);
    const result = await Nft.findOne({ offset: rand, limit: 1 });
    return result;
  } catch (error) {
    console.error("Error with nftdata:", error);
    return false;
  }
}

//admin funcs
async function confnfts(conflist) {
  try {
    const nftsToUpdate = await Nft.findAll({
      where: { token: conflist }
    });
    if (nftsToUpdate.length === 0) {
      return { owner: false, res: false };
    }
    const owner = nftsToUpdate[0].owner || false;
    await Nft.update(
      { owner: null, onSale: true },
      { where: { token: conflist } }
    );
    return { owner, res: true };
  } catch (error) {
    console.error("Error with nftdata:", error);
    return { res: false };
  }
}

async function killnft(killtoken) {
  try {
    const nft = await Nft.findOne({
      where: { token: killtoken }
    });
    if (!nft) {
      return { owner: false, res: false };
    }
    const owner = nft.owner || false;
    await Nft.destroy({
      where: { token: killtoken }
    });
    return { owner, res: true };
  } catch (error) {
    console.error("Error with nftdata:", error);
    return { res: false };
  }
}

module.exports = {
    getcatalog,
    getitem,
    getinv,
    updateowner,
    putonsale,
    putoutsale,
    createnft,
    getrandnft,
    confnfts,
    killnft
}