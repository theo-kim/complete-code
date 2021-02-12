import * as React from 'react';
import update from 'immutability-helper';
import Editable from 'react-contenteditable';

interface IProps {

}

interface IState {
    editorValue: string;
    editorHTML: string;
}

class Editor extends React.Component<IProps, IState> {
    constructor(props : IProps) {
        super(props);
        this.state = {editorValue: "", editorHTML: ""};
    }

    handleTextInput = (evt : React.KeyboardEvent) => {
        console.log((evt.target as any).value);
        this.setState(() => {
            return {
                editorValue: (evt.target as any).value,
                editorHTML: (evt.target as any).value
            }
        });
    }

    render () {
        return (
            <div id = "editor">
                <div className="editor-header">
                    <div id="app-name">Complete Code Editor</div>
                    <div id="file-name"></div>
                </div>
                <Editable className="editor-body" html={this.state.editorHTML} onChange={this.handleTextInput} />
            </div>
        );
    }
}

export default Editor;