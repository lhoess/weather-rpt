import React, { useState, useEffect, Fragment } from 'react';

//API 5cfbeb9c5a0a0ba58e68f01c0c9a4d9b
const APPID="5cfbeb9c5a0a0ba58e68f01c0c9a4d9b"
const baseUrl ="http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID="+APPID
const lat = "39.75"
const long = "-104.97"
const decoder = new TextDecoder('utf-8')


const getWeatherRpt = async(url) => {
	const fetchWx = await fetch(url)
	const reader = await fetchWx.body.getReader()
	let {value: result, done: readerDone} = await reader.read();
	result = result ? decoder.decode(result) : "";
	// console.log("Final Result", result)
	return result;
}
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

function OpenWeather(props){
	const [data, setData] = useState([])
	const [coord, setCoord] = useState([])
	const [weather, setWeather] = useState([])
	const [temp,setTemp] = useState([])
	const [wind,setWind] = useState([])
	const [wxIcon,setWxicon] = useState([])
	let location = props ? props.loc : 'Denver, us'
	let locationURL = baseUrl+'&q='+location
	let locationLatLon = baseUrl+'&lat='+lat+'&lon='+long
	// console.log("URL", locationURL)
	// console.log("URL Lat/Long", locationLatLon)

	useEffect( () => {
			// You can await here
			const fetchData = async () => {
				const response = await getWeatherRpt(locationLatLon);
				// console.log("JSON Response", JSON.parse(response))
				setData(JSON.parse(response));
				setTemp(JSON.parse(response).main);
				setCoord(JSON.parse(response).coord)
				setWxicon("http://openweathermap.org/img/wn/"+JSON.parse(response).weather[0].icon+"@2x.png")
				setWeather(JSON.parse(response).weather[0])
				setWind(JSON.parse(response).wind)

			}
			fetchData();
		}, [locationLatLon]); // Or [] if effect doesn't need props or state

	return (

    <div key={data.id} style={{width:"40%"}}>

			<h2>Weather Data for {data.name} </h2>
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

    </div>
  );


}

export default OpenWeather
