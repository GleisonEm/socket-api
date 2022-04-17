import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import axios from "axios";
var cors = require('cors')

const app = express();
app.set("port", process.env.PORT || 3000);
app.use(cors({origin: '*'}));
let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

app.get("/user1", async (req: any, res: any) => {
  const response = await axios.get('http://192.168.0.106:3333/message', {
      data: {
        conversationId: "6219124fc392c345cde298e10"
      }
    });

    console.log('deu certo', response.data)
  res.sendFile(path.resolve("./client/user1.html"));
});

// app.get("/user1", async (req: any, res: any) => {
//   const response = await axios.get('http://192.168.0.106:3333/message', {
//       data: {
//         conversationId: "6219124fc392c345cde298e10"
//       }
//     });

//     console.log('deu certo', response.data)
//     console.log(__dirname +"/client/user1.html");
//   res.render(path.resolve("./client/user1.html"), {messages:response.data});
// });

app.get("/user2", (req: any, res: any) => {
  res.sendFile(path.resolve("./client/user2.html"));
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
  console.log("a user connected");
  // whenever we receive a 'message' we log it out
  socket.on("message", async function(content: any) {
    console.log(content);
    const response = await axios.post('http://192.168.0.106:3333/message', {
      message: content.message,
      conversationId: content.conversationId,
      userSendId: content.userSendId
    });

    console.log('deu certo', response);
  });
});

const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});