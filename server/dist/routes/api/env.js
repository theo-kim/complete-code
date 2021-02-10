"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_1 = require("./session");
let getEnv = function (uid) {
    // check if environment exists in memory
    // otherwise create it
    return new Promise((resolve, reject) => {
        session_1.getUser(uid).then((envstr) => {
            resolve(parseEnv(envstr));
        }).catch((err) => {
            reject(err);
        });
    });
};
let parseEnv = function (envstr) {
    let entries = envstr.split(";");
    let env = {
        PWD: "",
        USERNAME: "",
        UID: ""
    };
    for (let i = 0; i < entries.length; ++i) {
        let e = entries[i].split("=");
        env[e[0]] = e[1];
    }
    return env;
};
let envMiddleware = function (req, res, next) {
    getEnv(req.identity.id).then((env) => {
        req.env = env;
        next();
    });
};
exports.default = envMiddleware;
//# sourceMappingURL=env.js.map