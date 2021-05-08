import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../App.css'
import { connect } from "react-redux";

class MovieList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayPersonal: true
        }
    }

    render(){
        return (
            <Container className="ContainerStyle">
                <Row>
                    <Col>
                        <h1 className="HeaderTextLgB">Movie Page</h1>
                        <h1 className="HeaderTextMB">You Can View Your Saved Movies and Nominations Here!</h1>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    movieList: state.movieList,
    nominationList: state.movieNominations
})

export default connect(mapStateToProps)(MovieList)