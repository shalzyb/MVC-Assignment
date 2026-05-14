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

const ServiceProvider = mongoose.model("ServiceProvider", serviceProviderSchema);

app.post("/create-Provider", async (req, res) => {
     const existingProvider = await ServiceProvider.findOne({
        email: req.body.email,
            });
        try {
            if (existingProvider) {
                return res.status(409).json({
                    message: "Profile already exists with this email.",
                });
            }
            const provider = await Provider.create(req.body)
           return res.status(201).json(provider)
        } catch (error) {
          return res.status(500).json({ message: "Internal server error " });
        } 
});

app.get("/provider", async (req, res) => {
    const filter = {};
    try{
        const providers = await Provider.find(filter);
        if(req.query.skill) {
            filter.skillCategory = req.query.skill;
        }
          return res.status(200).json({ provider });
    } catch (error) {
        console.error("Error fetching provider:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

app.get("/providers/:id", async (req, res) => {
    const { id }= req.params;
    try {
        const provider = await Provider.findById(id);
        if (!provider) {
            return res.status(404).json({ message: "Provider not found",
            });
    }
    return res.status(200).json({ provider });
} catch (error) {
    console.error("Error fetching provider:", error);
    return res.status(500).json({ message: "Internal server error"});
}
});

app.put("/update-provider/:id", async (req, res) => {
    const provider = await Provider.findByIdAndUpdate(req.params.id,
        req.body,
        { new: true }
    );
    try{
        if(!provider) {
            return res.status(404).json({
                message: "Provider not found",
            });
        }
          return res.status(200).json({ provider });
} catch (error) {
    console.error("Error fetching provider:", error);
    return res.status(500).json({ message: "Internal server error"});
}
});

app.patch("/verify-provider/:id", async (req, res) =>{
    const provider = await Provider.findByIdAndUpdate(
        req.params.id,
         {isVerified: true},
        { new: true }
    )
    try{
        if(!provider) {
            return res.status(404).json({
                message: "Provider not found",
            });
        }
          return res.status(200).json({  "Provider verified successfully": provider,
            });
} catch (error) {
    console.error("Error fetching provider:", error);
    return res.status(500).json({ message: "Internal server error"});
}
});

app.delete("/delete-provider/:id", async (req, res) => {
    const { id } = req.params;
    try {
        if (!provider) {
                return res.status(404).json({
                    message: "Provider not found",
                });
            }
                  return res.status(200).json({ "Provider verified successfully": provider,
            });
} catch (error) {
    console.error("Error fetching provider:", error);
    return res.status(500).json({ message: "Internal server error"});
}
})

app.listen(port, () => {
    connectDB(),
    console.log(`Server is running on port ${port}`);
})