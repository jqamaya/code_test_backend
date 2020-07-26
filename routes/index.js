var express = require('express');
var router = express.Router();

let LoginController = require('../src/controllers/LoginController');
let SearchResultController = require('../src/controllers/SearchResultController');
let auth = require('../src/middleware/auth');

/**
 * Home page
 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Code Test' });
});

/**
 * Login and logout routes
 */
router.get('/login', LoginController.showLoginForm);
router.post('/admin_login', LoginController.login);
router.get('/admin_logout', LoginController.logout);

/**
 * Search result routes
 */
router.get('/admin/search_results', auth.isAuthorized, function(req, res, next) {
  res.render('admin_index');
});
router.get('/admin/search_results/:id', auth.isAuthorized, SearchResultController.getResultDetails);

/**
 * API routes 
 */
router.post('/api/search', SearchResultController.search);
router.post('/api/search_results', SearchResultController.getResults);

module.exports = router;
