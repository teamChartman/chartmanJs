const bcrypt = require('bcryptjs');

async function getHashedPassword(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

async function comparePassword (password, hashed){
    // console.log('req pwd : '+password+' , hashed pwd : '+hashed);
    return validPassword = await bcrypt.compare(password, hashed);
}
exports.getEncryptedPwd = getHashedPassword,
exports.comparePwd = comparePassword