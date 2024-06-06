const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { time } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Define the main route
app.get('/', (req, res) => {
  res.render('index');
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('a user connected');
  
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
    const message = {
        text: msg,
        time: new Date().toLocaleTimeString(),
        
    };
    console.log(message)
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
