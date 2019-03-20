var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var jwt = require('jsonwebtoken'); 
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('./models/user');
var config = require('./config.js');


exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey,
        {expiresIn: 360000 });
};


var opts = {};

//obtaining jwt token as BearerToken 
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;


//done - verification callback err, user info
//new JwtStrategy(options, verify)
exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }));


exports.verifyUser = passport.authenticate('jwt', {session: false});



exports.verifyAdmin = function(req, res, next) {
    User.findOne({_id: req.user._id})
    .then((user) => {
        console.log("User: ", req.user);
        if (user.admin) {
            next();
        }
        else {
            err = new Error('You are not authorized to perform this operation!');
            err.status = 403;
            return next(err);
        } 
    }, (err) => next(err))
    .catch((err) => next(err))
};




exports.verifyToken = (req, res , next) => {
    if(!req.headers.authorization) {
        return res.status(401).send('Unauthorized request');
    }

       let token = req.headers.authorization.split(' ')[1]
    //   console.log('header');
    //     console.log(req.headers.authorization);
    //     console.log('header');
    //   let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzhiNzc4MDVkOWM3NDQ4MmFjOTJmMjYiLCJpYXQiOjE1NTI5NzQ0NzcsImV4cCI6MTU1MzMzNDQ3N30.axaLeyg6OOvq_B-EfxabhCJmb0gG_9euuOXllEmMQCc';
        if(token == 'null') {
            return res.status(401).send('Unauthorized request');            
        }
        console.log(token);
      //  console.log(token);
        let payload = jwt.verify(token,config.secretKey )
        if(!payload){
            return res.status(401).send('Unauthorized request');
        }
        console.log('payload');
        console.log(payload);
        req.userId = payload._id;
        console.log(req.userId);
        
        next();
}

exports.getUserId = (req, res, next) => {

}