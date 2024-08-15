import React, { useState } from 'react';
import { Field, ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { GiCrossedBones } from "react-icons/gi";
import { FaPlus } from "react-icons/fa";

const ContactForm = ({ setIsAddSkillOpen, style }) => {
    const [image, setImage] = useState(null);
    const validationSchema = Yup.object({
        skill: Yup.string().required('Skill is required'),
        skill_image: Yup.string().required('Image is required'),
    });

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    const handleImageBoxClick = () => {
        document.getElementById('imageUpload').click();
    };

    const handleImageChange = (event, setFieldValue) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
                setFieldValue('skill_image', reader.result); // Set base64 string to Formik
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Formik
            initialValues={{
                skill: '',
                skill_image: '',
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                console.log(values);
                setImage(null)
                resetForm();
            }}
        >
            {({ setFieldValue }) => (
                <Form onClick={stopPropagation} className='contact_form' style={style}>
                    <div className='close' onClick={() => setIsAddSkillOpen(false)}>
                        <GiCrossedBones />
                    </div>
                    <h1>Add Skills</h1>
                    <div className='flex mt-2'>
                        <div className='skill_image_input'>
                            <label>Add Image</label>
                            <div className='image_box' onClick={handleImageBoxClick} style={{ cursor: 'pointer' }}>
                                {image ? (
                                    <img src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <FaPlus />
                                )}
                            </div>
                            <input
                                type="file"
                                id="imageUpload"
                                style={{ display: 'none' }}
                                onChange={(event) => handleImageChange(event, setFieldValue)}
                                accept="image/*"
                            />
                            <ErrorMessage name="skill_image" component="div" className="error" />
                        </div>
                        <div className="skill_input">
                            <label>Skill</label>
                            <Field type="text" name="skill" placeholder='Your skill' />
                            <ErrorMessage name="skill" component="div" className="error" />
                        </div>
                    </div>
                    <div className="submitbtn">
                        <button type="submit">Submit</button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ContactForm;
