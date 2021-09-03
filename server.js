// variables
const express = require('express');
const notes = require('./db/db.json');
const path = require('path');
const fs = require('fs');
// nanoid to create unique id (using date/time for now)
// const { nanoid } = require('nanoid'); 

const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// api routes
app.get('/api/notes', (req, res) => { // tested, works
    res.json(notes);
});
// NEXT, this POST route needs to read the new note, save as a JSON object and give it a unique id, then add to the db.json file
app.post('/api/notes', (req, res) => { // tested, works
    req.body.id = (new Date()).getTime();
    const newNote = req.body;
    notes.push(newNote);
    fs.writeFile('db/db.json', JSON.stringify(notes), err => {
        if (err) throw err;
        return true;
    });
    console.log(newNote);
    res.json(newNote);
});

// still working on this...
// app.delete('/api/notes/:id', (req, res) => {
//     console.log(req.params.id);
//     console.log(notes)
//                 SPECIFICALLY THIS AREA...
//         notes = notes.filter(function(note) {
//             return note.id !== req.params.id
//         });
//         console.log(notes)
// });

// file routes
app.get('/notes', (req, res) => {   // tested, works
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req, res) => {   // tested, works
    res.sendFile(path.join(__dirname, '/public/index.html'));
});


// server
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});