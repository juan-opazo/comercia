const mongoose = require('mongoose');
const keys = require('../config/keys');

const Comment = mongoose.model('comments');

class CommentHandler {
    constructor(data) {
        this.created_by = data.owner;
        this.content = data.content;
        this.date_created = new Date();
    }

    async insert() {
        const comment = await new Comment({ 
            created_by: this.created_by, 
            content: this.content,
            date_created: this.date_created
        }).save();

        return comment;
    }
}

module.exports = CommentHandler;