import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LandingPage from './Components/LandingPage';
import { store} from './store';
import { Provider } from "react-redux";


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <LandingPage/>
      </div>
    </Provider>
    
  );
}

export default App;
