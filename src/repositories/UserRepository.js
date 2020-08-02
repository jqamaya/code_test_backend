let User = require('../../db/models').users;
const { Op } = require("sequelize");

exports.getUser = async function(req) {
    let request = req.body;
    let username = request.username;
    let password = request.password;
    const result = await User.findOne({
        where: {
            username: username
        }
    });
    if (result.correctPassword(password)) {
        return result;
    }
    return null;
}

exports.getUserById = async function(id) {
    const user = await User.findByPk(id);
    return user;
}