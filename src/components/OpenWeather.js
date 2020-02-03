import React, { useState, useEffect, Fragment } from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from 'react-bootstrap';

const APPID="5cfbeb9c5a0a0ba58e68f01c0c9a4d9b"
const baseUrl ="http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID="+APPID
const lat = "39.75"
const long = "-104.97"
const decoder = new TextDecoder('utf-8')

const showWx = ({id, main, description},wxIcon) => {
	return (
	 	<div>
		  <i>
				<img src= {wxIcon} alt={main}/>
			</i>
			<div><strong>Description: </strong>{description}

			</div>
			<div><strong>Main: </strong>{main}</div>
		</div>
	)
}
const showWind = ({speed}) =>{
	return(
		<div><strong>Speed: </strong>{speed} mph</div>
	)
}

const showTemp = ({temp,feels_like,temp_min,temp_max,pressure,humidity}) =>{
	return(
		<Fragment>
		<div style={{borderTop:"0px solid grey", paddingTop:"10px"}}><strong>Temp: </strong>{temp}</div>
		<div><strong>Feels Like: </strong>{feels_like}</div>
		<div><strong>Temp Min/Max: </strong>{temp_min}/{temp_max}</div>
		<div><strong>Humidity: </strong>{humidity}%</div>
		</Fragment>
	)
}

const showLoc = ({lat, lon}) =>{
	return (
	 <div><strong>Location: </strong>{lat} , {lon} </div>
	 )
}

const getWeatherRpt = async(location) => {
	const url = ( location.split(',').length>1) ? `${baseUrl}&q=${location}` : `${baseUrl}&q=${location},us`
	console.log("****** URL: useState ****", url)
	const fetchWx = await fetch(url)
	const reader = await fetchWx.body.getReader()
	let {value: result, done: readerDone} = await reader.read();
	result = result ? decoder.decode(result) : "";
	// console.log("Final Result", result)
	return result;
}
const OpenWeather = () => {
	// const [submitted, setSubmit] = useState(false)
	const [data, setData] = useState([])
	const [coord, setCoord] = useState([])
	const [location,setLocation] = useState('Denver,us')
	const [weather, setWeather] = useState([])
	const [temp,setTemp] = useState([])
	const [wind,setWind] = useState([])
	const [wxIcon,setWxicon] = useState([])

	// let location = props ? props.loc : 'Denver,us'
	// let locationURL = `${baseUrl}&q=${location}`
	// let locationLatLon = baseUrl+'&lat='+lat+'&lon='+long
	//
	// console.log("URL Lat/Long", locationLatLon)
	useEffect( () => {
			let response;
			// You can await here
			const fetchData = async () => {
				try{
					response = await getWeatherRpt(location);
				} catch(error){
					console.error(error)
				}
			// console.log("JSON Response", JSON.parse(response))
			// setSubmit(true)
			setData(JSON.parse(response));
			setTemp(JSON.parse(response).main);
			setCoord(JSON.parse(response).coord)
			setWxicon("http://openweathermap.org/img/wn/"+JSON.parse(response).weather[0].icon+"@2x.png")
			setWeather(JSON.parse(response).weather[0])
			setWind(JSON.parse(response).wind)

		}
			fetchData();
		}, [location]); // Or [] if effect doesn't need props or state

		// Convert object to Array with new ES2017 methods
		// let testArray = Object.entries(weather)
		// console.log("Test Array", testArray)
	return (
		<Row>
			<Col sm={4} >
				<Card className="p-2">
					<Card.Header>Check Weather</Card.Header>
					<p>Check weather at another location.</p>
					<Form onSubmit={e => {
						// let form = e.target
						// console.log("E",e.target)
						// console.log("Location",e.target.elements.location.value)
						e.preventDefault();
						setLocation(e.target.elements.location.value)
						// getWeatherRpt();
					}}>
						<Form.Group as={Row} controlId="location">
						<Form.Label column sm="2">City</Form.Label>
						<Col>
							<Form.Control size="sm" type="text" placeholder="Enter a US City" />
							{/* onBlur={event => setLocation(event.target.value)}  */}
							<Form.Text className="text-muted">
								Enter the name of your city.
							</Form.Text>
						</Col>
						{/* onChange={event => setLocation(event.target.value)} */}
						<Col sm={3}>
						<Button variant="primary" type="submit" size="sm"  >
							Submit
						</Button>
						</Col>
						</Form.Group>
					</Form>
				</Card>
			</Col>

			{/* Display Weather */}

			<Col sm={4}>
				<Card key={data.id}  className="pb-4">
				<Card.Header className="mb-3"><h2>Weather for {data.name} </h2></Card.Header>
					{showLoc(coord)}
					{showWx(weather,wxIcon)}
					{showTemp(temp)}
					{showWind(wind)}


					{/* <div>
						<br></br>visibility {data.visibility} ID: {data.id}
					</div> */}
					{/* <pre>
					{JSON.stringify( data)}
						<br></br>

					<strong>data.main</strong>
						{JSON.stringify( data.coord)}
						<br></br>
						<strong>data.weather</strong>
						{JSON.stringify( data.weather)}

					</pre> */}

				</Card>
			</Col>
		</Row>
  );


}

export default OpenWeather
