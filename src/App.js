import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './Components/LandingPage';
import MovieList from './Components/MovieList';
import { store, persistor} from './store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}/>
      <div className="App">
        <LandingPage/>
        <MovieList/>
      </div>
    </Provider>
    
  );
}

export default App;
