// 1) instead of requiring directly from /models/Survey.js...
const mongoose = require('mongoose')
const keys = require('../config/keys')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')

// ...2) take this approach to successfully run tests with any mongo model...
// ...without encountering errors e.g. "Imported too many times" 
const Survey = mongoose.model('surveys')

module.exports = app => {
    // check if user is logged in first...
    // ...THEN check if user has at least 1 credit...
    // ...before proceeding with the request
    app.post('/api/surveys', requireLogin, requireCredits,
        (req, res) => {
            // get the data from the request body
            const {
                title,
                subject,
                body,
                recipients
            } = req.body

            // prep data into a Survey instance
            const survey = new Survey({
                title,
                subject,
                body,
                recipients: recipients.split(',')
                                .map(email =>
                                    ({ email }) // makes clear that we are returning a shortened object
                                ),
                _user: req.user.id,
                dateSent: Date.now(),
            })
        }
    )
}