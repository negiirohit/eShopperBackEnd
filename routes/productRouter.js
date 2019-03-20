var express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
var router = express.Router();
var Product = require('../models/product');
var authenticate = require('../authenticate')
/* GET users listing. */

router.get('/',(req, res, next) => {
  Product.find({})
  .then((products) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(products);
  }, (err) => next(err))
  .catch((err) => next(err));
})
router.post('/',(req, res, next) => {
  Product.create(req.body)
  .then((product) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(product);
  }, (err) => next(err))
  .catch((err) => next(err));
})



router.get('/featured',(req, res, next) => {
  Product.find({featured:true})
  .then((products) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(products);
  }, (err) => next(err))
  .catch((err) => next(err));
})

module.exports = router;
