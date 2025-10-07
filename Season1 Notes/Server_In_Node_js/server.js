const http = require("node:http");
//const http = require ("http"); //we can also import module like this

const server = http.createServer(function(req,res){

    if(req.url === "/secretData"){

        res.end("No Secret Data");
    }

    res.end("Namaste Node.js");

});

server.listen('3737'); //maping a port number with the created server by me.