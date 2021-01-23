import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import books from './data.mjs';
import {chunkArray} from './utils.mjs';

const app = express()
const port = 3000

app.use(cors());
app.use(bodyParser.json());

app.get('/books', (req, res) => {
    const page = req.query.page || 1;
    const bookPages = [...chunkArray(books, 5)];
    const batch = bookPages[page - 1];

    return res.json(batch);
});

app.get('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books.findIndex(b => b.isbn === isbn);
    
    if (book) {
        res.json(book);
        return;
    }
    
    res.status(404).send('Book not found');
});


app.post('/books', (req, res) => {
    const book = req.body;

    books.push(book);

    res.status(201).json(book);
});


app.put('/books/:isbn', (req, res) => {
    const { isbn } = req.params;

    const idx = books.findIndex(b => b.isbn === isbn);
    
    if (idx === -1) {
        res.status(404).send('Book not found');
        return;
    }

    books[idx] = req.body;
    res.status(204);
});

app.delete('/books/:isbn', (req, res) => {
    const { isbn } = req.params;

    books = books.filter(b => b.isbn !== isbn);

    res.status(204);
});

app.listen(port, () => console.log(`running on http://localhost:${port}.`));