var React = require('react');
var Clock = require('Clock');
var Controls = require('Controls');


var Timer = React.createClass({
  getInitialState: function () {
    return {
      count: 0,
      timerStatus: 'stopped'
    };
  },
  componentWillUnmount: function(){
    clearInterval(this.timer);
  },
  startTimer: function () {
    // this.timer = setInterval(() => {
    //   var newCount = this.state.count + 1;
    //   this.setState({
    //     count: newCount
    //   });
    // }, 1000);
  },
  componentDidUpdate: function(prevProps, prevState){

    if(this.state.timerStatus !== prevState.timerStatus){
        switch(this.state.timerStatus){
          case 'started':
            this.handleStart();
            break;
          case 'stopped':
            this.setState({count: 0});
          case 'paused':
            clearInterval(this.timer);
            this.timer = undefined;
            break;

        }
    }
  },
  handleStart: function(){
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  },
  handleStatusChange: function (newTimerStatus) {
    this.setState({timerStatus: newTimerStatus});
  },
  render: function(){
    var {count, timerStatus} = this.state;
    var renderControlArea = () => {
      if (timerStatus !== 'paused') {
        return <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>;
      } else {
        return <CountdownForm onSetTimer={this.handleSetTimer}/>;
      }
    };

    return (
      <div>
        <h1 className="page-title">Timer App</h1>
        <Clock totalSeconds={count}/>
        <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    );

  }
});

module.exports = Timer;
