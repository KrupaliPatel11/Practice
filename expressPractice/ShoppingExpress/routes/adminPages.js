const express =  require('express')
const router = express.Router()

router.get('/', (req, res) =>{
    res.send('Admin Area')
})
router.get('/test', (req, res) =>{
    res.send('Admin Test')
})

module.exports = router