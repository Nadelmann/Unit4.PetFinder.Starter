// import the pets array from data.js
const pets = require('./data');

// init express app
const express = require('express');
const app = express();

const PORT = 8042;

app.use(express.static('public'))

// GET - / - returns homepage
app.get('/', (req, res, next) => {
    // serve up the public folder as static index.html file
    res.sendFile(__dirname +'/index.html');
});

// hello world route
app.get('/api', (req, res, next) => {
    res.send('Hello World!');
});

// get all pets from the database
app.get('/api/v1/pets', (req, res, next) => {
    // send the pets array as a response
    res.send(pets);
});

// get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res, next) => {
    // get the owner from the request
    const {owner} = req.query
    // find the pet in the pets array
    const pet = pets.find(pet => pet.owner === owner);

    // send the pet as a response
    res.send(owner);
});

// get pet by name
app.get('/api/v1/pets/:name', (req, res, next) => {
    // get the name from the request
    const {name} = req.params

    // find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);

    // send the pet as a response
    res.send(name);
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;