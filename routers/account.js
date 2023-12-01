const router = require('express').Router()
const { compareSync, hashSync } = require('bcrypt')

router.get('/', (req, res) => {
    res.render(req.session.lang + '-account', {
        user: req.session.user,
        navIndex: 7,
        lang: req.session.lang,
        err: req.flash('passwordErr')[0],
        ok: req.flash('passwordOk')[0],
    })
})

router.post('/', (req, res) => {
    const { password, new_pass, confirm } = req.body
    if (password && new_pass && confirm) {
        if (compareSync(password, req.session.user.password)) {
            if (new_pass === confirm) {
                const hashedPass = hashSync(new_pass, 10)
                req.session.user.password = hashedPass
                require('../db').updateDocument(
                    req.session.user.userType + 's',
                    { _id: req.session.user._id },
                    { $set: { password: hashedPass } }
                )
                req.flash('passwordOk', 'Password Changed')
            } else req.flash('passwordErr', "New Passwords d'ont Match")
        } else req.flash('passwordErr', 'Current Password is Wrong!')
    } else req.flash('passwordErr', 'Data Manipulation!')
    res.redirect('/account')
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router
