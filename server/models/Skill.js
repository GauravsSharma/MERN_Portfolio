const mongoose = require("mongoose")

const skillSchema = new mongoose.Schema({
    skill_name: {
        type: String,
        require: true
    },
    avatar: {
        public_id: String,
        url: String,
    },
})

module.exports = mongoose.model("Skill", skillSchema)
