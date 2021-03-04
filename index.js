
const express = require('express')
const app = express()

app.use(express.json())
let books = []

app.post('/books', (req, res) => {

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

    books.push(newBook)

    bookID = books.length - 1

    res.status(201).json(bookID)
})

app.get('/books/:id', (req, res) => {

    let id = req.params.id

    let book = {}

    book = books[id]

    res.status(200).json(book)
})

const port = 3000
app.listen(3000, () => console.log(`Server started at ${port}`))