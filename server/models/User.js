const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    name: {familyName: String, givenName: String},
    emails: [ {value: String, verified: Boolean} ],
    photos: [ {value: String} ]
});

mongoose.model('users', userSchema);