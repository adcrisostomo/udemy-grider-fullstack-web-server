const _ = require('lodash')
const { Path } = require('path-parser')
const { URL } = require('url')
// 1) instead of requiring directly from /models/Survey.js...
const mongoose = require('mongoose')
// ...2) take this approach to successfully run tests with any mongo model...
// ...without encountering errors e.g. "Imported too many times" 
const Survey = mongoose.model('surveys')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const surveyTemplate = require('../services/emailTemplates/surveyTemplate')
const Mailer = require('../services/Mailer')

module.exports = app => {
    // check if user is logged in first...
    // ...THEN check if user has at least 1 credit...
    // ...before proceeding with the request
    app.post('/api/surveys', requireLogin, requireCredits,
        async (req, res) => {
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

            try {
                await mailer.send()
                await survey.save()
                req.user.credits -= 1
                const user = await req.user.save()
            
                res.send(user)
            } catch (e) {
                res.status(422).send(e)
            }
        }
    )

    // retrieve email, surveyId, and choice from URL
    app.post('/api/surveys/webhooks', (req, res) => {
        const p  = new Path('/api/surveys/:surveyId/:choice')

        _.chain(req.body)
            .map(({ email, url }) => {
                // get only the path/route of the URL
                const match = p.test(new URL(url).pathname)
                if (match) {
                    return {
                        email,
                        surveyId: match.surveyId,
                        choice: match.choice
                    }
                } 
            })
            .compact() // remove undefined entities in events
            .uniqBy('email', 'surveyId') // remove duplicate events
            .each(({ surveyId, email, choice}) => {
                Survey.updateOne(
                    {
                        _id: surveyId, // update survey DB ID
                        recipients: {
                            $elemMatch: { email: email, responded: false }
                        }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        lastResponded: new Date()
                    }
                ).exec() // execute query
            })
            .value() // return value

        res.send({})
    })

    app.get('/api/surveys', requireLogin, async (req, res) => { 
        // retrieve Surveys excluding Recipients sub-document...
        // ...to avoid retrieving 1000s or 10000s of Recipients
        const surveys = await Survey.find({ _user: req.user.id })
            .select({ recipients: false })

        res.send(surveys)
    })

    // show a page to thank user for...
    // ...answering survey
    app.get('/api/surveys/:surveyId/:choice',
        (req, res) => {
            res.send('Thanks for voting!')
        }
    )
}