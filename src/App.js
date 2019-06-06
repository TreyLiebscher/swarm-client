import React from 'react';
import './App.css';
import NavBar from './components/navbar';
// testing
import SignupForm from './components/forms/signup-form';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <SignupForm />
      </header>
    </div>
  );
}

export default App;
