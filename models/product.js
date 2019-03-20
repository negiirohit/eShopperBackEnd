const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Comment Schema
const commentSchema = new Schema({
    comment:  {
        type: String,
        required: true
    },
    author: {
       type:String,
       required: true
    }
}, {
    timestamps: true
});


const productSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        category:{
            type: String
           
        },
        price:{
            type: Number,
            required: true
        },
        image_path:{
            type: String

        },
        featured:{
            type: Boolean
        },
        comments: [commentSchema]        
        
    },
    {
        timestamps: true
    }
)



module.exports = mongoose.model('rnProduct',productSchema);