let UserRepository = require('../repositories/UserRepository');

module.exports.isAuthorized  = async function(req, res, next) {

    const user = await UserRepository.getUserById(req.session.user_id);
    if (user === null) {
        return res.redirect('/login');
    }
    return next();
}