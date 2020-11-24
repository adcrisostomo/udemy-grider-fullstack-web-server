const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const app = express()

// load mongo models first before loading passport service
require('./models/User')

require('./services/passport')

// prep cookie properties and session handling via passport
// THIS MUST BE DONE BEFORE LOADING ROUTES
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        keys: [keys.cookieKey]
    })
)
app.use(passport.initialize())
app.use(passport.session())

// load routes using app
require('./routes/authRoutes')(app)

// connect mongoose to my Mongo db
mongoose.connect(keys.mongoURI)

const PORT = process.env.PORT || 5000
// if dev build, then localhost:5000
app.listen(PORT)