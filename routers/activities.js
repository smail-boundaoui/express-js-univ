const router = require('express').Router()

router.get('/', (req, res) => {
    require('../db')
        .getDocuments(
            'Activities',
            {
                filter: req.session.user
                    ? { $in: [req.session.user.userType + 's', 'Global'] }
                    : 'Global',
            },
            { sort: { date: -1 } }
        )
        .then((activities) => {
            res.render(req.session.lang + '-activities', {
                user: req.session.user,
                navIndex: 3,
                lang: req.session.lang,
                activities,
            })
        })
})

module.exports = router
