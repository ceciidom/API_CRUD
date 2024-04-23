const mongoose = require('mongoose');

const schema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            minlength: 5
        },
        text: {
            type: String,
            required: true,
            minlength: 5
        },
        author: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true,
        //para hacer más bonitos los campos automaticos de mongo: 
        toJSON: {
            transform: (doc, ret) => {
                ret.id = doc._id;
                delete ret._id;
                delete ret.__v;


                return ret
            },
        },
    }
);

const Post = mongoose.model('Post', schema);

module.exports = Post;