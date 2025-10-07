require('./FirstModule.js'); //Modules protected their variables and functions from leaking bydefault
//so, we cant uses the variables and functions of FirstModule.js in this file
//unless we explicitly export them using module.exports

const {sum, x} = require('./SecondModule.js'); //Destructuring to get sum and x from FirstModule.js
//or const obj = require('./FirstModule.js'); //Using an object to access the exported

//import { sum, x } from './SecondModule.js'; //Using ES6 import syntax to get sum and x from SecondModule.js

const {multiply, modulus} = require('./calculate/'); //Destructuring to get multiply and modulus from calculate/index.js
//Here we are importing the functions from the calculate module (calculate as a folder behave as a module here)

console.log("This is App.js Module");

var a = 10;
var b = 20;

console.log("The sum is : ",sum(a,b)); //Calling the function from SecondModule.js
console.log(x); //Accessing the variable from SecondModule.js

console.log("The multiply is : ",multiply(a,b)); //Calling the multiply function from calculate/multiply.js
console.log("The modulus is : ",modulus(a,b)); //Calling the modulus function from calculate/modulus.js