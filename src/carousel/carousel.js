import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from 'react-responsive-carousel';
import styles from "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';

class VideoCarousel extends Component {
    constructor() {
        super()
        this.state = {
            tutorials: [{
                info: '',
                description: '',
                url: ''
            }],
            isLoading: true, error: null,
        };
        this.getAllTutorials();
    }

    async getAllTutorials() {
        var url = 'http://localhost:4747/getAllTutorials';
        (async () => {
            try {
                await axios.get(url)
                    .then(res => {
                        console.log(res);
                        this.setState({ tutorials: res.data.tutorials, isLoading: false })
                    })

            } catch (err) {
                console.error(err);
            }
        })();

    }
    async getAllTutorials2() {
        try {
            return fetch('http://localhost:4747/getAllTutorial', {
                header: {
                    'Accept': 'application/json',
                    "Content-Type":"application/json"              },
                method: "GET",
                // mode: "no-cors"
            })
                .then(response => {
                    return this.parseJSON(response)
                })
                .then((data) => {
                    let result = data ? JSON.parse(data) : {};
                    debugger
                    this.setState({ tutorials: result, isLoading: false })
                })
                .catch((error) => {
                    this.setState({ error: error.message, isLoading: false });
                })

        } catch (error) {
            this.setState({ error: error.message, isLoading: false });
        }
    }

    parseJSON(response) {
        return response.text().then(function (text) {
            return text ? JSON.parse(text) : {}
        })
    }

    render() {
        const { tutorials, isLoading, error } = this.state;
        if (error) {
            return <div>{error}</div>;
        }
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return (
            <Carousel showArrows={true}>
                {tutorials.map((value, index) => {
                    return <div>
                        <img src={value.url} alt="" />
                        <p className="legend">{value.info}</p>
                    </div>
                })}
            </Carousel>
        );
    }
}

ReactDOM.render(<VideoCarousel />, document.querySelector('.video-carousel'));
export default VideoCarousel;