const express = require('express')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const app = express()

// load mongo models first before loading passport service
require('./models/User')

require('./services/passport')
require('./routes/authRoutes')(app)

mongoose.connect(keys.mongoURI) // connect mongoose to my Mongo db

const PORT = process.env.PORT || 5000
app.listen(PORT) // if dev build, then localhost:5000