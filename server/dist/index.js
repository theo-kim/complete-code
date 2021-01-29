"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const errors_1 = __importDefault(require("./routes/errors"));
const site_1 = __importDefault(require("./routes/site"));
const app = express_1.default();
const server = http_1.createServer(app);
app.use('/', site_1.default);
app.use(errors_1.default);
server.listen(process.env.PORT, () => {
    console.log("Server listening on port: " + process.env.PORT);
});
//# sourceMappingURL=index.js.map