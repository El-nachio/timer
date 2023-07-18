/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                <div>
                    <label id='break-label'>break-time</label>
                    <button id='break-increment'></button>
                    <div value='5'>value of the break-time(change it)</div>
                    <button id='break-decrement'></button>
                </div>
                <div>
                    <div id='Timer-label'>WORK(Timer-label)</div>
                    <div id='time-left'>this display the time</div>
                </div>
                <div className='running-buttons'>
                    <a id='start-stop'>play</a>
                    <a id='reset'>reset</a>
                </div>
                <div>
                    <label id='session-label'>session-time</label>
                    <button id='session-increment'></button>
                    <div value='25'>value of the session-time(change it)</div>
                    <button id='session-decrement'></button>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Timer />, document.getElementById('root'));
