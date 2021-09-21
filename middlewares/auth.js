function cekLogin(req, res, next) {
    let token = req.headers.token

    if(!token) {
        res.status(401).json({ message: 'please login first' });
    }
    next()
};

module.exports = { cekLogin };

