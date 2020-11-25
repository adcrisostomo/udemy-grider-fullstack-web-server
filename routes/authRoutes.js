const passport = require('passport')

module.exports = (app) => { // prep this anonymous function for exporting
    app.get('/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    )
    
    app.get('/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            res.redirect('/surveys')
        }
    )

    app.get('/api/logout',
        (req, res) => {
            req.logout()
            res.redirect('/') // proof of successful logout
        }
    )

    app.get('/api/current-user',
        (req, res) => {
            res.send(req.user)
        }
    )
}