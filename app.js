'use strict';

var http = require('http');
var express = require('express');
// Create Express webapp.
var app = express();
require('dotenv').load();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const TodoList = [{
        id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa1",
        title: 'Angularty',
        isActive: true,
        type: "Work",
        datetime: "Tue Jan 05 2021 08:19:29 GMT+0700 (Giờ Đông Dương)"
    },
    {
        id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa2",
        title: 'ReactJs',
        isActive: false,
        type: "Training",
        datetime: "Tue Jan 05 2021 21:19:29 GMT+0700 (Giờ Đông Dương)"
    },
    {
        id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa3",
        title: 'React Native',
        isActive: true,
        type: "Outside",
        datetime: "Tue Jan 10 2021 03:20:29 GMT+0700 (Giờ Đông Dương)"
    },
    {
        id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa4",
        title: 'HTML',
        isActive: true,
        type: "Work",
        datetime: "Tue Jan 05 2021 7:19:29 GMT+0700 (Giờ Đông Dương)"
    },
    {
        id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa5",
        title: 'NCC Soft',
        isActive: true,
        type: "Training",
        datetime: "Tue Jan 08 2021 05:38:29 GMT+0700 (Giờ Đông Dương)"
    },
    {
        id: "b77d409a-10cd-4a47-8e94-b0cd0ab50aa6",
        title: 'VueJS',
        isActive: true,
        type: "Outside",
        datetime: "Tue Jan 05 2021 15:19:29 GMT+0700 (Giờ Đông Dương)"
    },
]

app.use(async(req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    next()
});

app.get('/', function(request, response) {
    response.status(200).json({ status: "sucess", body: "App is running" })
})

app.get('/todoList', function(request, response) {
    // const identity = request.query.identity

    // if (!identity) {
    // return response.status(400).send({
    // status: "error",
    // body: "identity is required..."
    // })
    // }

    // const user = users.find(user => user.identity === identity)

    // if (!user) {
    // return response.status(400).send({
    // status: "error",
    // body: "identity not found"
    // })
    // }

    return response.status(200).send({
        status: "success",
        data: TodoList
    })
});

app.post('/todoList', function(request, response) {
    TodoList.push(request.body.item)
    return response.status(200).send({
        status: "success",
    })
});

app.put('/todoList/itemActive', function(request, response) {
    let index = TodoList.findIndex(e => e.id === request.body.item.id);
    TodoList[index].isActive = !TodoList[index].isActive
    return response.status(200).send({
        status: "success",
    })
});

app.post('/todoList/itemActiveAll', function(request, response) {
    let isActive = TodoList[0].isActive;
    TodoList.forEach(e => e.isActive = !isActive);
    return response.status(200).send({
        status: "success",
    })
});

app.delete('/todoList/:id', function(request, response) {
    let index = TodoList.findIndex(e => e.id === request.params.id);
    TodoList.splice(index, 1);
    return response.status(200).send({
        status: "success"
    })
});

// Create http server and run it.
var server = http.createServer(app);
var port = process.env.PORT || 3001;
server.listen(port, function() {
    console.log('Express server running on *:' + port);
});