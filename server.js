// variables
const express = require('express');
const notes = require('./db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// api routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// file routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});