const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = require('./User');

const commentSchema = new Schema({
    created_by: String,
    profile_pic: String,
    name: String,
    date_created: Date,
    content: String,
});
commentSchema.add({
    replies: [commentSchema]
});

mongoose.model('comments', commentSchema);

module.exports = commentSchema;