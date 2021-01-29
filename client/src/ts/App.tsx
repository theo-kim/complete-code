import * as React from 'react';
import Console from './Components/Console';

// import AppBar from './components/AppBar';
// import WorkSpace from './components/WorkSpace';

export default class App extends React.Component {
    render() {
        return (<div id="app"><Console onCommand={() => { return []; }} /></div>);
    };
};