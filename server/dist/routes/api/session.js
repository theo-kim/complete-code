"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const redis_1 = require("redis");
const ioredis_1 = __importDefault(require("ioredis"));
let redis_url = process.env.REDIS_URL;
if (process.env.ENVIRONMENT === 'development') {
    //   require('dotenv').config();  
    redis_url = "redis://127.0.0.1";
}
let client = redis_1.createClient(redis_url);
let redis = new ioredis_1.default();
client.set("0", "PWD=/guest;USERNAME=guest;UID=0");
let getUser = function (uid) {
    return new Promise((resolve, reject) => {
        client.get(uid, (err, rep) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(rep);
            }
        });
    });
};
exports.getUser = getUser;
//# sourceMappingURL=session.js.map