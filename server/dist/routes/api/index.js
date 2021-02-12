"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const defaults_1 = __importDefault(require("../../config/defaults"));
const commands_1 = require("./commands");
const auth_1 = __importDefault(require("./auth"));
const env_1 = __importDefault(require("./env"));
const router = express_1.Router();
const legalcommands = {
    'welcome': commands_1.welcome,
    'help': commands_1.help,
    'ls': commands_1.ls,
    'cd': commands_1.cd,
    'cat': commands_1.cat,
    'pwd': commands_1.pwd,
    'login': () => { },
    'register': () => { }
};
router.get("/", (req, res) => {
    return res.status(200).type('txt').send('');
});
router.get("/:command", auth_1.default, env_1.default, (req, res) => {
    const ostream = (msg) => res.type('txt').send(msg);
    if (req.params.command in legalcommands) {
        return legalcommands[req.params.command](req.env, ostream, null);
    }
    else {
        return res.status(400).type('txt').send(req.params.command + ": " + defaults_1.default.unknown);
    }
});
exports.default = router;
//# sourceMappingURL=index.js.map