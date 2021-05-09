import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import '../App.css';
import { connect, useDispatch } from "react-redux";
import { Button, Icon, Popup } from 'semantic-ui-react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';
import ParticleComponent from './ParticleComponent';

const MoviePage = ({displayPersonalList, nominationCount}) => {
    const dispatch = useDispatch()
        return (
            <Container className="ContainerStyle">
                <ParticleComponent id="particle-js"/>
                <Link to="/">
                <Icon className="BackButton" style={{fontSize: "50px"}} name="arrow alternate circle left outline"/>
                </Link>
                <Row>
                    <Col>
                        <h1 className="HeaderTextLgB">Movie Page</h1>
                        <h1 className="HeaderTextMB">You Can View Your Saved Movies and Nominations Here!</h1>
                    </Col>
                </Row>
                <Row style={{marginTop: "60px"}} className="justify-content-md-center">
                    <Col>
                        <Button onClick={() => {if(!displayPersonalList) {dispatch({type: "TOGGLE_MOVIE_LIST"})}}} style={{fontSize: "10px", marginRight: "10px"}} color={displayPersonalList ? "blue" : "grey"} >
                            <h1 className="ButtonStyle">My Movie List</h1>
                        </Button>
                        <Button onClick={() => {if(displayPersonalList) {dispatch({type: "TOGGLE_MOVIE_LIST"})}}} style={{fontSize: "10px"}} color={!displayPersonalList ? "blue" : "grey"} >
                            <h1 className="ButtonStyle">My Nominations</h1>
                        </Button>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <h1 className="ButtonText">Nomination Count: {nominationCount} <Popup content='You can only nominate 5 movies at a time, feel free to remove selections in your nomination list to free up space' trigger={<Icon fitted name="question circle"/>}/></h1>
                    </Col>
                </Row>
                <Container className="ScrollableContainer">
                    <MovieCard/>
                </Container>  
            </Container>
        )
}

const mapStateToProps = (state) => ({
    displayPersonalList: state.displayPersonalList,
    nominationCount: state.nominationCount
})

export default connect(mapStateToProps)(MoviePage)