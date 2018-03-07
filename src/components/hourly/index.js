// FORMATTING

// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone, button

import style from '../iphone/style.less';
import style_hourly from './style.less';
import style_topnav from '../topnav/style';

// import required components
import Search from '../topnav/search_index';
import Relocate from '../topnav/relocate_index';
import Hour from './hour_index';

// import helper functions for API calls
import {FetchCurrentWeather, FetchWeatherForecast} from '../../helpers.js'

export default class Hourly extends Component {

  // a constructor with initial set states
  constructor(props){
    super(props);
    this.state.count = 0;
  }

  componentWillMount() {
    this.setState({
      lon: this.props.lon,
      lat: this.props.lat
    })
    this.fetchDate();
    this.fetchHourlyData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lon != this.props.lon) {
      this.setState({
          lon: nextProps.lon,
          lat: nextProps.lat
        })
      this.fetchHourlyData();
    }
  }

  fetchDate = () => {
    var now = new Date();
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var day = days[ now.getDay() ];
    var month = months[ now.getMonth() ];
    var dayno = now.getDate();
    var hour = now.getHours();
    var minutes = now.getMinutes();

    this.state.hr = hour;
    this.state.today = [day, month, dayno];
  }

  fetchHourlyData = () => {
    var parsed_json = FetchCurrentWeather(this.state.lat, this.state.lon);
    console.log("Call Made - Current Weather")
    this.storeJSON(parsed_json);
    this.state.count = 1;

    parsed_json = FetchWeatherForecast(this.state.lat, this.state.lon);
    console.log("Call Made - Forecast")
    this.storeJSON(parsed_json);
    this.state.count =0;
  }

  storeJSON = (json) => {
    if(this.state.count == 0) {
      this.setState({
        currentJSON: json,
        locate: json['name'],
      })
    } else {
      this.setState({
        forecastJSON: json,
      })
    }
  }

  // the main render method for the routes component
	render() {

		return (
    		<div class={ style.container }>

          <div class={ style.homepage }>
            <div class= { style_hourly.wrapper }>
              <div> <p class = { style_hourly.location }> {this.state.locate} </p> {this.state.today[0]}, {this.state.today[1]} {this.state.today[2]}</div>
              <Hour hr={this.state.hr} num={0} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={1} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={2} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={3} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={4} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={5} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={6} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={7} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={8} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={9} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={10} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={11} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={12} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={13} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={14} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={15} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={16} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={17} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={18} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={19} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={20} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={21} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={22} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <Hour hr={this.state.hr} num={23} current={this.state.currentJSON} hourly={this.state.forecastJSON}/>
              <div/>
            </div>
          </div>
        </div>
		);
	}
}