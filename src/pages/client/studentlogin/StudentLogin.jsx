import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const StudentLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Formik
    const formik = useFormik({
        initialValues: {
            enrollmentNumber: '',
        },
        // validationSchema: studentLoginFormSchema,
        onSubmit: async (values) => {
            try {
                     
                const response = await axios.post("http://localhost:4000/api/v1/exam/candidate/login", {
                   
                    enrollmentNumber: values.enrollmentNumber,
                   
                });

                console.log('response', response.data)

                // Handle response, navigate to next page if login is successful
                if (response.data.res) {
                    localStorage.setItem("candidateData", JSON.stringify(response.data));
                    navigate("/student/UploadDocument");
                } else {
                    alert(response.data.message || "Login failed.");
                }
            } catch (error) {
                console.error("Login error:", error);
                alert("An error occurred during login.");
            }
            formik.resetForm();
        }
    });

    const { handleBlur, handleChange, handleSubmit, errors, values, touched } = formik;

    return (
        <section className='login-section'>
            <div className="container h-100">
                <div className="row h-100 align-items-center justify-content-center">
                    <div className="col-xl-5 col-lg-6 col-sm-10">
                        <div className="login-form-area">
                            <div className="top-header-area text-center">
                                <h4>Student Sign In</h4>
                            </div>
                            <form onSubmit={handleSubmit}>
                             
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        name='enrollmentNumber'
                                        className="form-control"
                                        placeholder="Enrollment Number"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.enrollmentNumber}
                                        autoComplete='off'
                                    />
                                    {errors.enrollmentNumber && touched.enrollmentNumber ? <p className='err-msg'>{errors.enrollmentNumber}</p> : ""}
                                </div>
                                
                                <button type="submit" className="sign-in-btn">SIGN IN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default StudentLogin;
