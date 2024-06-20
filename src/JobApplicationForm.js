// src/JobApplicationForm.js
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const JobApplicationForm = () => {
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      position: '',
      relevantExperience: '',
      portfolioUrl: '',
      managementExperience: '',
      additionalSkills: [],
      interviewTime: ''
    },
    validationSchema: Yup.object().shape({
      fullName: Yup.string().required('Full Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phoneNumber: Yup.string().matches(/^[0-9]+$/, "Must be a number").required('Phone Number is required'),
      position: Yup.string().required('Position is required'),
      relevantExperience: Yup.number()
        .when('position', {
          is: (val) => val === 'Developer' || val === 'Designer',
          then: Yup.number().typeError('Must be a number').min(1, 'Must be greater than 0').required('Relevant Experience is required')
        }),
      portfolioUrl: Yup.string()
        .when('position', {
          is: 'Designer',
          then: Yup.string().url('Invalid URL').required('Portfolio URL is required')
        }),
      managementExperience: Yup.string()
        .when('position', {
          is: 'Manager',
          then: Yup.string().required('Management Experience is required')
        }),
      additionalSkills: Yup.array().min(1, 'At least one skill must be selected'),
      interviewTime: Yup.date().required('Preferred Interview Time is required')
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formik.values.fullName}
          onChange={formik.handleChange}
        />
        {formik.errors.fullName && <p>{formik.errors.fullName}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.errors.email && <p>{formik.errors.email}</p>}
      </div>
      <div>
        <label>Phone Number:</label>
        <input
          type="text"
          name="phoneNumber"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
        />
        {formik.errors.phoneNumber && <p>{formik.errors.phoneNumber}</p>}
      </div>
      <div>
        <label>Applying for Position:</label>
        <select
          name="position"
          value={formik.values.position}
          onChange={formik.handleChange}
        >
          <option value="">Select Position</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      {formik.values.position === 'Developer' || formik.values.position === 'Designer' ? (
        <div>
          <label>Relevant Experience (years):</label>
          <input
            type="text"
            name="relevantExperience"
            value={formik.values.relevantExperience}
            onChange={formik.handleChange}
          />
          {formik.errors.relevantExperience && <p>{formik.errors.relevantExperience}</p>}
        </div>
      ) : null}
      {formik.values.position === 'Designer' ? (
        <div>
          <label>Portfolio URL:</label>
          <input
            type="text"
            name="portfolioUrl"
            value={formik.values.portfolioUrl}
            onChange={formik.handleChange}
          />
          {formik.errors.portfolioUrl && <p>{formik.errors.portfolioUrl}</p>}
        </div>
      ) : null}
      {formik.values.position === 'Manager' ? (
        <div>
          <label>Management Experience:</label>
          <input
            type="text"
            name="managementExperience"
            value={formik.values.managementExperience}
            onChange={formik.handleChange}
          />
          {formik.errors.managementExperience && <p>{formik.errors.managementExperience}</p>}
        </div>
      ) : null}
      <div>
        <label>Additional Skills:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="JavaScript"
              checked={formik.values.additionalSkills.includes('JavaScript')}
              onChange={formik.handleChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="CSS"
              checked={formik.values.additionalSkills.includes('CSS')}
              onChange={formik.handleChange}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="Python"
              checked={formik.values.additionalSkills.includes('Python')}
              onChange={formik.handleChange}
            />
            Python
          </label>
          {formik.errors.additionalSkills && <p>{formik.errors.additionalSkills}</p>}
        </div>
      </div>
      <div>
        <label>Preferred Interview Time:</label>
        <input
          type="datetime-local"
          name="interviewTime"
          value={formik.values.interviewTime}
          onChange={formik.handleChange}
        />
        {formik.errors.interviewTime && <p>{formik.errors.interviewTime}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default JobApplicationForm;
