import { NextFunction, Request, Response, Router } from 'express';
import { report } from 'process';

import { ClientResourceType } from '../../client';
import client from '../../config/client';
import defaults from '../../config/defaults';
import { cat, cd, help, ls, pwd, welcome } from './commands';
import auth from './auth';
import env from './env';

const router = Router();

interface Man {
    [name : string] : ConsoleCommand;
}

const legalcommands : Man = { 
    'welcome': welcome, 
    'help': help, 
    'ls' : ls, 
    'cd': cd, 
    'cat' : cat, 
    'pwd' : pwd, 
    'login' : () => {}, 
    'register' : () => {}
};

router.get("/:command", auth, env, (req : Request, res : Response) => {
    const ostream = (msg: string) => res.type('txt').send(msg);
    if (req.params.command in legalcommands) {
        legalcommands[req.params.command](req.env, ostream, null);
    }
    else {
        res.status(400).type('txt').send(req.params.command + ": " + defaults.unknown);
    }
});

export default router;