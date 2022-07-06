console.log('Hello');
setTimeout(() =>  console.log('Bye'), 2000);
console.log('Hello from the other side');

function getTotal(f_number, s_number) {
  if (!isNaN(f_number) || !isNaN(s_number)) {
    const sum = f_number + s_number;
    console.log('Total: ' + sum);
  } else {
    console.log('Not a number')
  }
}

function showResult(first, second, func) {
  console.log(first);
  console.log(second);
  func(first, second);
}

showResult(Math.floor(Math.random() * 100), Math.floor(Math.random() * 100), getTotal);

