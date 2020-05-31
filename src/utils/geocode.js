const request = require('postman-request');
 module.exports.geocode = (address , callback) => {
   if(address == undefined){
     return callback('No address',undefined)
   }
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYXJ1bmVzaDcyIiwiYSI6ImNrYXJ2OHdlczA1ZG8yeWwyNHIxbTE4NHQifQ.UT7EfNBR4HUm94pCHsVa3w&limit=1'
  request({url:url,json:true},(err,response) => {
    if(err) {
      callback('Unable to connect to location services',undefined)
    } else if(response.body.features.length === 0)
    {
      callback('Unable to find the location',undefined)
    }
     else {
       const {features} = response.body;
    const latitude = features[0].center[1];
    const longitude = features[0].center[0];
    const place = features[0].place_name;
    callback(undefined,{
      latitude:latitude,
      longitude:longitude,
      location:place
    })
  }
  })
}
