import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors"
import userRoute from "./routes/userRoute"
import messageRoute from "./routes/messageRoute"
import chatRoute from "./routes/chatRoute"
import 'dotenv/config';
import { Server } from "socket.io"
import SocketFun from "./socket/socketService";
import path from "path";



const app = express();

const productionOrigins = [process.env.ORIGIN_1, process.env.ORIGIN_1, process.env.ORIGIN_3]
const devOrigin = ["http://localhost:5173",]
const allowedOrigin = process.env.NODE_ENV === 'production' ? productionOrigins : devOrigin

app.use(cors({
  origin: (origin, callback) => {
    if(allowedOrigin.includes(origin)){
      console.log(origin, allowedOrigin)
      callback(null, true)
    }else{
      callback(new Error(`Not allowed by CORS ${origin}`))
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());
const PORT = 3000;


app.use('/user', userRoute);
app.use('/message', messageRoute)
app.use('/chat', chatRoute)
app.use('/', (req, res) => {
  res.json(`working`)
})


// const __dirname1 = path.resolve()
// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join(__dirname1, "/client/build")));
//   app.get('*', (req, res) => {
//     // res.sendFile()
//   })

// }else{
//   app.use('/', (req, res) => {
//     res.json('working')
//   })
// }


if (process.env.db) {
  console.log(process.env.db);
  mongoose.connect(process.env.db, { dbName: "chat" } as ConnectOptions)
  console.log('succesfully connected to gb')
} else {
  console.log('cant connect to db');
}


const server = app.listen(PORT, () => console.log(`connected to ${PORT}`));
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

SocketFun(io);






/*  Trash, dont look here

const httpServer = http.createServer(app);

const socketServiceInstance = new SocketService();
socketServiceInstance.initListeners();

socketServiceInstance.io.attach(httpServer);

httpServer.listen(PORT, () => {
  console.log(`HTTP Server started at PORT:${PORT}`)

}) 

*/


