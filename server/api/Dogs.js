//Create a router for express
const express = require('express');
const Router = express.Router();

Router.get('/', (req, res) => {
    res.send('Get All Dogs');
});

Router.get('/:id', (req, res) => {
    res.send('Get Dog by ID' + req.params.id);
});

Router.post('/', (req, res) => {
    res.send('Add Dog' + JSON.stringify(req.body));
})

Router.put('/:id', (req, res) => {
    res.send('Update Dog' + req.params.id);
})

Router.delete('/:id', (req, res) => {
    res.send('Delete Dog' + req.params.id);
})

module.exports = Router