import { response } from 'express';
import * as React from 'react';
import { threadId } from 'worker_threads';
// import io from 'socket.io-client';
import Console from './Components/Console';

// import AppBar from './components/AppBar';
// import WorkSpace from './components/WorkSpace';

export default class App extends React.Component {
    render() {
        return (
        <div id="app">
            <Console onCommand={this.handleConsoleInput} onReady={this.printWelcomeMessage} />
        </div>);
    };

    handleServerResponse = (res : Response) : Promise<string> => {
        if (res.status == 200) {
            return res.text();
        }
        return this.handleServerError(res);
    }

    handleServerError = (res : Response) : Promise<string> => {
        return res.text();
    }

    printWelcomeMessage = (println : (msg: string) => void) : string[] => {
        let h = this.handleServerResponse;
        fetch("/console/welcome").then((res) => h(res)).then(println);
        return [];
    }

    handleConsoleInput = (command : string, println : (msg: string) => void) : string[] => {
        let h = this.handleServerResponse;
        fetch("/console/" + command).then((res) => h(res)).then(println);
        return [];
    }
}