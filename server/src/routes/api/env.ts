import { NextFunction, Request, Response } from 'express';
import { parse } from 'path';
import { getUser } from './session'

let getEnv = function(uid : string) : Promise<Environment> {
    // check if environment exists in memory
    // otherwise create it
    return new Promise((resolve, reject) => {
        getUser(uid).then((envstr : string) => {
            resolve(parseEnv(envstr));
        }).catch((err) => {
            reject(err);
        })
    });
}

let parseEnv = function(envstr : string) : Environment {
    let entries = envstr.split(";");
    let env : Environment = {
        PWD: "",
        USERNAME: "",
        UID: ""
    };
    for (let i = 0; i < entries.length; ++i) {
        let e = entries[i].split("=");
        env[e[0]] = e[1];
    }
    return env;
}

let envMiddleware = function(req : Request, res : Response, next : NextFunction) {
    getEnv(req.identity.id).then((env : Environment) => {
        req.env = env;
        next();
    });
}

export default envMiddleware;