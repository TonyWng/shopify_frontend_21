import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import '../App.css';
import { connect, useDispatch } from "react-redux";
import { Button, Icon } from 'semantic-ui-react';
import MovieCard from './MovieCard';
import { Link } from 'react-router-dom';

const MoviePage = ({displayPersonalList}) => {
    const dispatch = useDispatch()
        return (
            <Container className="ContainerStyle">
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
                <MovieCard/>
            </Container>
        )
}

const mapStateToProps = (state) => ({
    displayPersonalList: state.displayPersonalList
})

export default connect(mapStateToProps)(MoviePage)