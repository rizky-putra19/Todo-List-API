const { task, user } = require('../models');
const { getUserdata } = require('../helpers/jwt');

class TasksController{
    static create(req, res, next) {
        let token = req.headers.token;
        let userData = getUserdata(token);
        let idUser = userData.id

        let { title, status } = req.body

        task.create({
            title: title,
            status: status,
            userId: idUser
        })
        .then(data => {
            res.status(201).json({ message: 'tasks has been created'});
        })
        .catch(next);
    };

    static delete ( req, res, next) {
        let token = req.headers.token;
        let userData = getUserdata(token);

        if (userData.gender !== 'female') {
            res.status(403).json({ message: "forbidden access to this endpoint"})
        } else if(userData.id !== task.userId) {
            res.status(403).json({ message: "forbidden access to this endpoint"})
        }
        let { id } = req.params
        task.destroy({
            where : { id: id }
        })
        .then(data => {
            if (!data) {
            throw { message: [`task id ${id} is not found`], statusCode: 404 }
        } else {
            res.status(200).json({ message: `task id ${id} has been deleted` })
        }
        });
    };

    static getAll (req, res, next) {
        let token = req.headers.token;
        let userData = getUserdata(token);
        let userDataId = userData.id
         

        task.findAll({
            where: {
                userId: userDataId
            }
        })
        .then(data => {
            res.status(200).json({
                tasks: data
            })
        })
        .catch(next)
    };

    static edit (req, res, next) {
        let token = req.headers.token;
        let userData = getUserData(token); 

        if (userData.id !== task.userId ) {
            res.status(403).json({ message: "forbidden access to this endpoint"})
        }
        let { id } = req.params
        let { title, status } = req.body
        task.update({
            title: title,
            status: status,
        },{
            where: {
                id: id
            }
        })
        .then(data => {
            if (!data) {
                throw { message: [`task id ${id} is not found`], statusCode: 404 }
            } else {
                res.status(200).json({ message: `task ${id} has been updated`})
            }
        })
        .catch(next);
    }
};

module.exports = TasksController;