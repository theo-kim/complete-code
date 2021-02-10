import { resolve } from 'path';
import { existsSync } from 'fs';

enum ClientResourceType {
    HTML="html",
    CSS="css",
    PNG="png"
};

class Client {
    clientPath : string; // path to client res directory

    constructor(clientPath : string) {
        this.clientPath = clientPath;
    }

    resolveResource(type : ClientResourceType, name : String) : string {
        let filename : string = resolve(`${this.clientPath}/res/${type}/${name}.${type}`); 
        if (!existsSync(filename)) {
            filename = null;
        }
        return filename;
    }

    resolveSource(moduleName : string) : string {
        let filename : string = resolve(`${this.clientPath}/dist/${moduleName}.js`); 
        if (!existsSync(filename)) {
            filename = null;
        }
        return filename;
    }
} 

export default Client;
export { ClientResourceType, Client };