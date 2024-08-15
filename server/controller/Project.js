const Project = require("../models/Project")
const User = require("../models/User")

exports.addProject = async (req, res) => {
    try {
        const { title, github, livelink, avatar, techstack } = req.body;
        const newProject = await Project.create({
            title,
            github,
            livelink,
            techstack
        })
        const user = await User.findById(req.user._id)
        user.projects.push(newProject._id);
        await user.save();
        return res.status(201).json({
            success: true,
            project: newProject
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            mesage: error.message
        })
    }
}
exports.updateProject = async (req, res) => {
    try {
        const { title, github, livelink, avatar, techstack } = req.body;
        console.log(req.params.id);
        
        const project = await Project.findById(req.params.id)
        if (title) {
            project.title = title;
        }
        if (github) {
            project.github = github;
        }
        if (livelink) {
            project.livelink = livelink
        }
        if (techstack) {
            project.techstack = techstack;
        }
        // if(avatar){

        // }
        await project.save()
        return res.status(200).json({
            success: true,
            message: "Project updated"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

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
