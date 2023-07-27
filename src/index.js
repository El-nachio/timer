/* eslint-disable */
//para hacer funcionar boostrap sin la nesecidad de hacerlo via cdn
import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            breakLabel: 5,
            sessionLabel: 25,
        }
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        if (e.target.id == 'break-increment' && this.state.breakLabel < 60) {
            this.setState ({
                breakLabel: this.state.breakLabel + 1
            })
        }
        else if (e.target.id == 'break-decrement' && this.state.breakLabel > 0) {
            this.setState ({
                breakLabel: this.state.breakLabel - 1
            })
        }
        else if (e.target.id == 'session-increment' && this.state.sessionLabel < 60) {
            this.setState ({
                sessionLabel: this.state.sessionLabel + 1
            })
        }
        else if (e.target.id == 'session-decrement' && this.state.sessionLabel > 0) {
            this.setState ({
                sessionLabel: this.state.sessionLabel - 1
            })
        }
            console.log('funciona!!!~', this.state.breakLabel)
    }
    render() {
        return (
            <div className='timer-panel'>
                <div className='timer'>
                    <div id='Timer-label'>WORK(Timer-label)</div>
                    <div id='time-left'>this display the time</div>
                </div>
                <div className='running-buttons'>
                    <a id='start-stop'href='#'><i className="bi bi-play-fill"></i></a>
                    <a id='reset'href='#'><i className="bi bi-stop-fill"></i></a>
                </div>
                <div>
                    <div className='button-seccion'>
                        <div className='click-label'>
                            <div>
                                <label id='break-label'>rest-time</label>
                                <label id='break-length' value='5' onClick={this.handleClick}>{this.state.breakLabel}</label>
                            </div>
                            <button id='break-increment' value='' onClick={this.handleClick}><i className="bi bi-arrow-up-square-fill"></i></button>
                            <button id='break-decrement' value='' onClick={this.handleClick}><i className="bi bi-arrow-down-square-fill"></i></button>
                        </div>
                        <div className='click-label'>
                            <div>
                                <label id='session-label'>work-time</label>
                                <label id='session-length' value='25'>{this.state.sessionLabel}</label>
                            </div>
                            <button id='session-increment' value='' onClick={this.handleClick}><i className="bi bi-arrow-up-square-fill"></i></button>
                            <button id='session-decrement' value='' onClick={this.handleClick}><i className="bi bi-arrow-down-square-fill"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Timer />, document.getElementById('root'));
