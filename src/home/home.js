import React, { Component } from 'react';
import './home.css';

class Home extends Component {

    getAllTutorials(event) {
        event.preventDefault();
        fetch('http://localhost:4747/getAllTutorials',
            {
                header: {
                    "Content Type": "application/json"
                },
                method: "GET"
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
