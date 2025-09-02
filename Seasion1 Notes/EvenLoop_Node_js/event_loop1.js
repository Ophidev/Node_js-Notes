setImmediate(() => console.log("setImmediate"));
setTimeout(()=> console.log("Timer expired"),0);
Promise.resolve(()=> console.log("Promise"));

fs.readFile("./file.text", "utf8", () => {
    setTimeout(()=> console.log("2nd timer"),0);
    process.nextTick(()=> console.log("2nd nextTick"));
    setImmediate(()=>console.log("wnd setImmediate"));
    console.log("File REading CGHB");
});

process.nextTick(()=>console.log("nextTick"));
console.log("Last line of the file");

