var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');

var authenticate = require('../authenticate')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//In v2 we need to work on signup with different informations
//User. register : method provided by passportlocal mongoose
router.post('/signup', (req,res,next) => {
    console.log(req.body);
    User.register(new User({username: req.body.username, name:req.body.name}),req.body.password, (err, user) =>{
      if(err) {
        console.log(err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({err: err});
      }
      else{

        user.save((err, user) => {
          if (err) {
            console.log(err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({err: err});
            return ;
         }

         passport.authenticate('local')(req, res, () => {
          
          
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          console.log(user);
          res.json({success: true, status: 'Registration Successful!'});
        });

        });
      }
    });

});


router.post('/login',(req,res,next) => {
  passport.authenticate('local',(err, user, info)=>
  {
    if(err)
    {
      console.log(err);
      return next(err);
    }
    else if(!user){
      console.log(user);
     res.statusCode = 401;
     res.setHeader('Content-Type', 'application/json');
     res.json({success: false, status: 'Login Unsuccessful!1111', err: info});
    }
    else{
        req.logIn(user, (err) => {
        if (err) {
          // res.statusCode = 401;
          // res.setHeader('Content-Type', 'application/json');
          // res.json({success: false, status: 'Login Unsuccessful!...', err: 'Could not log in user!'});          
          return next(err);
        }

      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Login Successful!', token: token});
    
    });

    }
  

  })(req, res, next)  
})




//Getting Cart


router.get('/cart',authenticate.verifyToken,(req, res, next) => {
    console.log()
    User.findById(req.userId)
    .then((user) => {
      console.log(user.cart);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user.cart);
    }
    , (err) => next(err))
    .catch((err) => next(err));

})

router.post('/cart/addItem',authenticate.verifyToken,(req, res, next) => {
  User.findOneAndUpdate({_id : req.userId }, { $push: { cart : req.body }},{set : true})
  .then((user) => {
      console.log("User saved");
      console.log(user);
      res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user.cart);
  }, (err) => next(err));
})



router.post('/cart/addItems',authenticate.verifyToken,(req, res, next) => {
  User.findOneAndUpdate({_id : req.userId }, { $push: { cart : req.body }})
          .then((user) => {
              console.log("User saved");
              console.log(user);
              res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user.cart);
          }, (err) => next(err));
      })


module.exports = router;
