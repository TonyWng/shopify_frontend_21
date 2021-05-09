import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './Components/LandingPage';
import MoviePage from './Components/MoviePage';
import { store, persistor} from './store';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { Switch, Route, HashRouter} from 'react-router-dom';


function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}/>
      <HashRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={LandingPage}/>
          <Route path="/MoviePage" exact component={MoviePage}/>
        </Switch>
      </div>
      </HashRouter>
      
    </Provider>
    
  );
}

export default App;
