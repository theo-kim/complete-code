import defaults from '../../config/defaults';

let welcome : ConsoleCommand = (env: Environment, ostream : OSTREAM, istream : ISTREAM) : void => {
    try {
        ostream(defaults.connected);
    }
    catch (err) {
        console.log(err);
    }
}

let help : ConsoleCommand = (env: Environment, ostream : OSTREAM, istream : ISTREAM) : void => {
    ostream(defaults.help);
}

let ls : ConsoleCommand = function() {

}

let cat : ConsoleCommand = function() {
    
}

let pwd : ConsoleCommand = (env: Environment, ostream : OSTREAM, istream : ISTREAM) : void => {
    ostream(env.PWD);    
}

let cd : ConsoleCommand = function() {
    
}

export { welcome, help, cat, pwd, cd, ls };