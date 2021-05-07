import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Search } from 'semantic-ui-react';
import '../App.css'

const OMDBAPIKey = "http://www.omdbapi.com/?i=tt3896198&apikey=5adcacf&";

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            savedMovies: [],
            nominations: [],
        }
    }

    searchMovie = (event) => {
        if (event.target.value.length == 0) {
            return; 
        } else {
            //Since searchResults must be array 
            this.setState({
                searchResults: []
            })

            fetch('http://www.omdbapi.com/?i=tt3896198&apikey=5adcacf&t=' + event.target.value + '&type=movie')
            .then((data) => data.json())
            .then((data) => {
                if(data.Title == undefined){
                    return; 
                }
                let movieObj = {
                    title: data.Title,
                    image: data.Poster,
                    price: data.Year, 
                }

                let newResult = this.state.searchResults.concat(movieObj);
                this.setState({
                    searchResults: newResult,
                })
            })
            .catch((error) => {
                console.log(error)
            })
        }
    }

    render() {
        return (
            <Container className="ContainerStyle">
                <Row className="MarginTop">
                    <Col sm={12}>
                        <h1 className="HeaderTextLgB">Welcome to the Shoppies</h1>
                        <h1 className="HeaderTextMB">Built by Tony Wang</h1>
                    </Col>
                </Row>
         
                <Row className="justify-content-md-center">
                    <Col sm={8}>
                        <Search 
                        input={{fluid: true}}
                        className="SearchBarStyle"
                        size='huge'
                        results={this.state.searchResults}
                        onSearchChange={this.searchMovie}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}