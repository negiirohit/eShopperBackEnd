var express = require('express');
var router = express.Router();


var nodemailer = require('nodemailer');
const config = require('../config');

router.get('/', (req, res) => {
  res.render('');
});


router.post('/send',(req,res,next) => {
const msg ={
    name : req.body.name,
    email: req.body.email,
    message: req.body.message
}

  console.log(req.body.email);
//var transporter = nodemailer.createTransport('smtps://user%40gmail.com:pass@smtp.gmail.com');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: config.nodeemail,
         pass: config.nodepassword
     }
 });
// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Rohit Negi ?" <negirht123@gmail.com>', // sender address
    to: req.body.email, // list of receivers
    subject: `Hi ${req.body.name}`, // Subject line
    text: `Message ${req.body.message}`, // plaintext body
    html: '<b>Thank You</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});

//res.render('thankyou',{msg:msg});
})






module.exports = router;
