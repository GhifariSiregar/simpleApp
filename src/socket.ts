class SocketIO {
  io: any;
  users: any;
  constructor(io: any) {
    this.io = io;
    this.users = {}
  }
  init() {
    this.io.on('connection', (socket: any) => {
      socket.on('new-user', (name: string) => {
        this.users[socket.id] = name;
        socket.broadcast.emit('user-connected', name);
        socket.emit('user-connected', name);
      })
      socket.on('send-chat-message', (message: string) => {
        socket.broadcast.emit('chat-message', { message, name: this.users[socket.id]})
        socket.emit('chat-message', { message, name: this.users[socket.id]})
      })
    })
  }
}

export default SocketIO;