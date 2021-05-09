import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';
import { Row, Col, Image } from 'react-bootstrap';



const MovieCard = ({ movieList, movieNomination, displayPersonalList }) => {
    const dispatch = useDispatch()

    if (movieList && displayPersonalList) {
        if (movieList.length === 0) {
            return (
                <h1 className="ButtonText">You have no movies in your list, begin by adding some movies here!</h1>
            )
        } else {
            return (
                <div style={{ marginTop: "60px" }}>
                    {Object.keys(movieList).map((key, _) => {
                        const movie = movieList[key]
                        if (movie) {
                            return (
                                <Row style={{ marginTop: "30px" }} className="justify-content-md-center">
                                    <Col sm={6}>
                                        <Image fluid rounded src={movie.Poster} />
                                    </Col>
                                    <Col sm={6}>
                                        <Card style={{ width: "100%", height: "100%" }}>
                                            <Card.Content>
                                                <Card.Header><h1 className="ButtonText">{movie.Title}</h1></Card.Header>
                                                <h1 className="DescriptText">{movie.Plot}</h1>
                                                <h1 className="ActorsText">Starring: {movie.Actors}</h1>
                                            </Card.Content>
                                            <Card.Meta><h1 className="MetaText">{movie.Year} - {movie.Rated} - {movie.Runtime}</h1></Card.Meta>
                                            <Card.Content extra>
                                                <div className='ui two buttons'>
                                                    <Button onClick={() => {
                                                        dispatch({ type: "NOMINATE_MOVIE", data: movie })
                                                        dispatch({ type: "REMOVE_MOVIE_FROM_LIST", Title: movie.Title })
                                                    }}
                                                        basic
                                                        color='green'>
                                                        NOMINATE
                                                </Button>
                                                    <Button onClick={() => dispatch({ type: "REMOVE_MOVIE_FROM_LIST", Title: movie.Title })} basic color='red'>
                                                        REMOVE
                                                </Button>
                                                </div>
                                            </Card.Content>

                                        </Card>
                                    </Col>
                                </Row>
                            )
                        } else {
                            console.log("empty")
                            return null
                        }
                    })}
                </div>
            )
        }

    } else if (movieNomination && !displayPersonalList) {
        if (movieNomination.length === 0) {
            return (
                <h1 className="ButtonText">You have not nominated any movies yet, movies you nominate from your list will appear here!</h1>
            )
        } else {
            return (
                <div style={{ marginTop: "60px" }}>
                    {Object.keys(movieNomination).map((key, _) => {
                        const movie = movieNomination[key]
                        console.log(movie.Title)
                        if (movie) {
                            return (
                                <Row style={{ marginTop: "30px" }} className="justify-content-md-center">
                                    <Col sm={6}>
                                        <Image fluid rounded src={movie.Poster} />
                                    </Col>
                                    <Col sm={6}>
                                        <Card style={{ width: "100%", height: "100%" }}>
                                            <Card.Content>
                                                <Card.Header><h1 className="ButtonText">{movie.Title}</h1></Card.Header>
                                                <h1 className="DescriptText">{movie.Plot}</h1>
                                                <h1 className="ActorsText">Starring: {movie.Actors}</h1>
                                            </Card.Content>
                                            <Card.Meta><h1 className="MetaText">{movie.Year} - {movie.Rated} - {movie.Runtime}</h1></Card.Meta>
                                            <Card.Content extra>
                                                <Button onClick={() => dispatch({ type: "REMOVE_MOVIE_FROM_NOMINATIONS", Title: movie.Title })} basic color='red'>
                                                    REMOVE
                                            </Button>

                                            </Card.Content>

                                        </Card>
                                    </Col>
                                </Row>
                            )
                        } else {
                            return null
                        }
                    })}
                </div>
            )
        }
    } else {
        return null;
    }
}

const mapStateToProps = (state) => {
    return {
        movieList: state.movieList,
        movieNomination: state.movieNominations,
        displayPersonalList: state.displayPersonalList
    }
}


export default connect(mapStateToProps)(MovieCard)