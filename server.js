
var express = require("express");
var app = express();

var server = app.listen(8888);

var io = require("socket.io")(server);
var counter = 0;
// -------------------------------

app.use(express.static(__dirname +"/static"));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


// -------------------------------
io.on('connection', function (socket) { //2
    console.log("You've reache the server");
    // console.log(socket);
    socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
    socket.on('thankyou', function (data) { //7
        console.log(data.msg); //8 (note: this log will be on your server's terminal)
    });
});

io.on("connection", function(socket){

    console.log("Someone just connected");
    socket.on("new_count", function (number) {
        io.sockets.emit('count', number);
    });

});

io.on("connection", function(socket){

    console.log("Someone just connected");
    socket.on("restart_count", function (number) {
        io.sockets.emit('count', number);
    });

});
// -----------------------------------
app.get("/", function(request, response){
    console.log("Home");
    response.render("index");
});