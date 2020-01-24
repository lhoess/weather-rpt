import React from 'react';
import logo from './logo.svg';
import './App.css';
import DarkSky from './components/DarkSky'
function App() {
	let weather = DarkSky();

  return (
    <div className="App">
			<div style={{backgroundColor:'firebrick', fontWeight:'bold', padding:'10px', color:'gold'}}>Environment: {process.env.NODE_ENV}</div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}
console.log("NODE END: ", process.env.NODE_ENV)
console.log("REACT_APP_WEBSITE_NAME: ", process.env.REACT_APP_WEBSITE_NAME)
export default App;
