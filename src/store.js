import { createStore } from 'redux';
// import { persistStore } from 'redux-persist';

const initialState = {
    movieNominations: [],
    movieList: [],
}
function reducer(state = initialState, action) {
    switch(action.type) {
        case "INCREMENT":
            return {
                count: state.count += 1
            };
        case "ADD_MOVIE_TO_LIST":
            let newMovieList = [...state.movieList]
            newMovieList.push(action.data)
            return {
                ...state,
                movieList: newMovieList
            }
            // console.log("hello")
            // console.log(action.data)
            // let newMovieList = [...state.MovieList]
            // newMovieList.push(action.data)
            // return Object.assign({}, state, {
            //     MovieList: newMovieList
            // })
    
                // ...state,
                // movieList: state.movieList.concat(action.data)
                // MovieList: [...state.MovieList, action.data]

        default:
            return state; 
    }
}

export const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



// export const persistor = persistStore(store)

export default {store};