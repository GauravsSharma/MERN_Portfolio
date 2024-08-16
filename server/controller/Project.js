const Project = require("../models/Project")
const User = require("../models/User")
const cloudinary = require("cloudinary").v2

exports.addProject = async (req, res) => {
    try {
        const { title, github, livelink, avatar, techstack,discription } = req.body;
        const myCloud = await cloudinary.uploader.upload(avatar, {
            folder: "projects"
        });
        const newProject = await Project.create({
            title,
            github,
            livelink,
            discription,
            techstack,
            thumnail: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            },
            owner: req.user._id
        })
        const user = await User.findById(req.user._id)
        user.projects.push(newProject._id);
        await user.save();
        return res.status(201).json({
            success: true,
            project: newProject
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            mesage: error.message
        })
    }
}
exports.getAllProjects = async (req, res) => {
    try {
        const page_no = parseInt(req.params.page_no, 10) || 1;
        const limit = 8;
        const skip = (page_no - 1) * limit;

        const projects = await Project.find().skip(skip).limit(limit);

        return res.status(200).json({
            success: true,
            projects,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while fetching projects.',
            error: error.message || error,
        });
    }
};


exports.updateProject = async (req, res) => {
    try {
        const { title, github, livelink, avatar, techstack ,discription} = req.body;
        console.log(req.params.id);
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid project ID"
            });
        }
        // Find the project by ID
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        // Update fields if they are provided
        if (title) {
            project.title = title;
        }
        if (github) {
            project.github = github;
        }
        if(discription){
            project.discription = discription;
        }
        if (livelink) {
            project.livelink = livelink;
        }
        if (techstack) {
            project.techstack = techstack;
        }

        // If an avatar is provided, delete the old one from Cloudinary and upload the new one
        if (avatar) {
            // Delete the old avatar from Cloudinary
            if (project.avatar && project.avatar.public_id) {
                await cloudinary.uploader.destroy(project.avatar.public_id);
            }

            // Upload the new avatar to Cloudinary
            const myCloud = await cloudinary.uploader.upload(avatar, {
                folder: "projects"
            });
            project.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };
        }
        // Save the updated project
        await project.save();
        return res.status(200).json({
            success: true,
            message: "Project updated"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.deleteProject = async (req, res) => {
    try {
        // Find the project by ID
        const project = await Project.findById(req.params.id);

        // If the project does not exist, return an error
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        // If the project has an associated avatar, delete it from Cloudinary
        if (project.avatar && project.avatar.public_id) {
            await cloudinary.uploader.destroy(project.avatar.public_id);
        }

        // Find the user and remove the project from their projects array
        await User.findByIdAndUpdate(req.user._id, {
            $pull: { projects: project._id }
        });

        // Delete the project from the database
        await project.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        });
    } catch (error) {
        // Handle any errors
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
