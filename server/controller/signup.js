var User = require('../models/authenschema');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport){
    console.log("in signup");
	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            console.log("in signup function");
            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                console.log(username);
                User.findOne({ 'UserName' :  username }, function(err, user) {
                    console.log(user);
                    // In case of any error, return using the done method
                    if (err){
                        console.log('Error in SignUp: '+err);
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        console.log('User already exists with username: '+username);
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.UserName = username;
                        newUser.Password = password;
                        newUser.FirstName = req.param('fname');
                        newUser.LastName = req.param('lname');
                        newUser.Country = req.param('country');
                        newUser.gender = req.param('gender');
                        newUser.Phone = req.param('phone');

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                console.log('Error while saving user in the database: '+err);
                                throw err;
                            }
                            console.log('New user Registered');
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );


}
