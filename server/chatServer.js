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
        //console.log(message);
        io.emit("receive message", { name: item.name, msg: item.msg });  //"receive message"라는 이벤트 발생
      });
      socket.on("disconnect", function () {
        console.log("user disconnected: ", socket.id);
      });
})

server.listen(3001, function(){
    console.log('listening on port 3001');
})//