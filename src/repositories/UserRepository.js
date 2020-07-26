let User = require('../../db/models').users;
const { Op } = require("sequelize");

/**
 * Get user by username and password
 */
exports.getUser = async function(req) {
    let request = req.body;
    let username = request.username;
    let password = request.password;
    const result = await User.findOne({
        where: {
            [Op.and]: [
                { username: username },
                { password: password }
            ]
        }
    });
    return result;
}

exports.getUserById = async function(id) {
    const user = await User.findByPk(id);
    return user;
}