import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const guest : Identity = {
    id : "0",
    username: "guest",
    home: "/"
};

let auth = function (req : Request, res : Response, next : NextFunction) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        let token = bearerHeader.split(' ')[1];
        verify(bearerHeader, process.env.SERVER_SECRET, (err, decoded) => {
            if (err) {
                req.identity = guest;
            }
            else {
                req.identity = decoded as Identity;
            }
        });
    }
    else {
        req.identity = guest;
    } 
    next();
}

export default auth;