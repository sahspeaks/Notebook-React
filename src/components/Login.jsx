import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './login.css'
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        const host="https://appmynotes.herokuapp.com"
        e.preventDefault();
        //API CALL
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            navigate('/');
            props.showAlert("Logged-In Successfully", 'success');
        } else {
            props.showAlert("Invalid Credentials", 'danger');
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>

            <section className="vh-100">
                <div className="container py-5 h-100">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-6">
                            <img
                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                className="img-fluid"
                                alt="Login-Img"
                            />
                        </div>
                        <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                            <h1>LogIn</h1>
                            <form onSubmit={handleSubmit}>
                                {/* <!-- Email input --> */}
                                <div className="form-outline mb-4 my-2">
                                    <div id="emailHelp" className="form-text">
                                        Please enter a valid email.
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control form-control-lg"
                                        aria-describedby="emailHelp"
                                        onChange={onChange}
                                    />
                                    <label className="form-label" htmlFor="email">
                                        Email address
                                    </label>
                                </div>

                                {/* <!-- Password input --> */}
                                <div className="form-outline mb-4">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control form-control-lg"
                                        onChange={onChange}
                                    />
                                    <label className="form-label" htmlFor="password">
                                        Password
                                    </label>
                                </div>
                                {/* <!-- Submit button --> */}
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-md btn-block"
                                >
                                    Sign in
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login