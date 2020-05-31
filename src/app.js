const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geo = require('./utils/geocode')
const cast =  require('./utils/forecast');
// console.log(__dirname);
// console.log(path.join(__dirname,'../public'));
const app = express();
const publicDirectoryPath = path.join(__dirname,'../public')
app.set('views',path.join(__dirname,'../templates/views'));
const partialsPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
app.get('',(req,res) => {
  res.render('index',{
    title: 'Weather App',
    name: "Arunesh Dhar"
  });
})
app.get('/about',(req,res) => {
  res.render('about',{
    title: 'About the page',
    name: 'Arunesh Dhar'
  })
})
app.get('/help',(req,res) => {
  res.render('help',{
    message:'For more help,contact me at 987654321',
    title: 'Help',
    name: 'Arunesh'
  })
})
app.get('/weather',(req,res) => {
  if(!req.query.address) {
    return res.send({
      error:'You must provide an address'
    })
  }
  geo.geocode(req.query.address,(error,{latitude,longitude,location} = {}) => {
    if (error) {
      return res.send({
        error: error
      })
    }
    console.log(location);
    cast.forecast(latitude,longitude,(error,datas) => {
      const {weather_descriptions,temperature,feelslike} = datas
      if(error) {
        return console.log('Error');
      }
        console.log(weather_descriptions + '. Today temp is ' + temperature + ' but it feels like ' + feelslike);
        res.send({
          forecast: weather_descriptions[0],
          location: location,
          temperature:temperature,
          feelslike:feelslike
        })
    })

  })

})
app.get('/products',(req,res) => {
  if(!req.query.search) {
     return res.send({
      error: 'You must provide a search item'
    })
  }
  console.log(req.query);
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res) => {
  res.render('404',{
    title:404,
    errorMessage: 'Page not found',
      name:'Arunesh'
  })
})
app.get('*', (req,res) => {
  res.render('404',{
    title:404,
    errorMessage: 'Page not found',
      name:'Arunesh'
  })
})
app.listen(3000,() => {
  console.log('Server is up on port 3000');
})
