import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from 'axios';
import queryString from 'query-string';
class VideoCarousel extends React.Component {
    constructor() {
        super()
        this.state = {
            tutorials: [{
                info: '',
                description: '',
                url: ''
            }],
            isLoading: true, error: null
        };
    }
    componentWillMount() {
        const searchInput = queryString.parse(this.props.location.search)
        this.getAllTutorials(searchInput);
    }

    async getAllTutorials(searchInput) {
        var url = process.env.REACT_APP_SERVER_HORT + 'getAllTutorials';
        const urlFinal = searchInput && searchInput.searchInput ? url + '?searchInput=' + searchInput.searchInput : url;
        (async () => {
            try {
                await axios.get(urlFinal)
                    .then(res => {
                        console.log(res);
                        this.setState({
                             tutorials: res.data.tutorials, isLoading: false })
                    })

            } catch (err) {
                console.error(err);
                this.setState({error: err.message, isLoading: false })
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
        if (tutorials === null || tutorials === []) {
            return <div>No tutorials available for this course.</div>;
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