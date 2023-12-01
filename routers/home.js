const router = require('express').Router()
const db = require('../db')
const { compareSync } = require('bcrypt')

router.get('/', (req, res) => {
    res.render(req.session.lang + '-home', {
        user: req.session.user,
        navIndex: 1,
        lang: req.session.lang,
        loginErr: req.flash('loginErr')[0],
    })
})

router.post('/', async (req, res) => {
    let { username } = req.body
    const { password, account } = req.body
    if (username && password && account) {
        username =
            account === 'Students'
                ? username.toUpperCase()
                : account === 'Teachers'
                ? username.toLowerCase()
                : username
        const user = await db.getDocument(account, { username })
        if (user) {
            if (compareSync(password, user.password)) {
                user.userType = account.slice(0, account.length - 1)
                req.session.user = user
            } else req.flash('loginErr', 'Password Incorrect!')
        } else req.flash('loginErr', 'User not Found!')
    } else req.flash('loginErr', 'Data Manipulation!')
    res.redirect('/')
})

module.exports = router
