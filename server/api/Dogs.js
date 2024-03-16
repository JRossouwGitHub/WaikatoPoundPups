//Create a router for express
const express = require('express');
const Router = express.Router();
const Dogs = require('../models/Dogs');
const QRCode = require('qrcode');

Router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

Router.get('/', async (req, res) => {
    await Dogs.find()
        .then(dogs => res.status(200).json(dogs))
        .catch(err => res.status(400).json(err));
});

Router.get('/:id', async (req, res) => {
    await Dogs.find({ _id: req.params.id })
        .then((dogs) => {
            if (!dogs[0]){
                res.status(404).json({message: 'Dog not found.'});
            } else {
                res.status(200).json(dogs[0])
            }
        })
        .catch(err => res.status(400).json(err));
});

Router.post('/', async (req, res) => {
    const dog = new Dogs({
        name: req.body.name,
        dob: req.body.dob,
        sex: req.body.sex,
        breed: req.body.breed,
        color: req.body.color,
        description: req.body.description,
        medical_history: req.body.medical_history,
        modified: {
            user: req.body.modified.user
        },
        status: req.body.status,
        images: req.body.images
    });
    await dog.save()
        .then((dogs) => {
            QRCode.toDataURL('http://localhost:3000/dog/' + dogs._id, (err, url) => {
                if (err) {
                    res.status(500).json({message: 'Dog added successfully but failed to generate QRCode.'})
                } else {
                    Dogs.findOneAndUpdate({ _id: dogs._id }, { qrCode: url })
                        .then((dogs) => {
                            if (!dogs){
                                console.log('Dog not found.');
                            } else {
                                console.log('Dog updated successfully.')
                            }
                        })
                        .catch(err => res.status(400).json(err));
                    res.status(200).json({message: 'Dog added successfully.'})
                }
            })
        })
        .catch(err => res.status(400).json(err));
})

Router.put('/:id', async (req, res) => {
    const dog = {
        name: req.body.name,
        dob: req.body.dob,
        sex: req.body.sex,
        breed: req.body.breed,
        color: req.body.color,
        description: req.body.description,
        medical_history: req.body.medical_history,
        modified: {
            user: req.body.modified.user
        },
        status: req.body.status,
        images: req.body.images
    }
    await Dogs.findOneAndUpdate({ _id: req.params.id }, dog)
        .then((dogs) => {
            if (!dogs){
                res.status(404).json({message: 'Dog not found.'});
            } else {
                res.status(200).json({message: 'Dog updated successfully.'})
            }
        })
        .catch(err => res.status(400).json(err));
})

Router.delete('/:id', async (req, res) => {
    await Dogs.deleteOne({ _id: req.params.id })
        .then((dogs) => {
            if (dogs.deletedCount === 0){
                res.status(404).json({message: 'Dog not found.'});
            } else {
                res.status(200).json({message: 'Dog deleted successfully.'})
            }
        })
        .catch(err => res.status(400).json(err));
})

module.exports = Router