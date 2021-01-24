import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import {books, newBooks} from './data.mjs';

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(bodyParser.json());
// app.use((req, res, next) => setTimeout(next, 2000));

app.get('/books', (req, res) => {
    const limit = 5;
    const pivotIsbn = req.query.cursor || books[0].isbn;
    const pivotIdx = books.findIndex(book => book.isbn === pivotIsbn);

    if (pivotIdx === -1) {
        res.status(404);
        return;
    }
    
    const nextIdx = pivotIdx + limit;

    return res.json({
        cursor: pivotIsbn,
        cursor_next: nextIdx < books.length ? books[nextIdx].isbn : null,
        items: books.slice(pivotIdx, nextIdx),
        limit,
    });
});

app.get('/books/:isbn', (req, res) => {
    const { isbn } = req.params;
    const book = books.findIndex(b => b.isbn === isbn);
    
    if (book) {
        res.json(book);
        return;
    }
    
    res.status(404);
});


app.post('/books', (req, res) => {
    const book = req.body;

    books.unshift(book);

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

io.on('connection', (socket) => {
    let cnt = 0;

    setTimeout(() => {
        const interval = setInterval(() => {
            const randomIdx = Math.floor(Math.random() * newBooks.length);
            const [randomBook] = newBooks.splice(randomIdx, 1);
            io.emit('book-added', randomBook);
            
            if (cnt === newBooks.length - 1) clearInterval(interval);
            cnt++
        }, 1500 + Math.random() * 6000)
    }, 3000)
    
    
    socket.on('disconnect', () => {});
})

server.listen(3000, () => console.log('running on http://localhost:3000.'));