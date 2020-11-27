// 1) instead of requiring directly from /models/Survey.js...
const mongoose = require('mongoose')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')

// ...2) take this approach to successfully run tests with any mongo model...
// ...without encountering errors e.g. "Imported too many times" 
const Survey = mongoose.model('surveys')
const Mailer = require('../services/Mailer')

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
                                    ({ email: email.trim() }) // makes clear that we are returning an object
                                ),
                _user: req.user.id,
                dateSent: Date.now(),
            })

            // use survey to send email(s)
            const mailer = new Mailer(survey, surveyTemplate(survey))

            mailer.send()
        }
    )
}