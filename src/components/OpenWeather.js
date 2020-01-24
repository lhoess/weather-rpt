import React, { useState, useEffect } from 'react';

//API 5cfbeb9c5a0a0ba58e68f01c0c9a4d9b
const APPID="5cfbeb9c5a0a0ba58e68f01c0c9a4d9b"
const baseUrl ="http://api.openweathermap.org/data/2.5/weather?units=imperial&APPID="+APPID
const lat = "39.7547261"
const long = "-105.0908151"

function getWeatherRpt(url){
	return fetch(url)
}


function OpenWeather(props){
	const [data, setData] = useState({})
	const decoder = new TextDecoder('utf-8')
	let location = props ? props.loc : 'Denver, us'
	let locationURL = baseUrl+'&q='+location
	let locationLatLon = baseUrl+'&lat='+lat+'&lon='+long
	// console.log("URL", locationURL)
	console.log("URL", locationLatLon)
	// let result = getWeatherRpt(locationLatLon)
	// console.log("Open Weather Rpt", result)
	useEffect( () => {
			// You can await here
			const fetchData = async () => {
				const response = await getWeatherRpt(locationLatLon);
				// console.log("Weather JSON:", response)
				if(!response.body.locked){
					response.body.getReader().read().then(({value, done}) => {
						console.log("value",value)
						console.log("done",done)
						setData(JSON.parse(decoder.decode(value)));
						if (done) {
							console.log("Done.")
						}
					});
				}
			}
			fetchData();

	}, [locationLatLon]); // Or [] if effect doesn't need props or state

	/* const reader = data.body.getReader();
	const stream = new ReadableStream({
    start(controller) {
      // The following function handles each data chunk
      function push() {
        // "done" is a Boolean and value a "Uint8Array"
        reader.read().then(({ done, value }) => {
          // Is there no more data to read?
          if (done) {
            // Tell the browser that we have finished sending data
            controller.close();
            return;
          }

          // Get the data and send it to the browser via the controller
          controller.enqueue(value);
          push();
        });
      };

      push();
    }
  }); */

  // return new Response(stream, { headers: { "Content-Type": "text/html" } });
	console.log("wx data", data)

	return (
    <div>
      <p>
        Weather Data for {data.name} <br></br>
				{JSON.stringify( data)}
      </p>

    </div>
  );

}

export default OpenWeather
