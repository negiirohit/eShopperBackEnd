const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
//const Cart = require('./cart').cartSchema;



const cartSchema = new Schema(
  {
      product_id: String ,
      product_name: String,
      product_price:Number   
  }
)


var User = new Schema({

         name: {
            type: String,
            required:true
          },
          cart: [cartSchema],
    
          wishList: {
            type: [cartSchema]
          }
})


User.plugin(passportLocalMongoose);
// define user.authenticate function for checking user name in db
// if not using passportLocalMongoose


module.exports = mongoose.model('ESUser',User);
