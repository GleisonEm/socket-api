"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const path = require("path");
const fs = require("fs");
const v2_1 = require("@google-cloud/translate/build/src/v2");
// const {Translate} = require('@google-cloud/translate').('');
var googleTranslate = require('google-translate')(apiKey, options);
const translate = new v2_1.Translate();
const app = express();
app.set("port", process.env.PORT || 3000);
let http = require("http").Server(app);
// set up socket.io and bind it to our
// http server.
let io = require("socket.io")(http);
app.get("/", (req, res) => {
    console.log(fs);
    var data = (fs.readFileSync(path.resolve(__dirname, 'file/temp.txt'), 'utf-8')).split(';');
    let result = [];
    let resultTranslate = [];
    data.forEach(function (data, key, object) {
        return __awaiter(this, void 0, void 0, function* () {
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
    });
    console.log(result);
    res.send(result);
    // res.sendFile(path.resolve("./client/index.html"));
});
app.get("/translate", (req, res) => {
    res.send('hello world');
    fs.readFile("temp.txt", function (err, buf) {
        console.log(err);
    });
});
// whenever a user connects on port 3000 via
// a websocket, log that a user has connected
io.on("connection", function (socket) {
    //   console.log("a user connected");
    // whenever we receive a 'message' we log it out
    socket.on("message", function (message) {
        console.log(message);
    });
});
const server = http.listen(3000, function () {
    console.log("listening on *:3000");
});
//# sourceMappingURL=server.js.map