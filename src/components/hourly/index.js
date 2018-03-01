// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone, button

import style from '../iphone/style.less';
import style_hourly from './style.less';
import style_topnav from '../topnav/style';

// import jquery for API calls
import $ from 'jquery';
import Search from '../topnav/search_index';
import Relocate from '../topnav/relocate_index'

export default class Hourly extends Component {

  // a constructor with initial set states
  constructor(props){
    super(props);
    this.state.temp = "";
    this.state.lon = "-0.03749985";
    this.state.lat = "51.520497918";
    this.updateInputValue = this.updateInputValue.bind(this);
  }

  fetchDate = () => {

  }

  fetchHourlyData = () => {
    
    var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.state.lat + "&lon=" + this.state.lon + "&appid=fb1dc4da37f9e2330043b353f437dea9";
    $.ajax({
      url: url,
      dataType: "json",
      async: false,
      success : function(data) {this.state.json = JSON.parse(data)},
      error : function(req, err){ console.log('API call failed ' + err); }
    })

    console.log(this.state.json);
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
  }

  // the main render method for the routes component
	render() {

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
        </div>
		);
	}
}