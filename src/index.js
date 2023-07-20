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
            <div className='timer-panel'>
                <div>
                    <div>
                        <div id='Timer-label'>WORK(Timer-label)</div>
                        <div id='time-left'>this display the time</div>
                    </div>
                    <div className='running-buttons'>
                        <a id='start-stop'>play</a>
                        <a id='reset'>reset</a>
                    </div>
                    <div className='button-seccion'>
                        <div className='click-label'>
                            <label id='break-label'>rest-time</label>
                            <div id='break-length' value='5'>value of the break-time(change it)</div>
                            <button id='break-increment'></button>
                            <button id='break-decrement'></button>
                        </div>
                        <div className='click-label'>
                            <label id='session-label'>work-time</label>
                            <div id='session-length' value='25'>value of the session-time(change it)</div>
                            <button id='session-increment'></button>
                            <button id='session-decrement'></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Timer />, document.getElementById('root'));
