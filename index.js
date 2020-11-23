const express = require('express')
const app = express() // listens for requests

app.get('/', (req, res) => {
    res.send({bye: 'buddy'})
})

const PORT = process.env.PORT || 5000
app.listen(PORT) // localhost:5000 (if dev build)