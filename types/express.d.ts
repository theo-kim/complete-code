declare namespace Express {
    export interface Request {
       identity?: Identity
       env?: Environment
    }
}

type OSTREAM = (arg0 : string) => void;
type ISTREAM = () => string;
type ConsoleCommand = (env: Environment, ostream : OSTREAM, istream : ISTREAM) => void;
type ConsoleParameter = {
    [flag : string] : Identity;
}

type Identity = {
    id: string,
    username: string,
    home: string
}

type Environment = {
    PWD: string,
    USERNAME: string,
    UID: string,
    [key : string]: string
}
