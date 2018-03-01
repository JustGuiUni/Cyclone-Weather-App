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
    this.state.lon = "-0.03749985";
    this.state.lat = "51.520497918";
    this.updateInputValue = this.updateInputValue.bind(this);
    this.state.count = 0;
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
    
    var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&appid=fb1dc4da37f9e2330043b353f437dea9";
    $.ajax({
      url: url,
      dataType: "json",
      async: false,
      success : this.storeJSON,
      error : function(req, err){ console.log('API call failed ' + err); }
    })
    
    this.state.count =1;  

    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.state.lat + "&lon=" + this.state.lon + "&appid=fb1dc4da37f9e2330043b353f437dea9";
    $.ajax({
      url: url,
      dataType: "json",
      async: false,
      success : this.storeJSON,
      error : function(req, err){ console.log('API call failed ' + err); }
    })

    this.state.count =0;
  }

  storeJSON = (json) => {
    if(this.state.count == 0) {
      this.setState({
        currentJSON: json,
        locate: json['name'],
        fetched: true
      })
    } else {
      this.setState({
        forecastJSON: json,
        fetched: true
      })
    }
    console.log(this.state.currentJSON)
    console.log(this.state.forecastJSON)
  }

  // makes a call to postcodes.io based on the postcode value inputed by the user
  // parses this postcode into lat and lon values 
  postcodeSearch(){
    var postcodeRE = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
    var postcode = postcodeRE.exec(this.state.postcodeVal);
    postcode = postcode[0];

    console.log(postcode);

    var url = "https://api.postcodes.io/postcodes/" + postcode;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    console.log(xhr.responseText);

    var JSONresponse = JSON.parse(xhr.responseText);

    this.state.lon = JSONresponse['result']['longitude'];
    this.state.lat = JSONresponse['result']['latitude'];

    console.log(this.state.lat);

    this.fetchHourlyData();
    console.log("postcode")
  }

  // makes a call to nominatim.openstreetmap.org based on the location entered by the user
  // calls postcodeSearch() if the user has entered a postcode
  // if not a postcode, parses this location into lat and lon values
  placeSearch = () =>{
    var place = this.state.postcodeVal;
   
    console.log(place);
   
    var url = "https://nominatim.openstreetmap.org/search?q=" + place + "&format=jsonv2";
   
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.send();
    console.log(xhr.responseText);
   
    var JSONresponse = JSON.parse(xhr.responseText);

    if (JSONresponse[0] == undefined) {
      this.postcodeSearch();
      return;
    }
   
    for (var i = 0; i <= JSONresponse.length; i++) {
      console.log(JSONresponse[i]['display_name']);
      var checkString = JSONresponse[i]['display_name'];
      if (checkString.includes("United Kingdom")) {
        this.state.lon = JSONresponse[0]['lon'];
        this.state.lat = JSONresponse[0]['lat'];
        break;
      } 
    };
   
    this.fetchHourlyData();
    console.log("place");
  }

  // reads data from the text input on any update and sets the class variable "postcodeVal" to that value. 
  updateInputValue(evt){
      this.state.postcodeVal = evt.target.value;
      console.log(this.state.postcodeVal);
  }

  // resets coordinates to default location when user presses the crosshair button
  resetCoordinates = () => {
    this.state.lon = "-0.03749985";
    this.state.lat = "51.520497918";
    this.fetchHourlyData();
    console.log("reset");
  }

  // the main render method for the routes component
	render() {

    if(!this.state.fetched) {
      this.fetchDate();
      this.fetchHourlyData();
    }

		return (
    		<div class={ style.container }>

          <div class={ style_topnav.container }>
            
            {/* Reset coordinates when user presses the crosshair button */}
            <Relocate clickFunction={ this.resetCoordinates }/>
            
            {/* Update text input and coordinates when user makes a search*/}
            <input class={ style_topnav.input }  type="location" placeholder="Search Location..." id="searchField"  onChange ={ this.updateInputValue }></input>
            <Search clickFunction ={ this.placeSearch }/> 
              
            {/* Settings button has no functionality currently */}
            <div class={ style_topnav.buttonright }><i class="fa fa-cog"></i></div> 
          </div>

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