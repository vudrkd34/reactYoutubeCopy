const app = require('express')()
const server = require('http').createServer(app)
const cors = require('cors')
const io = require('socket.io')(server,{
    cors : {
        origin :"*",
        credentials :true
    }
});

io.on('connection', socket=>{
    
      socket.on("send message", (item) => {   //"send message"라는 이벤트 받음 (1) 
        const message = "id : " + item.name + "//  message : " + item.msg;

        socket.join(item.roomId);
        io.sockets.in(item.roomId).emit("receive message", { name: item.name, msg: item.msg , image : item.image });  //"receive message"라는 이벤트 발생
      });

      socket.on("send image", (item) => {   //"send message"라는 이벤트 받음 (1) 
        const message = "id : " + item.name + "//  message : " + item.msg;
        //console.log(message);
        socket.join(item.roomId);
        io.sockets.in(item.roomId).emit("receive image", { name: item.name, msg: item.msg });  //"receive message"라는 이벤트 발생
      });

      socket.on('signal', data => {
        io.emit('signal', data);
      });

      socket.on("roomExit", (item) => {
        console.log("roomExit");
        socket.leave(item.roomId);
      });

      socket.on("disconnect", function () {
        console.log("user disconnected: ", socket.id);
      });
})

server.listen(3001, function(){
    console.log('listening on port 3001');
})//