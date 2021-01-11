let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('connected');
  socket.on('message', (msg) => {
    console.log('chat message' + msg);
  });
  socket.on('message', (msg) => {
    io.emit('message', msg);
  });
  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' });

http.listen(4000, () => {
  console.log('listening on *:4000');
});
