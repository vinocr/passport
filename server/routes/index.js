var express = require('express');
var router = express.Router();
var mongoose  = require('mongoose');
//requires controller files
var logincontrol = require('../controller/login.js');
var signupcontrol = require('../controller/signup.js');
var moviecontroller = require('../controller/moviecontroller.js');

/*//callbacks the signup function in controller
router.post('/signup', authencontroller.signup);

//callbacks the login function in controller
router.post('/login', authencontroller.login);
module.exports = router;*/


module.exports = function(passport){

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/movie.html',
		failureRedirect: '/',
		failureFlash : true
	}));
    
	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/index.html',
		failureRedirect: '/signup.html',
		failureFlash : true
	}));
	
//callbacks the search function in controller
router.get('/movie/search:index=?', moviecontroller.search);

//callbacks the add function in controller
router.post('/movie/add', moviecontroller.add);

//callbacks the view function in controller
router.get('/movie/view', moviecontroller.view);

//callbacks the delete function in controller
router.get('/movie/delete', moviecontroller.delete);

//callbacks the logout function in controller
router.get('/movie/logout', moviecontroller.logout);
return router;
}