class Student {
  name
}

class Animal {
  constructor(name, quantity) {
    this.name = name;
    this.quantity = quantity;
  }

  getTotal() {
    return console.log('Total animal: ' + this.quantity)
  }

  toString() {
    return console.log('Animal name: ' + this.name + ' quantity: ' + this.quantity)
  }
}

const student = new Student();
student.name = 'Toan';
console.log(student.name);


const dog = new Animal("Dog", 12);
dog.getTotal();
dog.toString();

class Duck extends Animal {
}

const duck = new Duck('Duck', 10);
duck.toString();
 