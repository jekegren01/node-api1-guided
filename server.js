// const http = require('http');

// const server = http.createServer((req, res) => {
//     // use req to get information about the http request
//     // use res to send information back to the browser

//     //send back a success status code
//     res.statusCode = 200;

//     //tell the browser we're sending back HTML
//     res.setHeader('Content-Type', 'text/html');

//     //send the actual HTML
//     res.write('<h1>Hello, World</h1>');

//     //send this built response out into the internet
//     res.end();
// })

//eliminated above to demonstate express


//this import is now pulling from node_modules instead of the NOde stdlib
const express = require('express');
const db = require('./database');

//create an express server instance
const server = express();

//this allows us to parse request JSON bodies
server.use(express.json());

server.get('/', (req, res) => {
    res.json({ message: 'Hello, World' })
});

server.get('/users', (req, res) => {
    //simulate a real call to a database to fetch data
    const users = db.getUsers();
    // return this 'fake data to the client (browser, insomnia)
    res.json(users);
})

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.getUserById(id);

    //check if user exists
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({
            message: 'User not found',
        })
    }
    // res.json(user);
})

server.post('/users', (req, res) => {
    const newUser = db.createUser({
        name: req.body.name,
    })
    res.status(201).json(newUser);
})

server.put('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.getUserById(id);

    if (user) {
        const updatedUser = db.updateUser(id, {
            name: req.body.name
        })
        res.json(updatedUser);
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = db.getUserById(id);

    if (user) {
        db.deleteUser(id)
        //204 means a successful empty response
        res.status(204).end()
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
})

// web servers need to be continuously listening
server.listen(8080, () => {
    console.log('server started')
});