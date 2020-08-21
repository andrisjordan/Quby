import React, { Component } from 'react';
import logic from './logic'
import './App.css';
import { format } from 'prettier';

let interval;
let count;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temparature: 0,
      setpoint: 0,
      last_update: new Date(),
    };
    logic.app_screen = this
  }

  refreshTemps = (temperature, setpoint, update) => {
    if (count) {
      setpoint = this.state.setpoint
    }
    this.setState({
      temparature: temperature,
      setpoint: setpoint,
      last_update: new Date(update)
    })
    this.forceUpdate();
  };

  onChange = (value) => {
    clearInterval(interval);
    count = 5;
    let newvalue = value == "minus" ? this.state.setpoint - 0.5 : this.state.setpoint + 0.5
    this.setState({
      setpoint: newvalue
    })
    this.forceUpdate();
    interval = setInterval(() => {
      count--;
      if (count == 0) {
        clearInterval(interval);
        logic.setTemperature(newvalue)
      }
    }, 1000);
  }

  tempElement = (value) => {
    const temperature = value == "current" ? this.state.temparature : this.state.setpoint
    return <div className="temp_circle">
      <h1>
        {temperature + "°C"}
      </h1>
      <h5>
        {value + " temp"}
      </h5>
    </div>
  }

  getDate = () => {
    let date = new Date(this.state.last_update)
    let hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours()
    let minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
    let seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
    return hours + ":" + minutes + ":" + seconds
  }


  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h5>
            {"last update:"}
          </h5>
          <h1 style={{margin: 0}}>
            {this.getDate()}
          </h1>
          {
            <div style={{ flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center", width: "80%" }}>
              {this.tempElement("current")}
              <h1>
                {"->"}
              </h1>
              {this.tempElement("set")}
            </div>
          }
          <div style={{ width: "80%" }}>
            <button className="change_temp cold" onClick={() => this.onChange("minus")}>-</button>
            <button className="change_temp hot" onClick={() => this.onChange("plus")}>+</button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
