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
            isActive: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.startBreak = this.startBreak.bind(this);
        this.reset = this.reset.bind(this);
        this.play = this.play.bind(this);
        this.timeOutId = null
    }

    handleClick(e) {
        if (e.target.id === 'break-increment' && this.state.breakLabel < '60:00') {
            const [minutes, seconds] = this.state.breakLabel.split(':').map(Number); // divide el numero en minutos y segundos
            const newMinutes = minutes + 1; // suma un minuto
            const formattedBreak = `${newMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`; // agrega un 0 si queda un solo digito 
            this.setState({
              breakLabel: formattedBreak,
            });
            console.log(newMinutes)
            console.log(formattedBreak)
        } else if (e.target.id === 'break-decrement' && this.state.breakLabel > '01:00') {
            const [minutes, seconds] = this.state.breakLabel.split(':').map(Number);
            const newMinutes = minutes - 1;
            const formattedBreak = `${newMinutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
          this.setState({
            breakLabel:formattedBreak,
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
      if(this.state.isActive) {
        const [minutes, seconds] = this.state.sessionLabel.split(':').map(Number);
        if(minutes <= 1 && seconds <= 59) { //esto va a crear un tag de audio y cosas
          let parentAudio = document.getElementById('time-left')
          let urlValue = document.createElement('audio');
          parentAudio.appendChild(urlValue)
          urlValue.setAttribute('autoplay', '');
          urlValue.setAttribute('id', 'lel');
          let source = document.createElement('source');
          urlValue.appendChild(source);
          source.setAttribute('src', 'https://cdn.freesound.org/previews/459/459771_6142149-lq.mp3')
          let currentDiv = document.getElementById('lel');
          let parentDiv = currentDiv.parentNode;
          parentDiv.insertBefore(urlValue, currentDiv);
        }
        if (minutes === 0 && seconds === 0) {
          this.startBreak()
            return
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
        this.timeOutId = setTimeout(() => {
          this.setState({
            sessionLabel: formattedTime,
          });
          document.getElementById('time-left').innerHTML = formattedTime;
          this.startTimer(); // call the startTimer function every second
        }, 1);
      }
    }
    startBreak() {
      if(this.state.sessionLabel === '00:00' && this.state.isActive) {
        const [minutes, seconds] = this.state.breakLabel.split(':').map(Number);
        if(minutes <= 1 && seconds <= 59) {
          //this will create an audio tag with and id of beep and continously a source tag with the sound
          let parentAudio = document.getElementById('time-left')
          let urlValue = document.createElement('audio');
          parentAudio.appendChild(urlValue)
          urlValue.setAttribute('id', 'beep');
          let source = document.createElement('source');
          urlValue.appendChild(source);
          source.setAttribute('src', 'https://cdn.freesound.org/previews/403/403009_5121236-lq.mp3')
          let currentDiv = document.getElementById('lel');
          let parentDiv = currentDiv.parentNode;
          parentDiv.insertBefore(urlValue, currentDiv);
        }
        if (minutes === 0 && seconds === 0) {
            this.setState({
              sessionLabel: '25:00',
              breakLabel: '5:00'
            })
            this.startTimer()
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
        setTimeout(() => {
          this.setState({
            breakLabel: formattedTime,
          });
          document.getElementById('time-left').innerHTML = formattedTime;
          document.getElementById('timer-label').innerHTML = 'REST TIME';
          this.startTimer();
        }, 1);
      }
    }
    reset() {
      console.log(this.state.sessionLabel)
      this.setState({
          sessionLabel: '25:00',
          breakLabel: '5:00',
          isActive: false,
      })
      console.log(this.state.sessionLabel)
      document.getElementById('time-left').innerHTML = '25:00';
    }
    play() {
      this.setState(prevState => ({
        isActive: !prevState.isActive,
      }), 
      () => {
        if (!this.state.isActive) {
          clearTimeout(this.timeoutID);
        
        } else {
          this.startTimer();
        }
      });
    }
    render() {
        return (
            <div className='timer-panel'>
                <div className='timer'>
                    <div id='timer-label'>TIME TO WORK !</div>
                    <div id='time-left'>25:00</div>
                </div>
                <div className='running-buttons'>
                    <a id='start_stop'href='#' onClick={this.play} value ='true'><i className="bi bi-play-fill"></i></a>
                    <a id='reset'href='#' onClick={this.reset}><i className="bi bi-stop-fill"></i></a>
                </div>
                <div>
                    <div className='button-seccion'>
                        <div className='click-label'>
                            <div>
                                <label id='break-label'>rest-time</label>
                                <label id='break-length' value='5' onClick={this.handleClick}>{this.state.breakLabel.split(':')[0]}</label>
                            </div>
                            <button id='break-increment' value='' onClick={this.handleClick}><i className="bi bi-arrow-up-square-fill"></i></button>
                            <button id='break-decrement' value='' onClick={this.handleClick}><i className="bi bi-arrow-down-square-fill"></i></button>
                        </div>
                        <div className='click-label'>
                            <div>
                                <label id='session-label'>work-time</label>
                                <label id='session-length' value='25'>{this.state.sessionLabel.split(':')[0]}</label>
                            </div>
                            <button id='session-increment' value='' onClick={this.handleClick}><i className="bi bi-arrow-up-square-fill"></i></button>
                            <button id='session-decrement' value='' onClick={this.handleClick}><i className="bi bi-arrow-down-square-fill"></i></button>
                        </div>
                        <p>Created and designed by <a href='https://github.com/El-nachio'>Ignacio Taborda</a> web developer all rights reserved</p>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<Timer />, document.getElementById('root'));

//bueno terminado el projecto tengo unos objetivos que no logre cumplir pero eso por voluntad propia dejo explicado alguno de ellos
//en la parte del timer casi todos los objetivos no fueron cumplidos debido a que maneje los numeros del temporizador de la manera 01,02,03, etc.
//por voluntad propia preferi dejarlos de esta manera
//otro problema que tuve es que el temporizador se detenia un segundo despues de pararlo y se iniciaba un segundo despues de haberlo reaunudado 
//luego los objetivos de audio si se cumplen solamente que se crean una ves que el temporizador esta por terminar
//no estan incluidos en el codigo base