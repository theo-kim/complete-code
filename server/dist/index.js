"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const index_1 = __importDefault(require("./routes/errors/index"));
const index_2 = __importDefault(require("./routes/site/index"));
const index_3 = __importDefault(require("./routes/api/index"));
// import sockertHandler from './sockets';
const app = express_1.default();
const server = http_1.createServer(app);
// const io : SocketIO.Server = require("socket.io")(server, {serveClient: false});
app.use('/', index_2.default);
app.use('/console', index_3.default);
app.use(index_1.default);
// io.on('connection', sockertHandler);
server.listen(process.env.PORT, () => {
    console.log("Server listening on port: " + process.env.PORT);
});
//# sourceMappingURL=index.js.map