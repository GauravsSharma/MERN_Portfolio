const mongoose = require("mongoose")

const skillSchema = new mongoose.Schema({
    skill_name: {
        type: String,
        require: true
    },
    thumbnail: {
        public_id: String,
        url: String,
    },
    owner:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
})

module.exports = mongoose.model("Skill", skillSchema)
