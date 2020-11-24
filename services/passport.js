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
            User.findOne({ // check if it is an existing user
                gooogleId: profile.id
            }).then(existingUser => {
                if (existingUser) {
                    // we already have a record with the given profile ID...
                    // ...skip
                    done(
                        null, // "no error!"
                        existingUser // "here is the existing user"
                    )
                } else {
                    // we don't have an existing record...
                    // ...make a new record
                    new User({ // create new user record and save into mongodb
                        googleId: profile.id
                    }).save().then(user => 
                        done(null, user)
                    )
                }
            })
        }
    )
)
