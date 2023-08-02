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
            breakLabel: 5 + ':00',
            sessionLabel: 25 + ':00',
            isActive: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    handleClick(e) {
        if (e.target.id === 'break-increment' && this.state.breakLabel < '60:00') {
            const [minutes, seconds] = this.state.breakLabel.split(':').map(Number);
            const newMinutes = minutes + 1;
            const formattedBreak = `${newMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          this.setState({
            breakLabel: formattedBreak
          });
        } else if (e.target.id === 'break-decrement' && this.state.breakLabel > '01:00') {
            const [minutes, seconds] = this.state.breakLabel.split(':').map(Number);
            const newMinutes = minutes - 1;
            const formattedBreak = `${newMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          this.setState({
            breakLabel:formattedBreak
          });
        } else if (e.target.id === 'session-increment' && this.state.sessionLabel < '60:00') {
          const [minutes, seconds] = this.state.sessionLabel.split(':').map(Number);
          const newMinutes = minutes + 1;
          const formattedTime = `${newMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          this.setState({
            sessionLabel: formattedTime,
          });
        } else if (e.target.id === 'session-decrement' && this.state.sessionLabel > '01:00') {
          const [minutes, seconds] = this.state.sessionLabel.split(':').map(Number);
          const newMinutes = minutes - 1;
          const formattedTime = `${newMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          this.setState({
            sessionLabel: formattedTime,
          });
        }
      }
      

    startTimer() {
        const [minutes, seconds] = this.state.sessionLabel.split(':').map(Number);
        if (minutes === 0 && seconds === 0) {
            this.setState({
                sessionLabel: breakLabel,
                isActive: false,
            });
          }
        let newMinutes = minutes;
        let newSeconds = seconds;
        if (seconds === 0) {
          newMinutes -= 1;
          newSeconds = 59;
        } else {
          newSeconds -= 1;
        }
        const formattedTime = `${newMinutes.toString().padStart(2, '0')}:${newSeconds.toString().padStart(2, '0')}`;
        if (this.state.isActive) {
            setTimeout(() => {
              this.setState({
                sessionLabel: formattedTime,
              });
              document.getElementById('time-left').innerHTML = formattedTime;
          
              this.startTimer(); // Llamar a la función startTimer nuevamente después de 1 segundo
            }, 10);
        }
      }
    render() {
        return (
            <div className='timer-panel'>
                <div className='timer'>
                    <div id='Timer-label'>WORK(Timer-label)</div>
                    <div id='time-left'></div>
                </div>
                <div className='running-buttons'>
                    <a id='start-stop'href='#' onClick={this.startTimer}><i className="bi bi-play-fill"></i></a>
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
