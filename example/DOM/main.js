const paragraph = document.getElementsByTagName('p');
paragraph[0].textContent = 'Hello';


const root = document.querySelector('#root');
const newParagraph = document.createElement('p');
newParagraph.textContent = 'Created Element';
root.appendChild(newParagraph);

const list = document.getElementById('list');
const addTask = document.createElement('li');
addTask.textContent = 'Playing game';
list.insertBefore(addTask, list.children[2]);
list.lastElementChild.remove();


const description = document.getElementById('desc');
description.style.color = 'red';
description.style.fontFamily = 'monospace';
description.style.border = '2px dashed green';


const image = document.getElementsByClassName('random-image')[0];
image.setAttribute('src', 'https://picsum.photos/id/1003/400/500?grayscale')
