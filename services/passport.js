const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

const User = mongoose.model('users')

passport.use( // authenticate using Google OAuth
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        // eslint-disable-next-line no-unused-vars
        (accessToken, refreshToken, profile, done) => {
            new User({ // create new user record and save into mongodb
                googleId: profile.id
            }).save()
        }
    )
)
