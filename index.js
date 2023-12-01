// import

const express = require('express')

const app = express()

const server = require('http').createServer(app)

const path = require('path')

const session = require('express-session')

const flash = require('connect-flash')

const socketIO = require('socket.io')

const io = socketIO(server)

// Socket

io.on('connection', (socket) => {
    const db = require(path.join(__dirname, 'db'))
    const { ObjectId } = require('mongodb')
    socket.on('joinReq', (groupId) => socket.join(groupId))
    socket.on('send', (groupId, message) => {
        message.date = new Date()
        db.updateDocument(
            'Groups',
            { _id: new ObjectId(groupId) },
            { $push: { messages: message } }
        )
        io.to(groupId).emit('receive', message)
    })
})

// Global

app.set('view engine', 'pug')

app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'statics')))

app.use(express.static(path.join(__dirname, 'uploads')))

app.use(express.urlencoded({ extended: true }))

app.use(
    session({
        secret: 'this is a secret crypting string WBXVF-FVJF-JHGJH-HJGJH',
        cookie: { maxAge: 15 * 24 * 60 * 60 * 1000 }, // 15 DAYS IN MILLISECONDS
        saveUninitialized: false,
        resave: false,
        store: new require('connect-mongodb-session')(session)({
            uri: process.env.DB_URI,
            databaseName: 'university',
            collection: 'Sessions',
        }),
    })
)

app.use(flash())

// language Middlware

const langMid = (req, res, next) => {
    const lang = req.query.lang
    if (lang && ['en', 'fr', 'ar'].includes(lang)) req.session.lang = lang
    if (!req.session.lang) req.session.lang = 'en'
    next()
}

// 401 Middlware

const isUserMid = require(path.join(__dirname, 'routers', '401'))

// Routers

app.all('/', langMid, require(path.join(__dirname, 'routers', 'home')))

app.use('/about', langMid, require(path.join(__dirname, 'routers', 'about')))

app.use('/activities', langMid, require(path.join(__dirname, 'routers', 'activities')))

app.use('/contact', langMid, require(path.join(__dirname, 'routers', 'contact')))

app.use('/courses', isUserMid, langMid, require(path.join(__dirname, 'routers', 'courses')))

app.use('/group', isUserMid, langMid, require(path.join(__dirname, 'routers', 'group')))

app.use('/account', isUserMid, langMid, require(path.join(__dirname, 'routers', 'account')))

app.use('/admin', require(path.join(__dirname, 'routers', 'admin')))

app.use('*', langMid, require(path.join(__dirname, 'routers', '404')))

// Start Server

server.listen(3000, console.log('Server is listening on port 3000...'))
