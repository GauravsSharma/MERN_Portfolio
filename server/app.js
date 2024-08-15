const express = require("express");
const app = express();
const user = require("./routes/user");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const project = require("./routes/project");
const skill = require("./routes/skill");
require('dotenv').config({ path: './config/config.env' });

app.use(cors());
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
