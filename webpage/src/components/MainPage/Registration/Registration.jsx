import React, {useEffect, useState} from 'react';
import "./Registration.css";
import {Formik} from 'formik';
import {FaCertificate, FaEnvelopeOpen, FaRegistered} from "react-icons/fa";
import {Link} from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Registration = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const [isRegistering, setIsRegistering] = useState(false);
    const [data, setData] = useState(null)
    const [userId, setUserId] = useState(null)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
    };

    const navigate = useNavigate();

    const handleToggleMode = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <section className='registration section-p-top' id="auth">
            <div className='container'>
                {(
                    <div className={`auth-content registration-section bg-semi-transparent ${isRegistering ? 'fade-in' : 'fade-out'}`}>
                        <div className='section-t'>
                            <h3>register for free!</h3>
                            <p className='text auth-text'>If you have account,&nbsp;
                                <button type='button' className='form-login-link' onClick={handleToggleMode}> Switch to Login</button>
                            </p>
                        </div>

                        <div id="registration">
                            <Formik
                                initialValues={{name: "", surname: '', email: '', password: '', confirmPassword: ''}}
                                validate={values => {
                                    const errors = {};

                                    if (!values.name) {
                                        errors.name = "Name is required";
                                    } else if (!/^[A-Za-z\s]*$/.test(values.name)) {
                                        errors.name = "Invalid name format";
                                    }

                                    if (!values.surname) {
                                        errors.surname = "Surname is required";
                                    }

                                    if (!values.email) {
                                        errors.email = 'Email is required';
                                    } else if (
                                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                                    ) {
                                        errors.email = 'Invalid email address';
                                    }

                                    if (!values.password) {
                                        errors.password = 'Password is required';
                                    } else if (
                                        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/i.test(values.password)
                                    ) {
                                        errors.password = 'Password is invalid.';
                                    }

                                    if (!values.confirmPassword) {
                                        errors.confirmPassword = 'Repeat password'
                                    } else if (values.password !== values.confirmPassword) {
                                        errors.confirmPassword = 'Password is not the same';
                                    }
                                    return errors;
                                }}
                                onSubmit={ async (values, {setSubmitting}) => {
                                    try {
                                        const { confirmPassword, ...valuesToSend } = values;
                                        await axios.post('http://localhost:8082/api/register', valuesToSend, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                        });
                                        navigate('/');
                                    } catch (error) {
                                        console.error('Error registering:', error);
                                    }
                                    setSubmitting(false);
                                }}
                            >
                                {({
                                      values,
                                      errors,
                                      touched,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                      /* and other goodies */
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className='form-elem'>
                                            <input type="text" name="name" onChange={handleChange} onBlur={handleBlur}
                                                   value={values.name} placeholder="Name" className="form-control"/>
                                            <span
                                                className='form-control-text'>{errors.name && touched.name && errors.name}</span>
                                        </div>

                                        <div className='form-elem'>
                                            <input type="text" name="surname" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.surname} placeholder="Surname"
                                                   className="form-control"/>
                                            <span
                                                className='form-control-text'>{errors.surname && touched.surname && errors.surname}</span>
                                        </div>

                                        <div className='form-elem'>
                                            <input type="email" name="email" onChange={handleChange} onBlur={handleBlur}
                                                   value={values.email} placeholder="Email" className="form-control"/>
                                            <span
                                                className='form-control-text'>{errors.email && touched.email && errors.email}</span>
                                        </div>

                                        <div className='form-elem'>
                                            <input type="password" name="password" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.password} placeholder="Password"
                                                   className="form-control"/>
                                            <span
                                                className='form-control-text'>{errors.password && touched.password && errors.password}</span>
                                        </div>

                                        <div className='form-elem'>
                                            <input type="password" name="confirmPassword" onChange={handleChange}
                                                   onBlur={handleBlur} value={values.confirmPassword}
                                                   placeholder="Confirm password" className="form-control"/>
                                            <span
                                                className='form-control-text'>{errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}</span>
                                        </div>

                                        <div className='flex flex-start'>
                                            <button type="submit" disabled={isSubmitting} className="submit-btn">
                                                <FaCertificate/> register
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}

                {(
                    <div
                        className={`auth-content login-section bg-semi-transparent ${isRegistering ? 'fade-out' : 'fade-in'}`}>
                        <div className='section-t'>
                            <h3>login</h3>
                            <p className='text auth-text'>If you do not have account,&nbsp;
                                <button type='button' className='form-login-link' onClick={handleToggleMode}> Switch to
                                    Registration</button>
                            </p>
                        </div>

                        <div id="login">
                            <Formik
                                initialValues={{email: '', password: ''}}
                                validate={values => {
                                    const errors = {};

                                    if (!values.email) {
                                        errors.email = 'Please input email';
                                    }

                                    if (!values.password) {
                                        errors.password = 'Please input password';
                                    }

                                    return errors;
                                }}
                                onSubmit={ async (values, {setSubmitting}) => {
                                    try {
                                        const response = await axios.post('http://localhost:8082/api/login', values, {
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                        });
                                        console.log("Response: " + response)
                                        console.log("Save token: " + response.data.token)
                                        localStorage.setItem('token', response.data.token);
                                        localStorage.setItem('id', response.data.id);
                                        navigate('/rooms');
                                    } catch (error) {
                                        console.error('Error logging in:', error);
                                    }
                                    setSubmitting(false);
                                }}
                            >
                                {({
                                      values,
                                      errors,
                                      touched,
                                      handleChange,
                                      handleBlur,
                                      handleSubmit,
                                      isSubmitting,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                        <div className='form-elem'>
                                            <input type="email" name="email" onChange={handleChange} onBlur={handleBlur}
                                                   value={values.email} placeholder="Email" className="form-control"/>
                                            <span
                                                className='form-control-text'>{errors.email && touched.email && errors.email}</span>
                                        </div>

                                        <div className='form-elem'>
                                            <input type="password" name="password" onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.password} placeholder="Password"
                                                   className="form-control"/>
                                            <span
                                                className='form-control-text'>{errors.password && touched.password && errors.password}</span>
                                        </div>
                                        <Link to = "/" className='link-change-password'>Forgot your password?</Link>

                                        <div className='flex flex-start'>
                                            <button type="submit" disabled={isSubmitting} className="submit-btn">
                                                <FaEnvelopeOpen/> login
                                            </button>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                )}

            </div>
        </section>
    )
}

export default Registration
