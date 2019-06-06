import React from 'react';
import './App.css';
import NavBar from './components/navbar';
import routes from './routes';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <header className="App-header">
            <NavBar />
            {routes}
          </header>
        </div>
      </Router>
    </div>
  );
}

export default App;
