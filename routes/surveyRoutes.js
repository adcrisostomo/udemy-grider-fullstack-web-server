const keys = require('../config/keys')
const requireLogin = require('../middlewares/requireLogin')

module.exports = app => {
    app.post('/api/surveys', requireLogin,
        (req, res) => {

        }
    )
}