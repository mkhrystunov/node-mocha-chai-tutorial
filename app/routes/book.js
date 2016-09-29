let mongoose = require('mongoose');
let Book = require('../model/book');


function getBooks(req, res) {
    let query = Book.find({});
    query.exec((err, books) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(books);
    });
}

function postBook(req, res) {
    let newBook = new Book(req.body);
    newBook.save((err, book) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json({message: 'Book successfully added!', book});
    });
}

function getBook(req, res) {
    Book.findById(req.params.id, (err, book) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json(book);
    });
}

function deleteBook(req, res) {
    Book.remove(req.params.id, (err, result) => {
        if (err) {
            res.send(err);
            return;
        }
        res.json({message: 'Book successfully deleted!', result});
    });
}

function updateBook(req, res) {
    Book.findById(req.params.id, (err, book) => {
       if (err) {
           res.send(err);
           return;
       }
       Object.assign(book, req.body).save((err, book) => {
           if (err) {
               res.send(err);
               return;
           }
           res.json({message: 'Book updated!', book});
       });
    });
}

module.exports = {
    getBooks,
    postBook,
    getBook,
    deleteBook,
    updateBook
};
