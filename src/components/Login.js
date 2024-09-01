import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import '../Login.css'; // Import your custom CSS file

const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    let navigate = useNavigate();
    const host = "http://localhost:5000";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Logged in Successfully", "success");
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
                    <h2 className="card-title text-center mb-4">Log In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={credentials.email}
                                onChange={onchange}
                                name="email"
                                aria-describedby="emailHelp"
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
                                value={credentials.password}
                                required
                            />
                        </div>
                        <div className='my-2'>Don't have an account <Link to="/signup">Sign-up</Link></div>
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
