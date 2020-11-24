if (process.env.NODE_ENV === 'production') {
    // return/export prod keys
    module.exports = require('./prod')
} else {
    // return/export dev keys
    module.exports = require('./dev')
}