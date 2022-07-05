const v1 = 'Hello';
const v2 = 3 + 7;
const v3 = [1, 2, 3];
const v4 = true;
const v5 = 6 + 3 + '2';
const printName = (name) => console.log('Hello my name is: ' + name);
const getCurrentDate = () => {
  let date = new Date();
  return console.log(date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear());
}

function getInfo(param) {
  console.log(typeof param);
  console.log('Value: ' + param);
}



getInfo(v1);
getInfo(v2);
getInfo(v3);
getInfo(v4);
getInfo(v5);

printName('Toan');
getCurrentDate();
