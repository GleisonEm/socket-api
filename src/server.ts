import * as express from "express";
import * as socketio from "socket.io";
import * as path from "path";
import * as fs from "fs"
import { Translate } from "@google-cloud/translate/build/src/v2";
// const {Translate} = require('@google-cloud/translate').('');
var googleTranslate = require('google-translate')(apiKey, options);
interface Result {
  contexto: string;
  classe: string;
}

const translate = new Translate();

const app = express();
app.set("port", process.env.PORT || 3000);

let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);

app.get("/", (req: any, res: any) => {
console.log(fs);

    var data = (fs.readFileSync(path.resolve(__dirname,'file/temp.txt'), 'utf-8')).split(';');

    let result: Array<Result> = [];
    let resultTranslate: Array<String> = [];
    data.forEach(async function(data, key, object) {
      var index = data.split('\\');

      if (index.length > 1) {
        console.log(index.length);

        // googleTranslate.translate('My name is Brandon', 'es', function(err: any, translation: any) {
        //   console.log(translation.translatedText);
        //   // =>  Mi nombre es Brandon
        // });
        // let [translations] = await translate.translate('dog', 'pt');
        // translations = Array.isArray(translations) ? translations : [translations];
        // console.log('Translations:');
        // translations.forEach((translation: String, i: Number) => {
        //   console.log(`${translation}`);
        // });

        result.push({
            contexto: index[index.length - 2],
            classe: index[index.length - 1]
          });
      }
    });

    console.log(result)
    res.send(result);
  // res.sendFile(path.resolve("./client/index.html"));
});

app.get("/translate", (req: any, res: any) => {
  res.send('hello world')
  fs.readFile("temp.txt", function(err, buf) {
    console.log(err);
  });
});

// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function(socket: any) {
//   console.log("a user connected");
  // whenever we receive a 'message' we log it out
  socket.on("message", function(message: any) {
    console.log(message);
  });
});

const server = http.listen(3000, function() {
  console.log("listening on *:3000");
});