const mongoose = require('mongoose')
const { Schema } = mongoose
const RecipientSchema = require('./Recipient') // require sub-document collection

const surveySchema = new Schema({
    title: String,
    body: String,
    subject: String,
    recipients: [ RecipientSchema ],
    yes: {
        type: Number,
        default: 0
    },
    no: {
        type: Number,
        default: 0
    },
    _user: { // this is reference/relationship field
        type: Schema.Types.ObjectId, // foreign key equivalent from SQL-based DB's
        ref: 'User'
    },
    dateSent: Date,
    lastResponded: Date
})

mongoose.model('surveys', surveySchema) // create this table in the db