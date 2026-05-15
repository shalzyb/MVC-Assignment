const express = require ("express");
const dotenv = require ("dotenv");

dotenv.config();

connectDB();
const {
    notFound,
    errorHandler
} = require("./middleware/errorMiddleware");

const app = express();

app.use(express.json());
app.use("/api/providers", providerRoutes);

app.use(notFound);

app.use(errorHandler);
const port = process.env.PORT || 4100;


const connectDB = require ("./config/db");
const providerRoutes = require ("./routes/providerRoutes");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

