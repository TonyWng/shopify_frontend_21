import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const initialState = {
    movieNominations: [],
    movieList: [],
}

const persistConfig = {
    key: 'root',
    storage, 
    whitelist: ['movieList', 'movieNominations']
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
        default:
            return state; 
    }
}

export const store = createStore(persistReducer(persistConfig, reducer), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store)

export default {store, persistor};