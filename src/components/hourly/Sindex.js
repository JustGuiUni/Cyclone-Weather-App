// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone, button

import style from '../iphone/style.less';
import style_hourly from './style.less';
import style_topnav from '../topnav/style';

// import jquery for API calls
import $ from 'jquery';
import Search from '../topnav/search_index';
import Index from '../iphone/index';

var toDay, clock, hours;


export default class Hourly extends Component {



  // a constructor with initial set states
  constructor(props){
    super(props);
    this.state.locate = "";
    this.state.temp = "";
    this.state.desc = "";
    this.state.fall = "";
  }

  dateFetch = () =>{

    var now = new Date();


    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var day = days[ now.getDay() ];
    var month = months[ now.getMonth() ];
    var dayno = now.getDate();
    var hour = now.getHours();
    var minutes = now.getMinutes();

    clock = [hour, minutes];
    toDay = [day, month, dayno, clock];
    return toDay, clock;
  }

nextEightHours = (clock) => {
  var hour1 = clock[0] +1;
  if (hour1 === 24){
    hour1 = 0;
  }

  var hour2 = clock[0] + 2;
  if (hour2 === 24){
    hour2 = 0;
  }else if (hour2 === 25){
    hour2 = 1;
  }

  var hour3 = clock[0] + 3;
  if (hour3 === 24){
    hour3 = 0;
  }else if (hour3 === 25){
    hour3 = 1;
  }else if (hour3 === 26){
    hour3 = 2;
  }

  var hour4 = clock[0] + 4;
  if (hour4 > 24){
    hour4 = 0;
  }else if (hour4 === 25){
    hour4 = 1;
  }else if (hour4 === 26){
    hour4 = 2;
  }else if (hour4 === 27){
    hour4 = 3;
  }

  var hour5 = clock[0] + 5;
  if (hour5 === 24){
    hour5 = 0;
  }else if (hour5 === 25){
    hour5 = 1;
  }else if (hour5 === 26){
    hour5 = 2;
  }else if (hour5 === 27){
    hour5 = 3;
  }else if (hour5 === 28){
    hour5 = 4;
  }else if (hour5 === 29){
    hour5 = 4;
  }

  var hour6 = clock[0] + 6;
  if (hour6 === 24){
    hour6 = 0;
  }else if (hour6 === 25){
    hour6 = 1;
  }else if (hour6 === 26){
    hour6 = 2;
  }else if (hour6 === 27){
    hour6 = 3;
  }else if (hour6 === 28){
    hour6 = 4;
  }else if (hour6 === 29){
    hour6 = 5;
  }else if (hour6 === 30){
    hour6 = 6;
  }

  var hour7 = clock[0] + 7;
  if (hour7 === 24){
    hour7 = 0;
  }else if (hour7 === 25){
    hour7 = 1;
  }else if (hour7 === 26){
    hour7 = 2;
  }else if (hour7 === 27){
    hour7 = 3;
  }else if (hour7 === 28){
    hour7 = 4;
  }else if (hour7 === 29){
    hour7 = 5;
  }else if (hour7 === 30){
    hour7 = 6;
  }else if (hour7 === 31){
    hour7 = 7;
  }

  var hour8 = clock[0] + 8;
  if (hour8 === 24){
    hour8 = 0;
  }else if (hour8 === 25){
    hour8 = 1;
  }else if (hour8 === 26){
    hour8 = 2;
  }else if (hour8 === 27){
    hour8 = 3;
  }else if (hour8 === 28){
    hour8 = 4;
  }else if (hour8 === 29){
    hour8 = 5;
  }else if (hour8 === 30){
    hour8 = 6;
  }else if (hour8 === 31){
    hour8 = 7;
  }else if (hour8 === 32){
    hour8 = 8;
  }

  var hour9 = clock[0] + 9;
  if (hour9 === 24){
    hour9 = 0;
  }else if (hour9 === 25){
    hour9 = 1;
  }else if (hour9 === 26){
    hour9 = 2;
  }else if (hour9 === 27){
    hour9 = 3;
  }else if (hour9 === 28){
    hour9 = 4;
  }else if (hour9 === 29){
    hour9 = 5;
  }else if (hour9 === 30){
    hour9 = 6;
  }else if (hour9 === 31){
    hour9 = 7;
  }else if (hour9 === 32){
    hour9 = 8;
  }else if (hour9 === 33){
    hour9 = 9;
  }

  return hours = [hour1, hour2, hour3, hour4, hour5, hour6, hour7, hour8, hour9];

}


  // a call to fetch hourly weather data via open weather map
	fetchHourlyData = () => {
    //console.log("running");
		var url = "http://api.openweathermap.org/data/2.5/forecast?id=2643743&units=metric&appid=fb1dc4da37f9e2330043b353f437dea9";
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseHourly,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

	}

  parseHourly = (parsed_json) => {
    var location = parsed_json['city']['name'];
    var conditions = parsed_json['list']['0']['weather']['0']['id'];
    var time = parsed_json['list']['0']['dt'];
    var temp_c1 = Math.round(parsed_json['list']['0']['main']['temp']);
    var temp_c2 = Math.round(parsed_json['list']['1']['main']['temp']);
    var temp_c3 = Math.round(parsed_json['list']['2']['main']['temp']);

    var description1 = parsed_json['list']['0']['weather']['0']['main'];
    var description2 = parsed_json['list']['1']['weather']['0']['main'];
    var description3 = parsed_json['list']['2']['weather']['0']['main'];

    var wind_speed1 = parsed_json['list']['0']['wind']['speed'];
    var wind_speed2 = parsed_json['list']['1']['wind']['speed'];
    var wind_speed3 = parsed_json['list']['2']['wind']['speed'];




    //call two additional helper functions to parse numeric values for wind direction and conditions into English
    var cond_icon = this.parseConditions(conditions, time, Index.sunset);
    conditions = cond_icon[0];
    this.state.icon = cond_icon[1];

    // set states for fields so they could be rendered later on
    this.setState({
      locate: location,

      temp1: temp_c1 + "°",
      temp2: temp_c2 + "°",
      temp3: temp_c3 + "°",

      desc1: description1,
      desc2: description2,
      desc3: description3,

      winds1: wind_speed1,
      winds2: wind_speed2,
      winds3: wind_speed3

    });


}





// Open Weather Map uses an id code to indicate weather conditions
// This function converts an id code into an English language description and sets the appropriate icon
parseConditions = (c, time, sunset) => {
  var i = "";

  if (200 <= c && c <= 232){
    c = "Thunderstorm";
    if (time < sunset) {
      i = "wi wi-day-thunderstorm";
    } else {
      i = "wi wi-night-alt-thunderstorm";
    }
  } else if (300 <= c && c <= 321){
    c = "Drizzle";
    if (time < sunset) {
      i = "wi wi-day-showers";
    } else {
      i = "wi wi-night-alt-showers";
    }
  } else if (c == 500 || c == 520){
    c = "Light Rain";
    if (time < sunset) {
      i = "wi wi-day-showers";
    } else {
      i = "wi wi-night-alt-showers";
    }
  } else if (c == 501 || c == 521){
    c = "Moderate Rain";
    if (time < sunset) {
      i = "wi wi-day-showers";
    } else {
      i = "wi wi-night-alt-showers";
    }
  } else if ((502 <= c && c <= 504) || (522 <= c && c <= 531)){
    c = "Heavy Rain";
    if (time < sunset) {
      i = "wi wi-day-rain";
    } else {
      i = "wi wi-night-alt-rain";
    }
  } else if (c == 511){
    c = "Freezing Rain";
    if (time < sunset) {
      i = "wi wi-day-sleet";
    } else {
      i = "wi wi-night-alt-sleet";
    }
  } else if (600 <= c && c <= 622){
    c = "Snow";
    if (time < sunset) {
      i = "wi wi-day-snow";
    } else {
      i = "wi wi-night-alt-snow";
    }
  } else if (701 == c) {
    c = "Mist";
    if (time < sunset) {
      i = "wi wi-day-fog";
    } else {
      i = "wi wi-night-fog";
    }
  } else if (721 == c) {
    c = "Haze";
    if (time < sunset) {
      i = "wi wi-day-haze";
    } else {
      i = "wi wi-night-fog";
    }
  } else if (741 == c) {
    c = "Fog";
    if (time < sunset) {
      i = "wi wi-day-fog";
    } else {
      i = "wi wi-night-fog";
    }
  } else if (800 == c || 8003 == c) {
    c = "Clear Sky"
    if (time < sunset) {
      i = "wi wi-day-sunny";
    } else {
      i = "wi wi-night-clear";
    }
  } else {
    c = "Clouds";
    if (time < sunset) {
      i = "wi wi-day-cloudy";
    } else {
      i = "wi wi-night-alt-cloudy";
    }
  }
  return [c,i];
}



  // the main render method for the routes component
	render() {
    this.dateFetch();
    console.log(toDay[1] + " " + clock[0]);
    this.nextEightHours(clock);
    //console.log("running");
    // dsiplay route mapping
		return (
    		<div class={ style.container }>

		      	<div class={ style_topnav.container }>
		        	<routesearch><input type="text" placeholder="Current -> this.state.locate" id="searchField"></input></routesearch>
		        	<buttonleft><a><i class="fa fa-search" id="searchButton"></i></a></buttonleft>
              <Search clickFunction = { this.fetchHourlyData } />

		      	</div>

{/*display the current day, date & time*/}
          <div class= { style_hourly.wrapper }>
            <div> {toDay[0] }, {toDay[1]} {toDay[2]}, {clock[0]}:{clock[1]}</div>

            <div class = { style_hourly.nested } id = { style_hourly.first}>
              <div>{hours[0]}:00</div>
              <div><i class={ this.state.icon }></i></div>
              <div>{ this.state.desc1 }</div>
              <div><i class="fa fa-thermometer"></i></div>
              <div>{ this.state.temp1 }</div>
              <div><i class="wi wi-strong-wind"></i></div>
              <div>{ this.state.winds1 } m/s</div>
              <div></div>
            </div>

            <div class = { style_hourly.nested } id = { style_hourly.second}>
              <div>{hours[1]}:00</div>
              <div><i class="wi wi-showers" id=""></i></div>
              <div>{ this.state.desc1 }</div>
              <div><i class="fa fa-thermometer"></i></div>
              <div>{ this.state.temp1 }</div>
              <div><i class="wi wi-strong-wind"></i></div>
              <div>{ this.state.winds1 } m/s</div>
              <div></div>
            </div>

            <div class = { style_hourly.nested } id = { style_hourly.third } >
              <div>{hours[2]}:00</div>
              <div><i class="wi wi-showers" id=""></i></div>
              <div>{ this.state.desc1 }</div>
              <div><i class="fa fa-thermometer"></i></div>
              <div>{ this.state.temp1 }</div>
              <div><i class="wi wi-strong-wind"></i></div>
              <div>{ this.state.winds1 } m/s</div>
              <div></div>
            </div>

            <div class = { style_hourly.nested } id = { style_hourly.fourth }>
              <div>{hours[3]}:00</div>
              <div><i class="wi wi-showers" id=""></i></div>
              <div>{ this.state.desc2 }</div>
              <div><i class="fa fa-thermometer"></i></div>
              <div>{this.state.temp2 }</div>
              <div><i class="wi wi-strong-wind"></i></div>
              <div>{ this.state.winds2 } m/s</div>
              <div></div>
            </div>

            <div class = { style_hourly.nested } id = { style_hourly.fifth }>
              <div>{hours[4]}:00</div>
              <div><i class="wi wi-showers" id=""></i></div>
              <div>{ this.state.desc2 }</div>
              <div><i class="fa fa-thermometer"></i></div>
              <div>{ this.state.temp2 }</div>
              <div><i class="wi wi-strong-wind"></i></div>
              <div>{ this.state.winds2 } m/s</div>
              <div></div>
            </div>

            <div class = { style_hourly.nested } id = { style_hourly.sixth }>
              <div>{hours[5]}:00</div>
              <div><i class="wi wi-showers" id=""></i></div>
              <div>{ this.state.desc2 }</div>
              <div><i class="fa fa-thermometer"></i></div>
              <div>{ this.state.temp2 }</div>
              <div><i class="wi wi-strong-wind"></i></div>
              <div>{ this.state.winds2 } m/s</div>
              <div></div>
            </div>

            <div class = { style_hourly.nested } id = { style_hourly.seventh }>
              <div>{hours[6]}:00</div>
              <div><i class="wi wi-showers" id=""></i></div>
              <div>{ this.state.desc3 }</div>
              <div><i class="fa fa-thermometer"></i></div>
              <div>{ this.state.temp3 }</div>
              <div><i class="wi wi-strong-wind"></i></div>
              <div>{ this.state.winds3 } m/s</div>
              <div></div>
            </div>

            <div class = { style_hourly.nested } id = { style_hourly.eight }>
              <div>{hours[7]}:00</div>
              <div><i class="wi wi-showers" id=""></i></div>
              <div>{ this.state.desc3 }</div>
              <div><i class="fa fa-thermometer"></i></div>
              <div>{ this.state.temp3 }</div>
              <div><i class="wi wi-strong-wind"></i></div>
              <div>{ this.state.winds3 } m/s</div>
              <div></div>
            </div>

            <div class = { style_hourly.nested } id = { style_hourly.ninth }>
              <div>{hours[8]}:00</div>
              <div><i class="wi wi-showers" id=""></i></div>
              <div>{ this.state.desc3 }</div>
              <div><i class="fa fa-thermometer"></i></div>
              <div>{ this.state.temp3 }</div>
              <div><i class="wi wi-strong-wind"></i></div>
              <div>{ this.state.winds3 } m/s</div>
              <div></div>
            </div>


            <div>
          <i class="fa fa-arrow-circle-o-down" id="next8"> More</i>
            </div>

          </div>
        </div>

		);
	}
}
