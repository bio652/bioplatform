const { User } = require('./models/User');
const random = require('../utils/random');

async function checkUserById(userid) {
    try {
        const userExists = await User.findOne({ where: { userid } });
        return !!userExists; 
    } catch (error) {
        console.log('Error with db:', error.message);
        return false;
    }
}

async function checkaddUser(data) {
    try {
        const userInDB = await checkUser(data); 
        if (userInDB) {
            console.log('userindb: ', userInDB);
            if (!userInDB.exists) {
                const userid = random.getRandId().toString();
                await User.create({
                    userid,
                    username: data.username,
                    password: data.password,
                    balance: 0,
                    inventory: []
                });

                console.log('success writing to db');
                return { res: true, userid };
            }

            if (userInDB.exists && !userInDB.correctPassword) {
                console.log('wrong password');
                return { res: false };
            }

            console.log('truth');
            const userid = await getUserIdByUsername(data.username);
            console.log(userid);
            return { res: true, userid };
        }
        return { res: false };
    } catch (error) {
        console.log('Error with writing to db:', error.message);
        return { res: false };
    }
}

async function checkUser(data) {
    try {
        const user = await User.findOne({ where: { username: data.username } });
        console.log(user);
        if (!user) {
            return { exists: false, password: false };
        }
        const isPasswordCorrect = user.password === data.password;
        return { exists: true, correctPassword: isPasswordCorrect };
    } catch (error) {
        console.log('Error with writing db:', error.message);
        return false;
    }
}

async function getUserIdByUsername(username) {
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) {
            console.log('User undefined');
            return false;
        }
        return user.userid;
    } catch (error) {
        console.log('Error with db:', error.message);
        return false;
    }
}

async function getuser(userid) {
    try {
        const userdata = await User.findOne({ where: { userid } });
        if (!userdata) {
            console.log('User undefined');
            return null;
        }
        console.log('user in db: ', userdata.toJSON());

        return userdata;
    } catch (error) {
        console.log('Error with getting userdata:', error.message);
        return null;
    }
}

async function addcoins(userid) {
    try {
        await User.increment('balance', { by: 10, where: { userid } });
        const user = await User.findOne({ where: { userid } });
        if (!user) {
            console.log('User undefined');
            return false;
        }
        return user.balance;
    } catch (error) {
        console.log('Error with db:', error.message);
        return false;
    }
}

async function saleSalesman(nft) {
    try {
        const user = await User.findOne({ where: { userid: nft.owner } });
        if (!user) {
            console.log('User undefined');
            return false;
        }
        const newBalance = user.balance + nft.price;
        let inventory = user.inventory? user.inventory : [];
        inventory = inventory.filter(item => item !== nft.token);
        await User.update(
            { balance: newBalance, inventory: inventory },
            { where: { userid: nft.owner } }
        );
        console.log('salesman updated');
        return true;
    } catch (error) {
        console.log('Error with db:', error.message);
        return false;
    }
}

async function saleBoughter(userid, nft) {
    try {
        const user = await User.findOne({ where: { userid } });
        if (!user) {
            console.log('User undefined');
            return;
        }

        const newBalance = user.balance - nft.price;
        let inventory = user.inventory? user.inventory : [];
        inventory.push(nft.token);

        await User.update(
            { balance: newBalance, inventory: inventory },
            { where: { userid } }
        );
        console.log('boughter updated');
        return true;
    } catch (error) {
        console.log('Error with db:', error.message);
        return false;
    }
}

async function payment(price, userid) {
    try {
        await User.increment('balance', { by: -price, where: { userid } });
        return true;
    } catch (error) {
        console.error('Error with db:', error.message);
        return false;
    }
}

async function addnft(token, userid) {
    try {
        const user = await User.findOne({ where: { userid } });
        if (!user) {
            console.log('User undefined');
            return false;
        }

        let inventory = user.inventory? user.inventory : [];
        console.log('inventory1: ', inventory);
        inventory.push(token);
        console.log('inventory2: ', inventory);

        await User.update(
            { inventory: inventory },
            { where: { userid } }
        );

        console.log('creator updated');
        return true;
    } catch (error) {
        console.log('Error with db:', error.message);
        return false;
    }
}

async function killuser(userid) {
    try {
        await User.destroy({ where: { userid } });
        console.log('user is dead');
        return true;
    } catch (error) {
        console.log('Error with db:', error.message);
        return false;
    }
}

async function confiscateitems(userid) {
    try {
        await User.update(
            { balance: 0, inventory: [] },
            { where: { userid } }
        );
        console.log('items confiscated');
        return true;
    } catch (error) {
        console.log('Error with db:', error.message);
        return false;
    }
}

async function confiscatekillednft(owner, nft) {
    try {
        const user = await User.findOne({ where: { userid: owner } });
        if (!user) {
            console.log('User undefined');
            return false;
        }

        let inventory = user.inventory? user.inventory : [];
        console.log('inventory1: ', inventory);
        inventory = inventory.filter(item => item !== nft);
        console.log('inventory2: ', inventory);

        await User.update(
            { inventory: inventory },
            { where: { userid: owner } }
        );
        console.log('user updated');
        return true;
    } catch (error) {
        console.log('Error with db:', error.message);
        return false;
    }
}

module.exports = {
    checkaddUser,
    getuser,
    addcoins,
    checkUserById,
    saleSalesman,
    saleBoughter,
    payment,
    addnft,
    killuser,
    confiscateitems,
    confiscatekillednft
}