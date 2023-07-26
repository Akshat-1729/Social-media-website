const cors = require('cors'); // Import the cors package
module.exports.chatSockets = function (socketServer) {
  const io = require('socket.io')(socketServer, {
    cors: {
      origin: 'http://localhost:7000', 
      methods: ['GET', 'POST'],
      allowedHeaders: ['my-custom-header'],
      credentials: true
    }
  });

  // Your existing socket.io code here
  io.sockets.on('connection', function (socket) {
    console.log('new connection received', socket.id);
    socket.on('disconnect',function(){
        console.log('socket disconnected')
    });
    socket.on('join_room',function(data){
        console.log('joining request recieved',data);
        socket.join(data.chatroom);
        io.in(data.chatroom).emit('User_joined',data);
    })
  });
};