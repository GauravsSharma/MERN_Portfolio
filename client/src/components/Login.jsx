import React, { useState } from 'react';
import { Field, ErrorMessage, Formik, Form } from 'formik';
import * as Yup from 'yup';
import { GiCrossedBones } from "react-icons/gi";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api/v1';

const Login = ({ stIsloginFormOpen, style }) => {
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const stopRropogation = (e) => {
    e.stopPropagation();
  };

  const loginInUser = async (email, password) => {
    try {
      setLoading(true);
      const response = await axios.post("/login", {
        email,
        password
      });
      console.log(response.data); // Assuming the response contains user data here
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { resetForm }) => {
        await loginInUser(values.email, values.password);
        resetForm();
      }}
    >
      {({ setFieldValue }) => (
        <Form onClick={stopRropogation} className='contact_form' style={style}>
          <div className='close'
            onClick={() => stIsloginFormOpen(false)}
          >
            <GiCrossedBones />
          </div>
          <h1>Login</h1>
          <div className="contact_inputs">
            <div className="wrapper">
              <Field type="email" className='contact_email' name="email" placeholder="Your email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="wrapper">
              <Field type="password" name="password" placeholder='Password' />
              <ErrorMessage name="password" component="div" className="error" />
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

export default Login;
