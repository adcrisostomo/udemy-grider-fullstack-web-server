const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const bodyParser = require('body-parser')
const keys = require('./config/keys')
const app = express()

// load mongo models first before loading passport service
require('./models/User')
require('./models/Survey')

require('./services/passport')

// middleware to parse Request Payloads from POST request, PUT, PATCH, etc...
// ... then assign to req.body
app.use(bodyParser.json())
// prep cookie properties and session handling via passport
// !!! THIS MUST BE DONE BEFORE LOADING ROUTES !!!
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
require('./routes/billingRoutes')(app)
require('./routes/surveyRoutes')(app)

if (process.env.NODE_ENV === 'production') {
    // Express will serve up prod assets...
    // ...i.e. main.js, or main.css
    app.use(express.static('client/build'))

    // Express will serve up the index.html...
    // ...if it doesn't recognize the route
    const path = require('path')
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

// connect mongoose to my Mongo db
mongoose.connect(keys.mongoURI)

const PORT = process.env.PORT || 5000
// if dev build, then localhost:5000
app.listen(PORT)