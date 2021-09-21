const { user } = require('../models');
const { encrypt } = require('../helpers/bcrypt');
const { cekPass } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UsersController{
    static async create(req, res, next) {
        let statusCode;
        const username = req.body.username;
        const gender = req.body.gender;
        const password = encrypt(req.body.password);
        const objUser = { username, gender, password };

        user.create(objUser)
        .then(user => {
            if(user) {
                statusCode = 201;
                let output = {
                    statusCode, userCreated: user
                }
                res.status(201).json(output)
            }
        })
        .catch(err => {
            next(err)
        });
    };

    static async signIn(req, res, next) {
        const username = req.body.username;
        const password = req.body.password;

        const userSign = await user.findOne({ where: { username: username } });
        const hashedPw = userSign.dataValues.password;

        if (cekPass(password, hashedPw)) {
            let dataUser = userSign.dataValues;

            let token = generateToken(dataUser)
            res.status(200).json({ token, message: 'login success'});
        } else {
            let message = { message: 'auth failed'}
            res.status(401).json(message)
        };
    };
};

module.exports = UsersController;