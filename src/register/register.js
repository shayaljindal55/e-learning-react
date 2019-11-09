import React from 'react';
// import logo from './login.svg';
import './register.css';
import { Route, Link } from 'react-router-dom';
import Login from '../login/login';
function Register() {
    return (
        <div id="id01" className="register">
            <div className="modal-content register-modal animate">
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                    <label for="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required />

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required />

                    <label for="psw-repeat"><b>Repeat Password</b></label>
                    <input type="password" placeholder="Repeat Password" name="psw-repeat" required />
                    <hr />

                    <button type="submit" className="registerbtn">Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <Link to="/login">Sign in</Link>
                    </p>
                </div>
            </div><Route path="/login" component={Login} /> </div >
    );
}

export default Register;
