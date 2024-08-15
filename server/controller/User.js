const User = require("../models/User")
const cloudinary = require("cloudinary").v2


exports.register = async (req, res) => {
    try {
        const { name, password, email, avatar } = req.body;
        // const myCloud = await cloudinary.uploader.upload(avatar, {
        //     folder: "users"
        // });
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
            user
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
            user
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error
        })
    }
}