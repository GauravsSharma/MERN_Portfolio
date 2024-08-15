const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    avatar: {
        public_id: String,
        url: String,
    },
    email: {
        type: String,
        require: [true, "Please provide an email "],
    },
    password: {
        type: String,
        require: [true, "Please provide an password "],
        minLength: [6, "Password must be legth six"]
    },
    projects:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
    skills:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Skills"
        }
    ]
})

userSchema.pre("save", async function (next) {
    const user = this; // Bind 'this' to 'user'

    if (user.isModified("password")) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});
userSchema.methods.generateToken = function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET)
        console.log("token", token);
        return token;
    } catch (error) {
       console.log(error);
       
    }
}
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model("User", userSchema)