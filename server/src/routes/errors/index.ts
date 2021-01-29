import { Response, Request, NextFunction } from 'express';

function errorHandler (err : string, req : Request, res: Response, next: NextFunction) {
    res.status(404);

    // // respond with html page
    // if (req.accepts('html')) {
    //     // res.render('404', { url: req.url });
    //     return;
    // }

    // // respond with json
    // if (req.accepts('json')) {
    //     res.send({ error: 'Not found' });
    //     return;
    // }

    // default to plain-text. send()
    res.type('txt').send('Not found');
};

export default errorHandler;