const express = require("express");
const app = express();
const user = require("./routes/user");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const project = require("./routes/project");
const skill = require("./routes/skill");
require('dotenv').config({ path: './config/config.env' });

const corsOptions = {
    origin:'https://gaurav-sharma-mern-portfolio.netlify.app', // allow requests from this domain
    credentials: true, // allow credentials (cookies, headers, etc.) to be sent
    optionsSuccessStatus: 200, // some browsers (legacy browsers) choke on 204
  };

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser({ sameSite: 'none' }));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", user);
app.use("/api/v1",project)
app.use("/api/v1",skill)
app.use("/", (req, res) => {
    res.json({
        message: "Server running"
    });
});

module.exports = app;
