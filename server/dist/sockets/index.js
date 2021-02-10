"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaults_1 = __importDefault(require("../config/defaults"));
function socketHandler(socket) {
    console.log("new connection");
    socket.emit('welcome', defaults_1.default.connected);
}
exports.default = socketHandler;
//# sourceMappingURL=index.js.map