const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const port = 5000;

app.use(cors({
  origin: 'https://instagramclone-frontend.vercel.app', // replace with your front-end URL
  credentials: true,
  methods: ['GET', 'POST']
}));
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Connected to Vercel Successfully");
});

app.use('/insta/auth', require('./routes/auth'));
app.use('/insta/post', require('./routes/post'));
app.use('/insta/update', require("./routes/update"));
app.use('/insta/follow', require('./routes/follow'));
app.use('/insta/comments', require('./routes/comments'));
app.use('/insta/messages', require('./routes/messages')); // Add the messages route

const io = socketIo(server, {
  cors: {
    origin: 'https://instagramclone-frontend.vercel.app', // replace with your front-end URL
    methods: ['GET', 'POST'],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinRoom', ({ userId }) => {
    socket.join(userId);
  });

  socket.on('sendMessage', async ({ sender, receiver, content }) => {
    const message = new Message({ sender, receiver, content });
    await message.save();
    io.to(receiver).emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Instagram app backend listening at port: http://localhost:${port}`);
});
