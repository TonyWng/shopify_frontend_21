import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const initialState = {
    movieNominations: [],
    movieList: [],
    displayPersonalList: true, 
}

const persistConfig = {
    key: 'root',
    storage, 
    whitelist: ['movieList', 'movieNominations']
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case "ADD_MOVIE_TO_LIST":
            let newMovieList = [...state.movieList]
            newMovieList.push(action.data)
            return {
                ...state,
                movieList: newMovieList
            }
        case "REMOVE_MOVIE_FROM_LIST":
            return {
                ...state,
                movieList: state.movieList.filter((movie) => movie.Title != action.Title),
            }
        case "REMOVE_MOVIE_FROM_NOMINATIONS":
            return {
                ...state,
                movieNominations: state.movieNominations.filter((movie) => movie.Title != action.Title)
            }
        case "NOMINATE_MOVIE":
            let newNominationsList = [...state.movieNominations]
            newNominationsList.push(action.data)
            return {
                ...state,
                movieNominations: newNominationsList
            }
        case "TOGGLE_MOVIE_LIST":
            return {
                ...state,
                displayPersonalList: !state.displayPersonalList
            }
        default:
            return state; 
    }
}

export const store = createStore(persistReducer(persistConfig, reducer), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store)

export default {store, persistor};