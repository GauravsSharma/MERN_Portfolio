const User = require("../models/User")

exports.register = async (req, res) => {
    try {
        const { name, password, email, avatar } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(500).json({
                success: false,
                message: "User already exists"
            })
        }
        user = await User.create({
            email,
            password,
            name,
            // avatar:{
            //     public_id: myCloud.public_id,
            //     url: myCloud.secure_url       
            //  }
        }
        )

        console.log("ehhlo");
        const token = user.generateToken();

        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        return res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}
exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User does not exists"
            })
        }
        const checkPassword = user.matchPassword(password);
        if(!checkPassword){
            return res.status(400).json({
                success:false,
                message:"Password does'nt match"
            })
        }
        const token = user.generateToken();
        const options = {
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }
        return res.status(200).cookie("token", token, options).json({
            success: true,
            user,
            token
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        console.log(req.user._id, user._id);
        if (user._id.toString() !== req.user._id.toString()) {
            res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}