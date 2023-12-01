const express = require('express')
const router = require('express').Router()
const db = require('../db')

router.get('/', (req, res) => {
    res.render(req.session.lang + '-about', {
        user: req.session.user,
        navIndex: 2,
        lang: req.session.lang,
    })
})

router.post('/', express.json(), (req, res) => {
    db.getDocument('Groups', {
        faculty: req.body.faculty,
        year: req.body.year,
        branch: req.body.branch,
        number: parseInt(req.body.group),
    }).then((group) => res.json({ groupId: group._id }))
})

module.exports = router
