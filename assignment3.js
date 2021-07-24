const fs = require('fs')
const axios = require('axios');

console.log('Running: Weather App.')
console.log('Data provided by OpenWeather API.')
console.log(``)
// Setting payload
let options = {
  method: 'GET',
  url: 'https://community-open-weather-map.p.rapidapi.com/weather',
  params: {
    q: `London`,
    lat: '0',
    lon: '0',
    // callback: 'test',
    id: '',
    lang: 'null',
    units: 'metric',
    mode: 'JSON'
  },
  headers: {
    'x-rapidapi-key': 'd065a6d56cmsh177414c74052be8p1726dfjsn7ba97c54ee16',
    'x-rapidapi-host': 'community-open-weather-map.p.rapidapi.com'
  }
};

// Getting the passed value
let passedVal = process.argv[2];

// Getting today's date
let today = new Date();

// Setting up filename
let fileName = `OpenWeather_${passedVal}_${today.getFullYear()}${today.getMonth()+1}${today.getDate()}.txt`

// Check if there is passed value
if (passedVal) {
  axios.request(options).then(function (response) {
    let result = response.data

    console.log(`Current date: ${today}`)
    console.log(`OpenWeather data for: ${passedVal}`)
    console.log(`Current weather: ${result.weather[0].main}`)
    console.log(`Current weather description: ${result.weather[0].description}`)
    console.log(`Current temperature: ${result.main.temp} C`);
    // console.log(`Saving extra information to file: ${fileName}`)
    console.log(``)

    let JSONresult = JSON.stringify(result);
    fs.writeFile(fileName, JSONresult, function(err){
      if (err) throw err;
      console.log(`Saved JSON payload to: ${fileName}`);
    })

  }).catch(function (error) {
    console.error(error);
  });
  
  // console.log(process.argv[2])
}
else {
  console.log("Please check your value.")
  return 1;
}
