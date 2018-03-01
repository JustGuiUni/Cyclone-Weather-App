// import preact
import { h, render, Component } from 'preact';

// import stylesheets for iphone, topnav
import style from './style';
import style_topnav from '../topnav/style';

// import jquery for API calls
import $ from 'jquery';

// import required application components
import Routeforecast from '../routeforecast/';
import Relocate from '../topnav/relocate_index';
import Search from '../topnav/search_index';


export default class Iphone extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.state.temp = "";
		this.state.lon = "-0.03749985";
		this.state.lat = "51.520497918";
		this.updateInputValue = this.updateInputValue.bind(this);
	}

	// a call to fetch weather data via open weather map
	fetchWeatherData = () => {

		var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&appid=fb1dc4da37f9e2330043b353f437dea9";
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

	}

	// parse relevant fields from Open Weather Map API resposne, for later rendering
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = Math.round((parsed_json['main']['temp']-273.15) * 10) / 10;
		var wind_speed = parsed_json['wind']['speed'];
		var wind_direction = parsed_json['wind']['deg'];
		var conditions = parsed_json['weather'][0]['id'];
		var sunset = parsed_json['sys']['sunset'];
		var time = parsed_json['dt'];

		// call two additional helper functions to parse numeric values for wind direction and conditions into English
		var cond_icon = this.parseConditions(conditions, time, sunset);
		conditions = cond_icon[0];
		this.state.icon = cond_icon[1];
		wind_direction = this.parseWind(wind_direction);

		// set states for fields so they can be rendered later on
		this.setState({
			locate: location,
			temp: temp_c + "°",
			cond : conditions,
			winds : wind_speed + "m/s",
			windd: wind_direction
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
		} else if (800 == c) {
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

	// Open Weather Map uses degrees from North for wind direction
	// This function converts degress from North into an 8-point-compass direction
	parseWind = (w) => {
		if (22.5 < w && w <= 67.5) {
			w = "NE";
		} else if (67.5 < w && w <= 112.5) {
			w = "E";
		} else if (112.5 < w && w <= 157.5) {
			w = "SE";
		} else if (157.5 < w && w <= 202.5) {
			w = "S";
		} else if (202.5 < w && w <= 247.5) {
			w = "SW";
		} else if (247.5 < w && w <= 292.5) {
			w = "W";
		} else if (292.5 < w && w <= 337.5) {
			w = "NW";
		} else {
			w = "N";
		}

		return w;		
	}

	// isPostcodeCheck = () =>{
 // 		var postcodeRE = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
 // 		var postcodeChecked = postcodeRE.exec(this.state.postcodeVal);
 // 		console.log("postcodeChecked: " +postcodeChecked);
 // 		var isJustAPostcode = this.state.postcodeVal.replace(postcodeChecked, '');
 // 		console.log("isJustAPostcode: " +isJustAPostcode);
 
 // 		if (isJustAPostcode == null) {
 // 			console.log("Is a postcode");
 // 			this.postcodeSearch();
 // 		} else {
 // 			console.log("Is a place");
 // 			this.placeSearch();
 // 		}
 
 // 	}

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

		this.fetchWeatherData();
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
	 
	 	this.fetchWeatherData();
 	}

	// reads data from the text input on any update and sets the class variable "postcodeVal" to that value. 
	updateInputValue(evt){
	    this.state.postcodeVal = evt.target.value;
	    console.log(this.state.postcodeVal);
	}

	// resets coordinates to default location when user presses the crosshair button
	resetCoordinates = () =>{
		this.state.lon = "-0.03749985";
		this.state.lat = "51.520497918";
		this.fetchWeatherData();
	}

	// the main render method for the iphone component
	render() {

		// fetch current weather information on initial render
		if (this.state.temp === "") {
			this.fetchWeatherData();
		}

		return (
			<div class ={ style.container }>
				<div class={ style_topnav.container }>
					
					{/* Reset coordinates when user presses the crosshair button */}
					<Relocate clickFunction={ this.resetCoordinates }/>
					
					{/* Update text input and coordinates when user makes a search*/}
					<input class={ style_topnav.input }  type="location" placeholder="Search Location..." id="searchField"  onChange ={ this.updateInputValue }></input>
					<Search clickFunction ={ this.placeSearch }/>	
						
					{/* Settings button has no functionality currently */}
					<div class={ style_topnav.buttonright }><i class="fa fa-cog"></i></div>	
				</div>
				
				{/* Current weather at specified location */ }
				<div class={ style.homepage }>
					<div class={ style.current }>
						<div class={ style.weatherlocation }> {this.state.locate} </div>				
						<div class={ style.weatheriandc }>
							<div class={ style.weathericon }><i class= {this.state.icon}></i></div><br />
							<div class={ style.weatherconditions }>{this.state.cond}</div>
						</div>
						
						{/* Display temperature, wind speed, wind direction*/}
						<div class={ style.weathertext }> 
							<br /><div class={ style.subicon }><i class="fa fa-thermometer"></i></div>{this.state.temp} 
							<br /><div class={ style.subicon }><i class ="wi wi-strong-wind"></i></div>{this.state.winds} 
							<br /><div class={ style.subicon }><i class="fa fa-compass"></i></div>{this.state.windd}
						</div>
					</div>

					{/* Elements containing route weather information */}
					<Routeforecast title="Your Next Commute" lon1="-0.1" lat1="51.463" lon2="-0.037" lat2="51.520" name1="Home" name2="QMUL" time1="09:00:00" time2="09:00:00" timed1="8am" timed2="9am" num="1"/>
					<Routeforecast title="Gym" lon1= "-0.037" lat1="51.520" lon2="-0.219" lat2="51.516" name1="QMUL" name2="Gym" time1="15:00:00" time2="18:00:00" timed1="5pm" timed2="6pm" num="2"/>
					<Routeforecast title="Home" lon1= "-0.219" lat1="51.516" lon2="-0.099" lat2="51.463" name1="Gym" name2="Home" time1="21:00:00" time2="21:00:00" timed1="8pm" timed2="9pm" num="3"/>
				</div>
			</div>
		)
	}
}