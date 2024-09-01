import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import '../Login.css'; // Reusing the Login.css file for styling

const Signup = (props) => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confpassword: "" });
    let navigate = useNavigate();
    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (credentials.password !== credentials.confpassword) {
            props.showAlert("Passwords do not match", "danger");
            return;
        }

        const { name, email, password } = credentials;
        console.log("submitted successfully");
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // Redirect
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account created successfully", "success");
            navigate("/");
        } else {
            props.showAlert("Invalid email or password", "danger");
        }
    }

    const onchange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    return (
        <div className="login-container">
            <div className="card login-card shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-center mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name="name"
                                onChange={onchange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                onChange={onchange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                onChange={onchange}
                                minLength={5}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="confpassword" className="form-label">Confirm Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="confpassword"
                                name="confpassword"
                                onChange={onchange}
                                minLength={5}
                                required
                            />
                        </div>
                        <div className='my-2'>Already have an account <Link to="/login">Login</Link></div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
