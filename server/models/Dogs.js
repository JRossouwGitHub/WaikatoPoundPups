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
    sex: {
        type: String,
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
        type: Array,
        required: false
    },
    status: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false
    },
    images: {
        type: Array,
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
    },
    archived: {
        type: Boolean,
        required: false,
        default: false
    }
})

module.exports = mongoose.model('Dog', DogSchema)