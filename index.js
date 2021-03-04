
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectId
const app = express()

app.use(express.json())

const url = 'mongodb+srv://superadmin:Galaxy@1141@cluster0.vufob.mongodb.net/sample_books?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db, booksCollection

async function connect() {
    await client.connect()
    db = client.db('booksdb')
    booksCollection = db.collection('books')
}
connect()

app.post('/books', async (req, res) => {

    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImage = req.body.image_url

    let newBook = {
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        image_url: newImage,
    }
    let bookID = 0

    const result = await booksCollection.insertOne(newBook)
    bookID = result.insertedId

    res.status(201).json(bookID)
})

const port = 3000
app.listen(3000, () => console.log(`Server started at ${port}`))