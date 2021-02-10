"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ls = exports.cd = exports.pwd = exports.cat = exports.help = exports.welcome = void 0;
const defaults_1 = __importDefault(require("../../config/defaults"));
let welcome = (env, ostream, istream) => {
    try {
        ostream(defaults_1.default.connected);
    }
    catch (err) {
        console.log(err);
    }
};
exports.welcome = welcome;
let help = (env, ostream, istream) => {
    ostream(defaults_1.default.help);
};
exports.help = help;
let ls = function () {
};
exports.ls = ls;
let cat = function () {
};
exports.cat = cat;
let pwd = (env, ostream, istream) => {
    console.log(env);
    ostream(env.PWD);
};
exports.pwd = pwd;
let cd = function () {
};
exports.cd = cd;
//# sourceMappingURL=commands.js.map