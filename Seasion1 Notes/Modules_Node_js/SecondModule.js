console.log("This is SecondModule.js File");

function sum(a, b) {
  const result = a + b;
  return result;
}

let x = 5;

//     OR ( the next lines to use ES6 export syntax)

// export function sum(a,b){

//     const result = a+b;
//     return result;
// }
// export let x = 5;

console.log(module.exports); // this is an Empty object
// because we haven't exported anything yet

   // So Another way to export is:
// module.exports.sum = sum;
// module.exports.x = x;

// or we can export using an object
module.exports = { sum, x };
// or module.exports = {
//          sum:sum,
//           x:x
//                  };

console.log(module.exports); // this will show the exported object with sum and x
// Now we can use these exports in other modules by requiring this module

