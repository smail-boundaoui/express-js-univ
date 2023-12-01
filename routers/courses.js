const router = require('express').Router()
const path = require('path')
const { unlinkSync } = require('fs')
const { ObjectId } = require('mongodb')
const multer = require('multer')
const db = require('../db')

router.get('/', async (req, res) => {
    const serie = req.query.serie || '1'
    let modules

    if (req.session.user.userType === 'Student') {
        modules = await db.getDocuments('Modules', {
            faculty: req.session.user.faculty,
            year: req.session.user.year,
            branch: req.session.user.branch,
            serie,
        })
    } else if (req.session.user.userType === 'Teacher') {
        const modulesIds = []
        req.session.user.years.forEach((year) =>
            year.isCourseAdmin ? modulesIds.push(year.module.id) : null
        )
        modules = await db.getDocuments('Modules', { _id: { $in: modulesIds } })
    } else res.redirect('/')

    res.render(req.session.lang + '-courses', {
        user: req.session.user,
        navIndex: 4,
        lang: req.session.lang,
        modules,
        serie,
        branch: req.flash('branch')[0],
    })
})

router.delete('/', async (req, res) => {
    const { moduleId, lessonIndex } = req.body

    const { lessons } = await db.getDocument('Modules', {
        _id: new ObjectId(moduleId),
    })

    const { files } = lessons.splice(lessonIndex, 1)[0]

    db.updateDocument('Modules', { _id: new ObjectId(moduleId) }, { $set: { lessons } }).then(
        (response) => res.json({})
    )

    files.forEach((file) => unlinkSync(path.join(__dirname, '..', 'uploads', 'lessons', file)))
})

router.post(
    '/upload',
    multer({
        storage: multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, path.join(__dirname, '..', 'uploads', 'lessons'))
            },
            filename: (req, file, callback) => {
                callback(null, Date.now() + '-' + file.originalname)
            },
        }),
    }).array('files'),
    async (req, res) => {
        const filesNames = []
        req.files.forEach((file) => {
            filesNames.push(file.filename)
        })

        const { desc, moduleId } = req.body

        await db.updateDocument(
            'Modules',
            { _id: new ObjectId(moduleId) },
            {
                $push: {
                    lessons: {
                        date: new Date(),
                        desc: desc ? desc : null,
                        files: filesNames,
                    },
                },
            }
        )

        req.flash('branch', req.body.branchIndex)

        res.redirect('/courses')
    }
)

module.exports = router
