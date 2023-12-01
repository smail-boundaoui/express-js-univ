const { MongoClient } = require('mongodb')

const connect = () => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.DB_URI, (err, client) => {
            resolve(client)
            reject(err)
        })
    })
}

const createDocuments = (collection, ...document) => {
    return new Promise((resolve, reject) => {
        connect().then((client) => {
            client
                .db(DB)
                .collection(collection)
                .insertMany(document)
                .then((docs) => {
                    resolve(docs)
                    client.close()
                })
        })
    })
}

const updateDocument = (collection, filter, Document) => {
    return new Promise((resolve, reject) => {
        connect().then((client) => {
            client
                .db(DB)
                .collection(collection)
                .updateOne(filter, Document)
                .then((value) => {
                    resolve(value)
                    client.close()
                })
        })
    })
}

const updateDocuments = (collection, filter, Document) => {
    return new Promise((resolve, reject) => {
        connect().then((client) => {
            client
                .db(DB)
                .collection(collection)
                .updateMany(filter, Document)
                .then((value) => {
                    resolve(value)
                    client.close()
                })
        })
    })
}

const deleteDocument = (collection, filter) => {
    return new Promise((resolve, reject) => {
        connect().then((client) => {
            client
                .db(DB)
                .collection(collection)
                .deleteOne(filter)
                .then((value) => {
                    resolve(value)
                    client.close()
                })
        })
    })
}

const deleteDocuments = (collection, filter) => {
    return new Promise((resolve, reject) => {
        connect().then((client) => {
            client
                .db(DB)
                .collection(collection)
                .deleteMany(filter)
                .then((value) => {
                    resolve(value)
                    client.close()
                })
        })
    })
}

const getDocument = (collection, filter, options) => {
    return new Promise((resolve, reject) => {
        connect().then((client) => {
            client
                .db(DB)
                .collection(collection)
                .findOne(filter, options)
                .then((doc) => {
                    resolve(doc)
                    client.close()
                })
        })
    })
}

const getDocuments = (collection, filter, options) => {
    return new Promise((resolve, reject) => {
        connect().then((client) => {
            client
                .db(DB)
                .collection(collection)
                .find(filter, options)
                .toArray()
                .then((docs) => {
                    resolve(docs)
                    client.close()
                })
        })
    })
}

module.exports = {
    createDocuments,
    updateDocument,
    updateDocuments,
    deleteDocument,
    deleteDocuments,
    getDocument,
    getDocuments,
}
