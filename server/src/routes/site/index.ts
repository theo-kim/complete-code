import { NextFunction, Request, Response, Router } from 'express';

import { ClientResourceType } from '../../client';
import client from '../../config/client';

const router = Router();

router.get("/", (req : Request, res : Response) => {
    res.sendFile(client.resolveResource(ClientResourceType.HTML, "index"));
});

// stylesheets
router.get("/:stylesheet.css", (req : Request, res : Response, next : NextFunction) => {
    const path = client.resolveResource(ClientResourceType.CSS, req.params.stylesheet);
    if (path == null) {
        next("404");
    }
    else {
        res.sendFile(path);
    }
});

// javascript
router.get("/driver.js", (req : Request, res : Response, next : NextFunction) => {
    const path = client.resolveSource("source");
    res.sendFile(path);
});

export default router;