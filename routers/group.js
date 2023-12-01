const router = require('express').Router()
const path = require('path')
const multer = require('multer')
const db = require('../db')
const { ObjectId } = require('mongodb')

router.get('/', (req, res) => {
    if (req.session.user.userType === 'Student') {
        db.getDocument('Groups', {
            faculty: req.session.user.faculty,
            year: req.session.user.year,
            branch: req.session.user.branch,
            number: parseInt(req.session.user.group),
        }).then((group) =>
            res.render(req.session.lang + '-group', {
                user: req.session.user,
                navIndex: 5,
                lang: req.session.lang,
                messages: group.messages,
                groupId: String(group._id),
            })
        )
    } else if (req.session.user.userType === 'Teacher') {
        const years = []
        req.session.user.years.forEach((year) => (year.groups ? years.push(year) : null))
        res.render(req.session.lang + '-group', {
            user: req.session.user,
            navIndex: 5,
            lang: req.session.lang,
            years,
        })
    }
})

router.get('/:groupId', async (req, res) => {
    const groupId = req.params.groupId
    if (req.session.user.userType === 'Teacher' && ObjectId.isValid(groupId)) {
        const group = await db.getDocument('Groups', { _id: new ObjectId(groupId) })
        if (group) {
            const years = []
            req.session.user.years.forEach((year) => (year.groups ? years.push(year) : null))
            res.render(req.session.lang + '-group', {
                user: req.session.user,
                navIndex: 5,
                lang: req.session.lang,
                years,
                group,
                groupId,
            })
            return
        }
    }

    res.redirect('/group')
})

router.post(
    '/upload',
    multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, path.join(__dirname, '..', 'uploads', 'groups'))
            },
            filename: (req, file, callback) => {
                req.app.locals.filename = Date.now() + '-' + file.originalname
                callback(null, req.app.locals.filename)
            },
        }),
    }).single('file'),
    (req, res) => res.json({ filename: req.app.locals.filename })
)

module.exports = router
