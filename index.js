const express = require ("express");
const morgan = require ("morgan");
const mongoose = require ("mongoose");
const dotenv = require ("dotenv");
dotenv.config();

const app = express()

app.use(express.json())
app.use(morgan('dev'))

const port = process.env.PORT;
const dbUrl = process.env.MONGODB_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDb:", error);
        process.exit(1);
    }
};

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


module.exports = mongoose.model('ServiceProvider', serviceProviderSchema);



app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
})

