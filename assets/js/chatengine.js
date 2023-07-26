//whenever firing an event it is ".emit" when recieving event it is ".on"
class ChatEngine{
    constructor(chatBoxId,userEmail){
        this.chatBoxId=$(`#${chatBoxId}`);
        this.userEmail=userEmail;
        this.socket=io.connect('http://localhost:5000');
        if(this.userEmail){
            this.connectionHandler();
        }
    }
    connectionHandler(){
        let self=this;
        this.socket.on('connect',function(){
            console.log('connection established using sockets...')
            self.socket.emit('join_room',{
                user_email:self.userEmail,
                chatroom:'Codeial'
            });
            self.socket.on('User_joined',function(data){
                console.log('a user joined',data)
            })
        })
    }
}