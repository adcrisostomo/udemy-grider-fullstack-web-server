const keys = require('../config/keys')
const stripe = require('stripe')(keys.stripeSecretKey)

module.exports = app => {
    app.post('/api/stripe',
        async (req, res) => {
            // prep to charge user 5 dollars
            const charge = await stripe.charges.create({
                amount: 500, // 500 US cents or 5 USD
                currency: 'usd',
                description: '$5 for 5 credits',
                source: req.body.id
            })

            console.log('charge:', charge)
        }
    )
}