import React from 'react';
import {Container} from 'react-bootstrap'
import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaDev,FaExclamation } from "react-icons/fa";
// import logo from './logo.svg';
// import DarkSky from './components/DarkSky'
import OpenWeather from './components/OpenWeather'
function App() {
// 	let weather = OpenWeather();
// console.log("App:Weather", weather)
  return (
		<Container fluid>
		<Alert key={process.env.NODE_ENV} variant={'danger'}>
		<FaExclamation />		Environment: {process.env.NODE_ENV}  <FaDev />
		</Alert>
    <div className="App">
			<OpenWeather loc='Lakewood,us' />
    </div>
		</Container>
  );
}
console.log("NODE END: ", process.env.NODE_ENV)
console.log("REACT_APP_WEBSITE_NAME: ", process.env.REACT_APP_WEBSITE_NAME)
export default App;
