const mongoose = require('mongoose');

const DogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    breed: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    medical_history: {
        desexed: {
            type: Boolean,
            required: false,
            default: false
        },
        parvo: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    adoption: {
        type: Boolean,
        required: false,
        default: false
    },
    image: {
        type: String,
        required: false
    },
    qrCode: {
        type: String,
        required: false
    },
    modified: {
        user: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
})

module.exports = mongoose.model('Dog', DogSchema)