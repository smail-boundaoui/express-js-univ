const router = require('express').Router()
const { compareSync } = require('bcrypt')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const db = require('../db')

const JWT_SECRET = 'SECRET STRING FOR JSON WEB TOKEN'
router.use(cookieParser())

router.get('/', (req, res) => {
    try {
        const data = jwt.verify(req.cookies.admin_jwt, JWT_SECRET)
        res.redirect('/admin/dashboard')
    } catch (error) {
        db.getDocuments('Faculties').then((faculties) =>
            res.render('admin', { faculties, loginErr: req.flash('adminErr')[0] })
        )
    }
})

router.post('/', async (req, res) => {
    const { faculty, username, password } = req.body
    const admin = await db.getDocument('Admins', { username, faculty })
    if (!admin) {
        req.flash('adminErr', 'Wrong Username')
        res.redirect('/admin')
        return
    }

    if (!compareSync(password, admin.password)) {
        req.flash('adminErr', 'Password Incorrect')
        res.redirect('/admin')
        return
    }
    res.cookie('admin_jwt', jwt.sign({ faculty: admin.faculty }, JWT_SECRET))
    res.redirect('/admin/dashboard')
})

router.get('/dashboard', (req, res) => {
    try {
        const data = jwt.verify(req.cookies.admin_jwt, JWT_SECRET)
        res.render('admin.dashboard.pug', { faculty: data.faculty })
    } catch (error) {
        res.redirect('/admin')
    }
})

module.exports = router
