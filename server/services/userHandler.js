const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

class UserHandler {
    constructor(email, password) {
      this.email = email;
      this.password = password;
    }

    async save() {
        const user = await new User({
            googleId: '',
            name: '',
            emails: [{value: this.email, verified: false}],
            photos: []
        }).save();

        return user;
    }
}

module.exports = UserHandler;