"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("../../client");
const client_2 = __importDefault(require("../../config/client"));
const router = express_1.Router();
router.get("/", (req, res) => {
    res.sendFile(client_2.default.resolveResource(client_1.ClientResourceType.HTML, "index"));
});
// stylesheets
router.get("/:stylesheet.css", (req, res, next) => {
    const path = client_2.default.resolveResource(client_1.ClientResourceType.CSS, req.params.stylesheet);
    if (path == null) {
        next("404");
    }
    else {
        res.sendFile(path);
    }
});
// javascript
router.get("/driver.js", (req, res, next) => {
    const path = client_2.default.resolveSource("source");
    res.sendFile(path);
});
exports.default = router;
//# sourceMappingURL=index.js.map