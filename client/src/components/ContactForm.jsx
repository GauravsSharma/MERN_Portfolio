import React from 'react';
import { Field, ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { GiCrossedBones } from "react-icons/gi";

const ContactForm = ({stIsContactOpen,style}) => {
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        message: Yup.string()
          .min(5, 'Message must be at least 10 characters long')
          .max(500, 'Message can be up to 500 characters long')
          .required('Message is required'),
      });
      

  const stopRropogation = (e) => {
    e.stopPropagation();
  };

  return (
      <Formik
        initialValues={{
          name: '',
          email: '',
          message: '',
        }}
        validationSchema={validationSchema}
        onSubmit={(values,{resetForm}) => {
          console.log(values);
          resetForm()
        }}
      >
        {({ setFieldValue }) => (
          <Form onClick={stopRropogation} className='contact_form' style={style}>
            <div className='close'
            onClick={()=>stIsContactOpen(false)}
            >
                <GiCrossedBones/>
            </div>
            <h1>Contact me</h1>
            <div className="contact_inputs">
              <div className="wrapper">
                <Field type="text" className='contact_name' name="name" placeholder="Full name"/>
                <ErrorMessage name="name" component="div" className="error" />
              </div>
              <div className="wrapper">
                <Field type="email" className='contact_email' name="email" placeholder="Your email"/>
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="wrapper">
              <Field as="textarea" name="message" rows="5" placeholder='Message' />
                <ErrorMessage name="message" component="div" className="error" />
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
