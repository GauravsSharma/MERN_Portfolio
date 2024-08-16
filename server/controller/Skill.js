const Skill = require("../models/Skill")
const User = require("../models/User")
const cloudinary = require("cloudinary").v2

exports.addSkill = async (req, res) => {
    try {
        const { skill_name, avatar } = req.body;
        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "skills"
         });
         const skill = {
            skill_name,
            avatar:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            }
         }
        const newSkill = await Skill.create(skill);
        const user = await User.findById(req.user._id)
        user.skills.push(newSkill._id);
        await user.save();
        return res.status(201).json({
            success: true,
            skill: newSkill
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            mesage: error.message
        })
    }
}
exports.updateSkill = async (req, res) => {
    try {
        const { skill_name, avatar } = req.body;
        
        // Find the skill by ID
        const skill = await Skill.findById(req.params.id);
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        // Update the skill name if provided
        if (skill_name) {
            skill.skill_name = skill_name;
        }

        // If an avatar is provided, delete the old one from Cloudinary and upload the new one
        if (avatar) {
            if (skill.avatar && skill.avatar.public_id) {
                await cloudinary.uploader.destroy(skill.avatar.public_id);
            }
            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: "skills"
            });
            skill.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }

        // Save the updated skill
        await skill.save();

        return res.status(200).json({
            success: true,
            message: "Skill updated"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        // Find the project by ID
        const skill = await Skill.findById(req.params.id);
        // If the project does not exist, return an error
        if (!skill) {
            return res.status(404).json({
                success: false,
                message: "Skill not found"
            });
        }

        // If the project has an associated avatar, delete it from Cloudinary
        if (skill.avatar && skill.avatar.public_id) {
            await cloudinary.uploader.destroy(skill.avatar.public_id);
        }
        // Find the user and remove the project from their projects array
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { skills: skill._id }
        });

        // Delete the project from the database
        await skill.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Skill deleted successfully"
        });
    } catch (error) {
        // Handle any errors
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
