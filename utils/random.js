function getRandId(min=10000, max=99999) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRandToken(){
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 3; i++) {
        result += letters.charAt(Math.floor(Math.random() * letters.length));
    }
    return `${result}-${getRandId()}`;
}

module.exports = {
    getRandId,
    getRandToken,
}