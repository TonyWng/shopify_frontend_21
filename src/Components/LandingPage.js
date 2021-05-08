import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Search, Segment, List, Header, Modal, Icon, Button} from 'semantic-ui-react';
import '../App.css'

const OMDBAPIKey = "http://www.omdbapi.com/?i=tt3896198&apikey=5adcacf&";

export default class SearchComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchResults: [],
            savedMovies: [],
            nominations: [],
            helpModalOpen: false,
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

            fetch('http://www.omdbapi.com/?i=tt3896198&apikey=5adcacf&t=' + event.target.value + '&type=movie&plot=short')
                .then((data) => data.json())
                .then((data) => {
                    if (data.Title == undefined) {
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
                            input={{ fluid: true }}
                            className="SearchBarStyle"
                            size='huge'
                            results={this.state.searchResults}
                            onSearchChange={this.searchMovie}
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
                                <Segment id='helpSection' placeholder inverted color='blue' textAlign='center'>
                                    <Header style={{ margin: 'auto', width: '50%' }} size='huge' as='h2'>
                                        GETTING STARTED
                                    </Header>
                                    <List style={{ margin: 'auto', width: '50%' }} divided size='huge'>
                                        <List.Item>
                                            <List.Icon name="edit" />
                                            <List.Content style={{ textAlign: 'left' }}>Search for a movie</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="keyboard" />
                                            <List.Content style={{ textAlign: 'left' }}>Add your favourites to your personal list by clicking the search result</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="hand point right outline" />
                                            <List.Content style={{ textAlign: 'left' }}>View your personal list</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="handshake outline" />
                                            <List.Content style={{ textAlign: 'left' }}>Nominate your all time favourites (Max 3)</List.Content>
                                        </List.Item>
                                        <List.Item>
                                            <List.Icon name="magnify" />
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
                            <Button color='green' onClick={() => this.setState({helpModalOpen: false})}>
                                Got it!
                            </Button>
                            </Modal.Actions>
                        </Modal>

                    </Col>
                </Row>
            </Container>
        )
    }
}