const request = require('postman-request');

module.exports.forecast = (latitude,longitude,callback) => {

  const url = 'http://api.weatherstack.com/current?access_key=31d4132e7929cd9e542eb9ba0f9e3824&query='+ latitude +','+longitude;
  request({ url,json: true},(err,response) => {
    // console.log(response);
    if(err) {
    callback('Unable to connect to the api',undefined);
    } else if(response.body.error) {
      callback('unable to find location',undefined);
    }  else {
    const data =response.body;
    // console.log(data.current);
    const {current} = data
    callback(undefined,current);
  }
  })
}
