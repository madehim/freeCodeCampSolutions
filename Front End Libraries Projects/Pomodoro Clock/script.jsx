
class LengthPart extends React.Component {
  render() {
    let part = this.props.partName;
    return (
    <div id={part + "-part"}>
      <label id={part + "-label"}>{part.charAt(0).toUpperCase() + part.slice(1)} Length</label>
      <div id={part + "-length"}>
        <button id={part + "-decrement"} onClick={this.props.onClick} value="-"><i className="fa fa-arrow-down"></i></button>
        {this.props.typeLength}
        <button id={part + "-increment"} onClick={this.props.onClick} value="+"><i className="fa fa-arrow-up"></i></button>
      </div>
    </div>
    )
  }
};

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength : 5,
      sessionLength : 25,
      timerTimeNow: 1500,
      isRun : false,
      timerNow : "session",
      kindaTimer : ""
    }
    this.reset = this.reset.bind(this);
    this.changeBreakLength = this.changeBreakLength.bind(this);
    this.changeSessionLength = this.changeSessionLength.bind(this);
    this.checkingLength = this.checkingLength.bind(this);
    this.timerControl = this.timerControl.bind(this);
    this.timerStart = this.timerStart.bind(this);
    this.timerStop = this.timerStop.bind(this);
    this.huminaze = this.huminaze.bind(this);
    this.alarm = this.alarm.bind(this);
    this.decTime = this.decTime.bind(this);
    this.phaseChanging = this.phaseChanging.bind(this);
    this.changeTimer = this.changeTimer.bind(this);
  }
  
  changeBreakLength(e) {
    this.checkingLength("breakLength", e.currentTarget.value, "break", this.state.breakLength);
  }
  
  changeSessionLength(e) {
    this.checkingLength("sessionLength", e.currentTarget.value, "session", this.state.sessionLength);
  }
  
  checkingLength(changingState, sign, timerForChange, curLength){
    if (!this.state.isRun) {
      if (this.state.timerNow === timerForChange){
        if (sign == "-" && curLength != 1){
          this.setState({[changingState] : curLength - 1,
                        timerTimeNow: curLength * 60 - 60});
        } else if (sign == "+" && curLength != 60) {
          this.setState({[changingState] : curLength + 1,
                        timerTimeNow: curLength * 60 + 60});
        }
      } else {
        if (sign == "-" && curLength != 1){
          this.setState({[changingState] : curLength - 1});
        } else if (sign == "+" && curLength != 60) {
          this.setState({[changingState] : curLength + 1});
        }
      }
    }
  }
  
  reset() {
    this.setState({
      breakLength : 5,
      sessionLength : 25,
      timerTimeNow: 1500,
      isRun : false,
      timerNow : "session",
      kindaTimer : ""
    });
    this.timerStop();
  }
  
  timerControl() {
    if (!this.state.isRun) {
      this.timerStart();
      this.setState({isRun: true});
    } else {
      this.timerStop();
      this.setState({isRun: false});
    }
  }
  
  timerStart() {
    this.setState({
      kindaTimer: accurateInterval(() => {
        this.decTime();
        this.phaseChanging();
      }, 1000)
    })
  }
  
  decTime() {
    this.setState({timerTimeNow : this.state.timerTimeNow - 1});
  }
  
  phaseChanging() {
    let tmpTime = this.state.timerTimeNow;
    this.alarm(tmpTime);
    if (tmpTime < 0){
      if (this.state.timerNow === "session") {
        this.timerStop();
        this.changeTimer(this.state.breakLength * 60, "break");
        this.timerStart();
      } else {
        this.timerStop();
        this.changeTimer(this.state.sessionLength * 60, "session");
        this.timerStart();
      }
    }
  }
  
  timerStop() {
    this.state.kindaTimer && this.state.kindaTimer.cancel();
  }
  
  changeTimer(time, timerType) {
    this.setState({
      timerTimeNow: time,
      timerNow: timerType
    });
  }
  
  alarm(time) {
    if (time === 0){
      this.audioBeep.play();
    }
  }
  huminaze() {
    let min = Math.floor(this.state.timerTimeNow / 60) ;
    let sec = this.state.timerTimeNow % 60;
    sec = sec < 10 ? "0" + sec : sec;
    min = min < 10 ? "0" + min : min;
    return min + ":" + sec;
  }
  
  render() {
    return (
      <div id="clock">
      <h1>Pomodoro Clock</h1>
      <div id="length-part">
        <LengthPart partName="break" onClick={this.changeBreakLength} typeLength={this.state.breakLength}/>
        <LengthPart partName="session" onClick={this.changeSessionLength} typeLength={this.state.sessionLength}/>
      </div>
      <div id="timer-part">
        <label id="timer-label">Session</label>
        <div id="time-left">{this.huminaze()}</div>
      </div>
      <div id="timer-control">
        <button id="start_stop" onClick={this.timerControl}>
          <i class="fa fa-play"></i>
          <i class="fa fa-pause"></i>
        </button>
        <button id="reset" onClick={this.reset}><i class="fa fa-refresh"></i></button>
      </div>
      <audio id="beep" preload="auto" src="https://goo.gl/65cBl1" ref={(audio) => { this.audioBeep = audio; }} />
    </div>
    );
  }
}


ReactDOM.render(<Clock />, document.getElementById('app'));