const list = ['Hello', 'it\'s', 'me'];
let i = 0;

while (i < list.length) {
  console.log(list[i])
  i += 1
}

for (const value of list) {
  console.log(value)
}

for (let j = 1; j <= 100; j++) {
  console.log(j);
}
