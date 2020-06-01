console.log('client side js is loaded');


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const para = document.querySelectorAll('p');
console.log(para);
weatherForm.addEventListener('submit',(e)=> {
  e.preventDefault();
  console.log(search.value);
  fetch('/weather?address=' + search.value)
  .then(res => res.json())
  .then(data =>
    {
      if(data.error)
      {
        console.log(data.error);
        para[0].textContent = data.error;
      }else {
  console.log(data.forecast);
  console.log(data.temperature);
  para[0].textContent = data.forecast;
  para[1].textContent = 'Here in ' + data.location + ' The temperature is ' + data.temperature + 'but it feels like ' + data.feelslike;

}
  }
  )
})
