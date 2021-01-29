"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.ClientResourceType = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
var ClientResourceType;
(function (ClientResourceType) {
    ClientResourceType["HTML"] = "html";
    ClientResourceType["CSS"] = "css";
    ClientResourceType["JS"] = "js";
})(ClientResourceType || (ClientResourceType = {}));
exports.ClientResourceType = ClientResourceType;
;
class Client {
    constructor(clientPath) {
        this.clientPath = clientPath;
    }
    resolveResource(type, name) {
        let filename = path_1.resolve(`${this.clientPath}/res/${type}/${name}.${type}`);
        if (!fs_1.existsSync(filename)) {
            filename = null;
        }
        return filename;
    }
    resolveSource(moduleName) {
        let filename = path_1.resolve(`${this.clientPath}/dist/${moduleName}.js`);
        if (!fs_1.existsSync(filename)) {
            filename = null;
        }
        return filename;
    }
}
exports.Client = Client;
exports.default = Client;
//# sourceMappingURL=client.js.map