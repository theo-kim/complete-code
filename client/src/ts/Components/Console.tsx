import * as React from 'react';
import update from 'immutability-helper';

interface IProps {
    onCommand: (command : string, furtherInfoHook : (msg: string) => void) => string[];
    onReady: (furtherInfoHook : (msg: string) => void) => string[];
}

interface IState {
    lines: string[];
    commandHistory: string[];
}

class ConsoleEvents {
    listener : () => void = undefined;
    addListener(callback : () => void) {
        this.listener = callback;
    }

}

class Console extends React.Component<IProps, IState> {
    userInput : HTMLDivElement;
    inputBuffer : string[];
    waitingForStateUpdate : boolean;
    commandHistoryIndex : number;
    hasDraft : boolean;
    
    constructor (props : IProps) {
        super(props);
        this.state = { lines : [], commandHistory : [] }
        this.inputBuffer = [];
        this.waitingForStateUpdate = false;
        this.commandHistoryIndex = 0;
        this.hasDraft = false;
    }

    scrollToBottom = () => {
        this.userInput.scrollIntoView();    
    }

    componentDidMount() {
        this.props.onReady(this.hook);
    }

    componentDidUpdate() {
        this.scrollToBottom();
        if (this.inputBuffer.length > 0) {
            this.setState(() => {
                let msgs : string[] = this.inputBuffer;
                this.inputBuffer = [];
                return {
                    lines: update(this.state.lines, { $push: msgs })
                }
            });    
        }
        else {
            this.waitingForStateUpdate = false;
        }
    }

    prettyPrint(line : string, key : number) : JSX.Element {
        let isWarning = line.substr(0, "[WARNING]".length) === "[WARNING]";
        let isError = line.substr(0, "[ERROR]".length) === "[ERROR]";
        // line = line.replace("\n", "<br>");
        return (<div className={"console-line" + (isError ? " error" : "") + (isWarning ? " warning" : "")} key={key}>
            { line }
        </div>);
    }

    hook = (msg: string) => {
        if (this.waitingForStateUpdate) this.inputBuffer.push(msg);
        else {
            this.waitingForStateUpdate = true;
            this.setState(() : IState => {
                return {
                    lines: update(this.state.lines, { $push: [ msg ] }),
                    commandHistory : this.state.commandHistory
                }
            }); 
        }
    }

    consoleCommands = (command : string) : boolean => {
        if (command == "clear") {
            this.setState(() : IState => {
                return {
                    lines: [],
                    commandHistory: this.state.commandHistory
                }
            });
            return true;
        }
        return false;
    }

    execute = (command : string) => {
        this.waitingForStateUpdate = true;
        let line : string =  "$ " + command;
        if (this.consoleCommands(command))
            return;
        this.setState(() : IState => {
            let response : string[] = this.props.onCommand(command, this.hook);
            response.unshift(line);
            this.commandHistoryIndex = this.state.commandHistory.length + 1; // reset command history index
            if (this.hasDraft == true) {
                this.hasDraft = false;
                var updateQuery : any = {}
                updateQuery[this.state.commandHistory.length - 1] = { $set : command }
                return {
                    lines: update(this.state.lines, { $push: response }),
                    commandHistory: update(this.state.commandHistory, updateQuery)
                }
            }
            else {
                return {
                    lines: update(this.state.lines, { $push: response }),
                    commandHistory: update(this.state.commandHistory, { $push: [ command ] })
                }
            }
        });
    }

    exploreCommandHistory = (target : HTMLInputElement, direction : number) => {
        if (this.state.commandHistory.length == 0)
            return;
        else if (direction > 0 && this.commandHistoryIndex == this.state.commandHistory.length)
            return;
        
        if (this.commandHistoryIndex + 1 > this.state.commandHistory.length && direction < 0) {
            var draft : string = target.value;
            target.value = this.state.commandHistory[this.state.commandHistory.length - 1];
            this.commandHistoryIndex = this.state.commandHistory.length - 1;
            
            this.setState(() : IState => {
                this.hasDraft = true;
                return {
                    lines: this.state.lines, // unchanged
                    commandHistory: update(this.state.commandHistory, { $push: [ draft ] }) 
                    // add incomplete line to commandHistory
                };
            });
            return;
        }
        // console.log(this.commandHistoryIndex);
        this.commandHistoryIndex += direction;
        if (this.commandHistoryIndex < 0) {
            this.commandHistoryIndex = 0;
        }
        else if (direction > 0 && this.commandHistoryIndex >= this.state.commandHistory.length) {
            this.commandHistoryIndex = this.state.commandHistory.length - 1;
        }
        target.value = this.state.commandHistory[this.commandHistoryIndex];
    }

    handleSpecialKeys = (e : React.KeyboardEvent) => {
        var inputLine : HTMLInputElement = e.target as HTMLInputElement;
        if (e.key === 'Enter') {
            let command : string = inputLine.value;
            inputLine.value = "";
            this.execute(command);
        }
        else if (e.key === "ArrowDown") {
            this.exploreCommandHistory(inputLine, 1);
        }
        else if (e.key === "ArrowUp") {
            this.exploreCommandHistory(inputLine, -1);
        }
    }
    
    render () {
        return (
            <div id="console" >
                <div className="console-header">Complete Code Console</div>
                <div className="console-body">
                    {
                        this.state.lines.map((line : string, index: number) => {
                            return ( 
                                this.prettyPrint(line, index)
                            );
                        })
                    }
                    {
                        <div className="console-line" ref={(el) => { this.userInput = el; }}>
                            $&nbsp;
                            <input onKeyDown={this.handleSpecialKeys} autoFocus/>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Console;