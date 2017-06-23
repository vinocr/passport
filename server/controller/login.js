var User = require('../models/authenschema');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    console.log("in login");
	passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            console.log("in login function");
            // check in mongo if a user with username exists or not
            User.findOne({ 'UserName' :  username },
                function(err, user) {
                    //console.log("user",user);
                    // In case of any error, return using the done method
                    if (err){
                        console.log("error");
                        return done(err);
                    }

                    // Username does not exist, log the error and redirect back
                    if (!user){
                        //console.log('User Not Found :'+username);
                        return done(null, false, req.flash('message', 'User doesnot Exists.'));
                    }
                    // User exists but wrong password, log the error
                    if (!isValidPassword(user, password)){
                       // console.log('Incorrect Password');
                        return done(null, false, req.flash('message', 'Incorrect Password')); // redirect back to login page
                    }
                    // User and password both match, return user from done method
                    // which will be treated like success
                    return done(null, user);
                }
            );
        })
    );

    var isValidPassword = function(user, password){
        return password == user.Password;
    }
}
