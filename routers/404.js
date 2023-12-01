const router = require('express').Router()

router.all('*', (req, res) => {
    res.status(404).render(req.session.lang + '-404', {
        user: req.session.user,
        navIndex: 0,
        lang: req.session.lang,
    })
})

module.exports = router
