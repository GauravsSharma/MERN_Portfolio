import React, { useContext, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import axios from 'axios';
import { Toaster, toast } from 'sonner'
import FormLoader from './loaders/FormLoader';
import { AuthContext } from './Layout';
axios.defaults.baseURL = 'https://mern-portfolio-3.onrender.com/api/v1';

const ErrorComponent = ({ children }) => (
  <div style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>
    {children}
  </div>
);
const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(24, 24, 25)',
    borderColor: 'rgb(30, 24, 25)',
    padding: '5px',
    borderRadius: '6px',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#aaa',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? 'rgb(32 32 34)' : 'rgb(32 32 34)',
    color: state.isSelected ? '#fff' : '#fff',
    fontSize: "15px",
    '&:hover': {
      backgroundColor: state.isSelected ? 'rgb(24, 24, 25)' : 'rgb(24, 24, 25)',
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'rgb(32 32 34)',
    color: '#fff',
    borderRadius: '4px',
    padding: '3px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: '#fff',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: '#fff',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#0056b3',
    },
  }),
};
const options = [
  { value: 'react', label: 'React' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'tailwind', label: 'Tailwind' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'firebase', label: 'firebase' },
  { value: 'express', label: 'express' },
  { value: 'bootstrap', label: 'bootstrap' },
  { value: 'mongodb', label: 'mongodb' },
  { value: 'socket.io', label: 'socket.io' },
  // Add more options as needed
];

const AddProjectDialogBox = ({ currentProject, setIsDialogBoxOpen ,getProjects}) => {
  const [image, setImage] = useState(currentProject?.thumbnail);
  const [loading, setLoading] = useState(false);
  const {projectId} = useContext(AuthContext)
  const handleImageBoxClick = () => {
    document.getElementById('imageUpload').click();
  };
  const stopRropogation = (e) => {
    e.stopPropagation();
  }
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setFieldValue('image', file);
      };
      reader.readAsDataURL(file);
    }
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    githubUrl: Yup.string().url('Invalid URL').required('Github URL is required'),
    liveLink: Yup.string().url('Invalid URL').required('Live link is required'),
    image: Yup.mixed().test('image-required', 'Image is required', function(value) {
      if (currentProject) {
        return value || image;  // Accept either a file or an existing image URL
      }
      return value;  // Only accept a file for new projects
    }),
    technologies: Yup.array().min(1, 'Select at least one technology').required('Technologies are required'),
  });

  const addProject = async (
    title, dispcription, github, livelink, avatar, techstack
  ) => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.post("/addproject", {
        title, dispcription, github, livelink, avatar, techstack
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setLoading(false)
      toast.success("Project added")
      getProjects()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
  console.log(currentProject);
  
  const updateProject = async(
    title, dispcription, github, livelink, avatar, techstack
  )=>{
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const { data } = await axios.put(`/updateProject/${currentProject.id}`, {
        title, dispcription, github, livelink, avatar, techstack
      },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setLoading(false)
      toast.success("Project updated")
      getProjects()
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }
 
  return (
    <div className='dialogbox' onClick={() => setIsDialogBoxOpen(false)}>
      <Formik
          initialValues={{
            title: currentProject?.title || "",
            description: currentProject?.dis || "",
            githubUrl: currentProject?.github || "",
            liveLink: currentProject?.livelink || "",
            image: currentProject?.thumbnail || null,  // Set to URL if available
            technologies: currentProject?.techstack?.map((tech) => ({ value: tech, label: tech })) || []
          }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          setImage(null);
          const techstack = values.technologies.map(({ value }) => value)
          console.log(techstack);
          
          if(currentProject){
            await updateProject(
              values.title,
              values.description,
              values.githubUrl,
              values.liveLink,
              image,
              techstack
            )
          }
          else{
            await addProject(
              values.title,
              values.description,
              values.githubUrl,
              values.liveLink,
              image,
              techstack
            )
          }
          resetForm()
        }}
      >
        {({ setFieldValue,values }) => (
          <Form onClick={stopRropogation}>
            {/* <h1>Add Project</h1> */}
            <div className='input_container'>
              <div className='flex flex-col'>
                <div className='image_input'>
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
                  <ErrorMessage name="image" component={ErrorComponent} />
                </div>
                <div className='common_input w-70'>
                  <label>Technologies</label>
                  <Select
                    options={options}
                    isMulti
                    name="technologies"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    styles={customStyles}
                    onChange={(selectedOptions) => setFieldValue('technologies', selectedOptions)}
                    value={values.technologies}
                  />
                  <ErrorMessage name="technologies" component={ErrorComponent} />
                </div>
              </div>
              <div className="flex gap gap-4">
                <div className='common_input w-45 w-50'>
                  <label>Github url</label>
                  <Field type="text" name="githubUrl" placeholder='Github URL' />
                  <ErrorMessage name="githubUrl" component={ErrorComponent} />
                </div>
                <div className='common_input w-45 w-50'>
                  <label>Live link</label>
                  <Field type="text" name="liveLink" placeholder='Live link' />
                  <ErrorMessage name="liveLink" component={ErrorComponent} />
                </div>
              </div>
              <div className='dis'>
                <label>Dispcription</label>
                <Field as="textarea" name="description" cols="30" rows="3" placeholder='Description' />
                <ErrorMessage name="description" component={ErrorComponent} />
              </div>
              <div className='common_input w-100'>
                <label>Project title</label>
                <Field type="text" name="title" placeholder='title' />
                <ErrorMessage name="title" component={ErrorComponent} />
              </div>
            </div>
            <div className="submitbtn" >
              <button type="submit" disabled={loading}>
                {loading?<FormLoader/>:"Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <Toaster position="bottom-center" richColors/>
    </div>
  );
}

export default AddProjectDialogBox;
