"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const guest = {
    id: "0",
    username: "guest",
    home: "/"
};
let auth = function (req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        let token = bearerHeader.split(' ')[1];
        jsonwebtoken_1.verify(bearerHeader, process.env.SERVER_SECRET, (err, decoded) => {
            if (err) {
                req.identity = guest;
            }
            else {
                req.identity = decoded;
            }
        });
    }
    else {
        req.identity = guest;
    }
    next();
};
exports.default = auth;
//# sourceMappingURL=auth.js.map