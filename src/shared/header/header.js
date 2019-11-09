import React, { Component } from 'react';
import './header.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Header extends Component {
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props)
        this.gotToHomePage = this.gotToHomePage.bind(this);
    }
    gotToHomePage() {
        this.props.history.push('/home');
    }
    render() {
        return (
            <div className="header">
                <img src="e-learning.jpg" alt="Logo" className="e-logo" onClick={this.gotToHomePage} />
                <div className="header-right">
                    <Link to="/viewAll" className="view-all">View All Tutorials</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/about">About</Link>
                    <Link className="active" to="/login">Logout</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);