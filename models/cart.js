const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product').productSchema;

const cartSchema = new Schema(
    {
        items:Product     
    },
    {
        timestamps: true
    }
)


module.exports = mongoose.model('rnCart',productSchema);