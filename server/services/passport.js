const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user));
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    console.log(`access token: ${accessToken}`);
    console.log(`refresh token: ${refreshToken}`);
    User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
            done(null, existingUser);
        } else {
            new User({
                googleId: profile.id,
                name: profile.name,
                emails: profile.emails,
                photos: profile.photos
            })
            .save()
            .then(user => done(null, user));
        }
    })
}));