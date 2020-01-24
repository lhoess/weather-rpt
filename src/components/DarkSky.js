import { useEffect } from "react"

// import React, { Component, useState, useEffect } from 'react';
// import { render } from '@testing-library/react';
const url = 'https://api.darksky.net/forecast/'+process.env.REACT_APP_DARKSKY+'/'
const lat = "39.7547261"
const long = "-105.0908151"
let locUrl = url+lat+','+long

console.log("Dark Sky URL:", url)
console.log("Dark Sky Complete URL:", locUrl)

async function getWeatherRpt(url){
	return await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
		mode: 'no-cors', // no-cors, *cors, same-origin)
	})

}

function DarkSky(props){
	const report = getWeatherRpt(locUrl)
	console.log("Weather:", report)
	useEffect(()=>getWeatherRpt(locUrl))
}

export default DarkSky
