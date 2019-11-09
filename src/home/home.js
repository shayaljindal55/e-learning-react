import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';

class Home extends Component {

    constructor() {
        super()
        this.getAllTutorials();
    }

    getAllTutorials() {
        fetch('http://localhost:4747/getAllTutorials',
            {
                header: {
                    "Content Type": "application/json",
                    "Access-Control-Allow-Origin": "*"
                },
                method: "GET",
                mode: 'no-cors'
            }).then(result => {
                console.log('all state', this.state);
            })
        return;
    }

    render() {
        return (
            <div>
                <div>
                    <img src="bgd-img.jpg" alt="Logo" className="e-bgd-img" />
                    <input type="text" placeholder="What do you want to learn today?"
                        name="search-box" className="centered" onKeyUp={this.getAllTutorials.bind(this)} />
                </div></div>
        );
    }
}

export default Home;
