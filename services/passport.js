const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')
const mongoose = require('mongoose')

// load models
const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user)
    })
})

passport.use( // authenticate using Google OAuth
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        // eslint-disable-next-line no-unused-vars
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ // check if it is an existing user
                googleId: profile.id // stores the Google ID
            })

            if (existingUser) {
                // we already have a record with the given profile ID...
                // ...skip
                return done(
                    null, // "there's no error!"
                    existingUser // "here is the existing user, take it"
                )
            }

            // we don't have an existing record...
            // ...make a new record
            const user = await new User({ // create new user record and save into mongodb
                googleId: profile.id
            }).save()

            done(null, user)
        }
    )
)
