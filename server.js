// variables
const express = require('express');
const notes = require('./db/db.json');
const path = require('path');
const { nanoid } = require('nanoid');

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// api routes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
// NEXT, this POST route needs to read the new note, save as a JSON object and give it a unique id, then add to the db.json file
app.post('/api/notes', (req, res) => {
    req.body.id = nanoid(10);
    const newNote = req.body;
    console.log(newNote);
    res.json(newNote);
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