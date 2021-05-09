import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Search, Segment, List, Header, Modal, Icon, Button } from 'semantic-ui-react';
import '../App.css'
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import ParticleComponent from './ParticleComponent';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            helpModalOpen: false,
            value: ""
        }
    }

    searchMovie = (event) => {
        //Since searchResults must be array 
        this.setState({
            value: event.target.value
        })

        this.setState({
            searchResults: []
        })

        fetch('https://www.omdbapi.com/?i=tt3896198&apikey=5adcacf&t=' + event.target.value + '&type=movie&plot=short')
            .then((data) => data.json())
            .then((data) => {
                if (data.Title === undefined) {
                    return;
                }
                console.log(data)
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

    checkDuplicate = (movieTitle) => {
        let isDuplicate = false;
        this.props.movieList.forEach((movie) => {
            if (movieTitle === movie.Title) {
                isDuplicate = true;
            }
        });
        this.props.movieNomination.forEach((movie) => {
            if (movieTitle === movie.Title) {
                isDuplicate = true; 
            }
        });
        return isDuplicate
    }

    addMovieToList = (e, data) => {
        console.log(data.results[0].title)
        fetch('http://www.omdbapi.com/?i=tt3896198&apikey=5adcacf&t=' + data.results[0].title + '&type=movie&plot=short')
            .then((data) => data.json())
            .then((data) => {
                if (data.Title === undefined) {
                    return;
                }

                //Check for duplicate
                if (!this.checkDuplicate(data.Title)) {
                    this.props.dispatch({
                        type: "ADD_MOVIE_TO_LIST",
                        data: data
                    })
                    window.confirm("Movie Succesfully Added to your List!")
                } else {
                    window.alert("This Movie Has Already Been Added to your List!")
                }

                this.setState({
                    value: ""
                })
            })
            .catch((error) => {
                console.log(error)
            })
    }

    render() {
        return (
            <Container className="ContainerStyle">
                <ParticleComponent id="particle-js"/>
                <Row className="MarginTop">
                    <Col sm={12}>
                        <h1 className="HeaderTextLgB">Welcome to the Shoppies</h1>
                        <h1 className="HeaderTextMB">Built by Tony Wang</h1>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col sm={8}>
                        <Search
                            input={{ fluid: true }}
                            className="SearchBarStyle"
                            size='huge'
                            results={this.state.searchResults}
                            onSearchChange={this.searchMovie}
                            onResultSelect={this.addMovieToList}
                            value={this.state.value}
                        />
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={12}>
                        <Modal
                            basic
                            size="small"
                            onClose={() => this.setState({ helpModalOpen: false })}
                            onOpen={() => this.setState({ helpModalOpen: true })}
                            open={this.state.helpModalOpen}
                            trigger={<Icon name='question' circular style={{ fontSize: "30px", marginTop: "80px" }} />}
                        >
                            <Modal.Content>
                                <Segment placeholder inverted color='blue' textAlign='center'>
                                    <Header style={{ margin: 'auto', width: '50%' }} size='huge' as='h2'>
                                        GETTING STARTED
                                    </Header>
                                    <List style={{ margin: 'auto', width: '50%' }} divided size='huge'>
                                        <List.Item>
                                            <List.Icon name="search" />
                                            <List.Content style={{ textAlign: 'left' }}>Search for a movie</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="add" />
                                            <List.Content style={{ textAlign: 'left' }}>Add your favourites to your personal list by selecting the search result</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="eye" />
                                            <List.Content style={{ textAlign: 'left' }}>View your personal list</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="hand pointer" />
                                            <List.Content style={{ textAlign: 'left' }}>Nominate your all time favourites (Max 5)</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="sync alternate" />
                                            <List.Content style={{ textAlign: 'left' }}>You can remove/add movies to your list/nominations at any time</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="heart outline" />
                                            <List.Content style={{ textAlign: 'left' }}>Enjoy!</List.Content>
                                        </List.Item>
                                    </List>
                                </Segment>
                            </Modal.Content>
                            <Modal.Actions>
                                <Button color='green' onClick={() => this.setState({ helpModalOpen: false })}>
                                    Got it!
                            </Button>
                            </Modal.Actions>
                        </Modal>

                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col sm={4}>
                        <Link to="/MoviePage">
                            <Button color="blue" style={{ marginTop: "60px", fontSize: "15px" }}>
                                <h1 className="ButtonText">View Movie Selections!</h1>
                            </Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    movieList: state.movieList,
    movieNomination: state.movieNominations
})

export default connect(mapStateToProps)(LandingPage)