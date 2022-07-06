const api_url = 'https://type.fit/api/quotes';

fetch(api_url)
.then(response => response.json())
.then(data => {
  if (!Object.keys(data).length) {
    console.log('No data found')
  } else {
    data.slice(0, 5).forEach(element => {
      console.log(element['text']);
    });
  }
})
.catch(error => console.log(error))
