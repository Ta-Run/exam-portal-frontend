import React, { useState } from 'react'
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginFormSchema } from '../../../validation/AuthValidation';
import { reqToClientLogin } from '../../../reduxToolkit/services/clientAuthServices';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // States
    const [isPassword, setIsPassword] = useState("password")

    // Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            loginType: "Client"
        },
        validationSchema: loginFormSchema,
        onSubmit: async (values) => {
            const response = await dispatch(reqToClientLogin(values));
            if (response.payload?.res) {
                navigate("/client/dashboard");
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
                                <h4>Sign in</h4>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <input
                                        type="email"
                                        name='email'
                                        className="form-control"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                        autoComplete='off'
                                    />
                                    {
                                        errors.email && touched.email ? <p className='err-msg'>{errors.email}</p> : ""
                                    }
                                </div>
                                <div className="mb-5">
                                    <div className='position-relative'>
                                        <input
                                            type={isPassword}
                                            name='password'
                                            className="form-control"
                                            placeholder="Password"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.password}
                                            autoComplete='off'
                                        />
                                        <a className='eye-btn'>
                                            {
                                                isPassword === "password" ?
                                                    <i className="fa-solid fa-eye-slash" onClick={() => setIsPassword("text")}></i>
                                                    :
                                                    <i className="fa-solid fa-eye" onClick={() => setIsPassword("password")}></i>
                                            }
                                        </a>
                                    </div>
                                    {
                                        errors.password && touched.password ? <p className='err-msg'>{errors.password}</p> : ""
                                    }
                                </div>
                                <div className="mb-5 form-check">
                                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                </div>
                                <button type="submit" className="sign-in-btn">SIGN IN</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login