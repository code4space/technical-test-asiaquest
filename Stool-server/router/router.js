const route = require('express').Router()
const AI = require('../controllers/ai')

route.get('/', (req, res) => {
    res.send('mantap')
})

route.post('/ask-ai', AI.askAI)

module.exports = route