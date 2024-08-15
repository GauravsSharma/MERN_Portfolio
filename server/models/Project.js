const mongoose = require("mongoose")

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    github: {
        type: String,
        require: true
    },
    livelink: {
        type: String,
        require: true,
    },
    techstack: [
        {
            type: String
        }
    ],
    thumnail: {
        public_id: String,
        url: String
    },
})

module.exports = mongoose.model("Project", projectSchema)
