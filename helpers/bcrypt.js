const bcrypt = require('bcrypt');

function encrypt(rawPass) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(rawPass, saltRounds);
    return hash
};

function cekPass(rawPw, hashedPw) {
    return bcrypt.compareSync(rawPw, hashedPw);
};

module.exports = { encrypt, cekPass };