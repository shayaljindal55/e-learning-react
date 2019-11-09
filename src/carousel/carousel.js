import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';

class VideoCarousel extends React.Component {
    constructor() {
        super()
        this.state = {
            tutorials: [{
                info: '',
                description: '',
                url: ''
            }],
            isLoading: true, error: null, loaded: false
        };
        // this.getAllTutorials();
    }
    componentWillMount() {
        this.getAllTutorials();
    }

    async getAllTutorials() {
        var url = 'http://localhost:4747/getAllTutorials';
        (async () => {
            try {
                await axios.get(url)
                    .then(res => {
                        console.log(res);
                        this.setState({ tutorials: res.data.tutorials, isLoading: false, loaded: true })
                    })

            } catch (err) {
                console.error(err);
            }
        })();
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
            <Carousel showThumbs={false} showArrows={false}>
                {tutorials.map((value, index) => {
                    return <div>
                        <iframe width="560" height="480" src={value.url} title={value.info}></iframe>
                    </div>
                })}
            </Carousel>
        );
    }
}
export default VideoCarousel;