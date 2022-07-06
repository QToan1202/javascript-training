const quotes_number = 3;
const api_url = `https://goquotes-api.herokuapp.com/api/v1/random?count=${quotes_number}`;

async function getQuote(url){
    const response = await fetch(url);
    const data = await response.json();
    if ('quotes' in data) {
      showData(data.quotes);
    } else {
      console.log('Don\'t have any quotes return');
    }
}

function showData(array){
  array.forEach(value => {
    console.log(value['text'])
  });
}

getQuote(api_url)

const checkAPI = async url => {
  const response = await fetch(url);
  const data = await response.json();
  const promise = new Promise((resolve, reject) => {
    if (data.status == 200) {
      resolve('OK');
    } else {
      reject('Error when calling API');
    }
  });
  console.log(await promise);
}

checkAPI(api_url);
