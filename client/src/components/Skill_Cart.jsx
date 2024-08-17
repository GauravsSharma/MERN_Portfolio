import React, { useContext } from 'react'
import { MdDeleteOutline } from "react-icons/md";
import { motion } from 'framer-motion'
import { AuthContext } from "../components/Layout"
import axios from 'axios';
import toast from "react-hot-toast"
axios.defaults.baseURL = 'https://mern-portfolio-3.onrender.com/api/v1';
const Skill_Cart = ({fadeInAnimationVariants,index,skill_name,thumbnail,id,getSkills}) => {
    const { user } = useContext(AuthContext)
    const handleDelete = async (skillId) => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
    
            if (!token) {
                throw new Error("No token found");
            }
    
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };
            const response = await axios.delete(`/deleteSkill/${skillId}`, config);
            // Handle the response if needed
            toast.success("Skill deleted",{
                position:"bottom-center"
            });
            getSkills()
            console.log("Skill deleted successfully:", response.data);
        } catch (error) {
            console.error("Error deleting skill:", error);
        }
    };
    return (
        <motion.div 
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        custom={index}
        className="skillcart">
            <img src={thumbnail} alt="" />
            <p>{skill_name}</p>
            <div className="deleteupdate2">
                {
                    user && <MdDeleteOutline className="icone" onClick={()=>handleDelete(id)}/>
                }
            </div>
        </motion.div>
    )
}

export default Skill_Cart