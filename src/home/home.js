import React, { Component } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            searchInput: '  '
        };
        this.handleChange = this.handleChange.bind(this);
        this.getAllTutorials = this.getAllTutorials.bind(this);
    }

    getAllTutorials() {
        this.props.history.push({
            pathname: '/viewAll',
            search: '?searchInput=' + this.state.searchInput
        })

        console.log(this.state.searchInput);
    }

    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }

    render() {
        return (
            <div>
                <div>
                    <img src="bgd-img.jpg" alt="Logo" className="e-bgd-img" />
                    <input type="text" placeholder="What do you want to learn today?"
                        name="searchInput" className="centered" onChange={this.handleChange} />
                    <button className="centered search-btn"
                        onClick={this.getAllTutorials.bind(this)} >Search</button>
                </div></div>
        );
    }
}

export default withRouter(Home);
