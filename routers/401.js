const router = require('express').Router()

router.all('*', (req, res, next) => {
    if (req.session.user) next()
    else
        res.status(401).render(req.session.lang + '-401', {
            user: req.session.user,
            navIndex: 0,
            lang: req.session.lang,
        })
})

module.exports = router
