let UserRepository = require('../repositories/UserRepository');

/**
 * Show login form or search results if user is logged in
 * 
 * @param req   Request
 * @param res   Response
 */
exports.showLoginForm = function(req, res) {
    if (req.session.logged_in && req.session.user_id) {
        return res.redirect('/admin/search_results');
    }
    return res.render('login', { title: 'Login As Administrator' });
}

/**
 * Login user
 * 
 * @param req   Request
 * @param res   Response
 */
exports.login = async function(req, res) {
    const user = await UserRepository.getUser(req);
    if (user === null) {
        return res.send('Incorrect username and/or password');
    }
    req.session.logged_in = true;
    req.session.user_id = user.id;
    return res.redirect('/admin/search_results');
}

/**
 * Logout user
 * 
 * @param req   Request
 * @param res   Response
 */
exports.logout = function(req, res) {
    delete req.session.logged_in;
    delete req.session.user_id;
    return res.redirect('/login');
}