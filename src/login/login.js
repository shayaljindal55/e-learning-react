import React, { Component } from 'react';
import './login.css';
import { Route, Link } from 'react-router-dom';
import Register from '../register/register';
import { withRouter } from "react-router-dom";
class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.loginService = this.loginService.bind(this);
    }

    handlePassword(password) {
        this.setState({ password: password.target.value });
    }

    handleEmail(email) {
        this.setState({ email: email.target.value });
    }

    loginService(event) {
      //  if (!event.target.checkValidity()) {
            this.setState({ displayErrors: true });
            event.preventDefault();
            this.props.history.push('/home');

            let obj = {};
            obj.email = this.state.email;
            obj.password = this.state.password;
            fetch('http://localhost:10000/loginService',
                {
                    header: {
                        "Content Type": "application/json"
                    },
                    method: "POST",
                    body: JSON.stringify({ obj })
                }).then(result => {
                    console.log('all state', this.state);
                })
            return;
       // }
      //  this.setState({ displayErrors: false });
    }

    render() {
        return (
            <div id="id01" className="login" onSubmit={this.loginService.bind(this)}>
                <form className="modal-content animate" >
                    <div className="imgcontainer">
                        <img src="img_avatar2.png" alt="Avatar" className="avatar" />
                    </div>
                    <div className="container">
                        <label htmlFor="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname"
                            onClick={(text) => { this.handleEmail(text) }} required />

                        <label htmlFor="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password"
                            name="psw" onClick={(text) => { this.handlePassword(text) }} required />

                        <button type="submit" >Login</button>
                    </div>
                    <div className="container signin">
                        <p>New User?  <Link to="/register">Register Now</Link></p>
                    </div>
                </form>
                <Route path="/register" component={Register} /> </div >
        );
    }
}

export default withRouter(Login);
