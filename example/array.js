const array = [45, 12, 78];

console.log(array[1]); //12
console.log(array[99]);  //undefined

array.sort();
console.log(array);  //[12, 45, 78]

array.reverse();
console.log(array);  //[78, 45, 12]
