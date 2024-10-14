const express = require("express");
const app = express();
const user = require("./routes/user");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const project = require("./routes/project");
const skill = require("./routes/skill");
require('dotenv').config({ path: './config/config.env' });

const corsOptions = {
    origin: 'https://gaurav-sharma-mern-portfolio.netlify.app', // allow requests from this domain
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser({ sameSite: 'none' }));
app.use(express.urlencoded({ extended: true }));

// Define your API routes here first
app.use("/api/v1", user);
app.use("/api/v1", project);
app.use("/api/v1", skill);


module.exports = app;
