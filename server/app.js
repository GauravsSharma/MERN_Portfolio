const express = require("express");
const app = express();
const user = require("./routes/user");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary")
const project = require("./routes/project");
const skill = require("./routes/skill");
require('dotenv').config({ path: './config/config.env' });

const corsOptions = {
    origin: ['https://gaurav-sharma-mern-portfolio.netlify.app','http://localhost:3000'], // allow requests from this domain
};
connectDatabase()

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser({ sameSite: 'none' }));
app.use(express.urlencoded({ extended: true }));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET 
})

// Define your API routes here first
app.use("/api/v1", user);
app.use("/api/v1", project);
app.use("/api/v1", skill);

app.listen(process.env.PORT||3000, () => {
    console.log("Server started at port: ", process.env.PORT||3000);
})

module.exports = app;
