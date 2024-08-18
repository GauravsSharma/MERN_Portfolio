import React, { useState } from 'react';
import { Field, ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { GiCrossedBones } from "react-icons/gi";
import emailjs from '@emailjs/browser';
import toast from "react-hot-toast";

const ContactForm = ({ stIsContactOpen, style }) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    user_name: Yup.string().required('Name is required'),
    user_email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    message: Yup.string()
      .min(5, 'Message must be at least 10 characters long')
      .max(500, 'Message can be up to 500 characters long')
      .required('Message is required'),
  });

  const sendEmail = (values, { resetForm }) => {
    setLoading(true);
    const serviceId = "service_56ihgwd"
    const templateId = "template_qxw5kcf";
    const publicKey = "LMmMex0o-tYaVHRQh"

    const templateParams = {
      from_name : values.user_name,
      from_email: values.user_email,
      to_name:"Gaurav Sharma",
      message:values.message
    }
    emailjs.send(serviceId,templateId,templateParams,publicKey)
    .then((response)=>{
      console.log(response);
      setLoading(false)
      toast.success("Email send",{
        position:"bottom-center"
      })
      stIsContactOpen(false)
      resetForm()
    })
    .catch((error)=>{
      setLoading(false)
      console.log(error);
      
    })
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <Formik
      initialValues={{
        user_name: '',
        user_email: '',
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        console.log(values);
        sendEmail(values, actions);
      }}
    >
      {() => (
        <Form onClick={stopPropagation} className='contact_form' style={style}>
          <div className='close' onClick={() => stIsContactOpen(false)}>
            <GiCrossedBones />
          </div>
          <h1>Contact me</h1>
          <div className="contact_inputs">
            <div className="wrapper">
              <Field type="text" className='contact_name' name="user_name" placeholder="Full name" />
              <ErrorMessage name="user_name" component="div" className="error" />
            </div>
            <div className="wrapper">
              <Field type="email" className='contact_email' name="user_email" placeholder="Your email" />
              <ErrorMessage name="user_email" component="div" className="error" />
            </div>
            <div className="wrapper">
              <Field as="textarea" name="message" rows="5" placeholder='Message' />
              <ErrorMessage name="message" component="div" className="error" />
            </div>
          </div>
          <div className="submitbtn">
            <button type="submit" disabled={loading}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
