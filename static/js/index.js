console.log("connected!");

let number=0
let socket = io("http://localhost:8888");

$(document). ready(function (){


    socket.on('greeting', function (data) { //4
        console.log(data.msg); //5
        socket.emit('thankyou', { msg: 'Thank you for connecting me! -Client' }); //6
    });

})


$("#push").on('click',function(event){
    
    event.preventDefault();
    console.log("Clicked!");
    number++;
    socket.emit("new_count", number);
})


socket.on("count", function(number){

    let displayCount = `<p>This button has been pushed: ${number} times(s)!</p>`;
    $('.counter').html(displayCount);
});

$("#reset").on('click',function(event){
    
    event.preventDefault();
    console.log("Clicked!");
    number=0;
    socket.emit("restart_count", number);
})