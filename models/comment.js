const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating:  {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment:  {
        type: String,
        required: true
    },
    author: {
       // type: mongoose.Schema.Types.ObjectId,
       // ref: 'User'
       type:String,
       required: true
    }
}, {
    timestamps: true
});

const Comment= mongoose.model('rnComment',commentSchema);

module.exports = Comment;