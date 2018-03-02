// FORMATTING

// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone, button

import style from '../iphone/style.less';
import style_hourly from './style.less';
import style_topnav from '../topnav/style';

// import jquery for API calls
import $ from 'jquery';
import Search from '../topnav/search_index';
import Relocate from '../topnav/relocate_index';
import Hour from './hour_index';

export default class Hourly extends Component {

  // a constructor with initial set states
  constructor(props){
    super(props);
    this.state.count = 0;
  }

  componentWillMount() {
    this.props.showTopNav();
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
    
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&appid=ddc4c459b28204945d52884ab709111a";
    $.ajax({
      url: url,
      dataType: "json",
      async: false,
      success : this.storeJSON,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
    console.log("Call Made")
    this.state.count =1;  

    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.state.lat + "&lon=" + this.state.lon + "&appid=ddc4c459b28204945d52884ab709111a";
    $.ajax({
      url: url,
      dataType: "json",
      async: false,
      success : this.storeJSON,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
    console.log("Call Made")
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
              <div> {this.state.locate} <br /> {this.state.today[0]}, {this.state.today[1]} {this.state.today[2]}</div>
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