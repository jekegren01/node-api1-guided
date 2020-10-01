const http = require('http');

const server = http.createServer((req, res) => {
    // use req to get information about the http request
    // use res to send information back to the browser

    //send back a success status code
    res.statusCode = 200;

    //tell the browser we're sending back HTML
    res.setHeader('Content-Type', 'text/html');

    //send the actual HTML
    res.write('<h1>Hello, World</h1>');

    //send this built response out into the internet
    res.end();
})

// web servers need to be continuously listening
server.listen(8080, () => {
    console.log('server started')
})