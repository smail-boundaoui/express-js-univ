const router = require('express').Router()
const db = require('../db')

router.get('/', (req, res) => {
    res.render(req.session.lang + '-contact', {
        user: req.session.user,
        navIndex: 6,
        lang: req.session.lang,
    })
})

router.post('/', (req, res) => {
    const { fName, lName, tel, email, subject, message } = req.body
    if (email && subject && message) {
        db.createDocuments('Contact', {
            fName: fName || null,
            lName: lName || null,
            tel: tel || null,
            email,
            subject,
            message,
        })
    }
    res.redirect('/contact')
})

module.exports = router
