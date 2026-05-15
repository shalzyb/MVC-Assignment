const mongoose = require ("mongoose");

const serviceProviderSchema = new mongoose.Schema({
    fullName: {
    type: String,
    required: true,
    trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    phoneNumber: {
        type: String,
        required: true,
    },

    skillCategory: {
        type: String,
        enum: ['Web Dev', 'Plumbing', 'Design'],
        required: true,
    },

    gender: {
        type: String,
        enum: ['Male', 'Female', 'Others'],
        required: true,
    },

    address: {
        type: String,
        required: true,
    },

    isVerified: {
        type: Boolean,
        default: false,
    }
});

timeStamp: true;
module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);
