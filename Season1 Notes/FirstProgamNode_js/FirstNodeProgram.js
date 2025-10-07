console.log("Hello, World!");

console.log(this); //In Node js this keyword refers to an empty object.

console.log(global); //In Node js global is the global object.

console.log(process); //In Node js process is the global object.

console.log(globalThis); //In Node js globalThis is the global object.
//and a standard keyword for all the browsers and other Js environment which points to global object.
//it is decided by the OpenJs community.

console.log(globalThis === global)// true