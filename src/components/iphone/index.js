// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone, button, topnav, bottomnav
import style from './style';
// import style_iphone from '../button/style_iphone';
import style_topnav from '../topnav/style_topnav';
import style_bottomnav from '../bottomnav/style_bottomnav';
import style_home from '../home/style_home';
// import jquery for API calls
import $ from 'jquery';
// import the Button
// import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature, long, lat initialise state
		this.state.temp = "";
		this.state.lon = "-0.03749985";
		this.state.lat = "51.520497918";
		// this.state.postcodeVal = "";
		// button display state
		// this.setState({ display: true });
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
		// once the data grabbed, hide the button
		// this.setState({ display: false });

	}

	// parse relevant fields from Open Weather Map API resposne, for later rendering
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = Math.round((parsed_json['main']['temp']-273.15) * 10) / 10;
		var wind_speed = parsed_json['wind']['speed'];
		var wind_direction = parsed_json['wind']['deg'];
		var conditions = parsed_json['weather'][0]['id'];

		// Open Weather Map uses an id code to indicate weather conditions
		// This if statement converts an id code into an English language description
		if (200 <= conditions && conditions <= 232){
			conditions = "Thunderstorm";
		} else if (300 <= conditions && conditions <= 321){
			conditions = "Drizzle";
		} else if (conditions == 500 || conditions == 520){
			conditions = "Light Rain";
		} else if (conditions == 501 || conditions == 521){
			conditions = "Moderate Rain";
		} else if ((502 <= conditions && conditions <= 504) || (522 <= conditions && conditions <= 531)){
			conditions = "Heavy Rain";
		} else if (conditions == 511){
			conditions = "Freezing Rain";
		} else if (600 <= conditions && conditions <= 622){
			conditions = "Snow";
		} else if (701 == conditions) {
			conditions = "Mist";
		} else if (721 == conditions) {
			conditions = "Haze";
		} else if (741 == conditions) {
			conditions = "Fog";
		} else if (800 == conditions) {
			conditions = "Clear Sky"
		} else {
			conditions = "Clouds";
		}

		// Open Weather Map uses degrees from North for wind direction
		// This if statement converts degress from North into an 8-point-compass direction
		if (22.5 < wind_direction <= 67.5) {
			wind_direction = "NE";
		} else if (67.5 < wind_direction <= 112.5) {
			wind_direction = "E";
		} else if (112.5 < wind_direction <= 157.5) {
			wind_direction = "SE";
		} else if (157.5 < wind_direction <= 202.5) {
			wind_direction = "S";
		} else if (202.5 < wind_direction <= 247.5) {
			wind_direction = "SW";
		} else if (247.5 < wind_direction <= 292.5) {
			wind_direction = "W";
		} else if (292.5 < wind_direction <= 337.5) {
			wind_direction = "NW";
		} else {
			wind_direction = "N";
		}

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c + "°",
			cond : conditions,
			winds : wind_speed + "m/s",
			windd: wind_direction
		});      
	}

	// The below function makes a call to postcodes.io based on the postcode value inputed by the user. 
	// It also then calls the fetchWeatherData function.

	postcodeSearch = () =>{
		
		var postcode = this.state.postcodeVal;
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

	// This function reads data from the text input on any update and sets the class variable postcode to that value. 
	updateInputValue(evt){
	    this.state.postcodeVal = evt.target.value;
	    console.log(this.state.postcodeVal);
	}

	// Reset coordinates when user presses the crosshair button
	resetCoordinates(){
		this.state.lon = "-0.03749985";
		this.state.lat = "51.520497918";
		this.fetchWeatherData();
	}


	// the main render method for the iphone component
	render() {

		// fetch starting weather data
		if (this.state.temp === "") {
			this.fetchWeatherData();
		}
				
		return (
			<div class={ style.container }>
				
				{/* Top navigation bar, containing search, re-locate, and settings */}
				<div class={ style_topnav.container }>
				
				{/* Link to an external stylesheet 'font awesome' that includes icons */}
				{/* Allows icon for any element to be set with the following syntax: <i class ="fa fa-ICONNAME"></i>}*/}
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>	
					
					{/* Reset coordinates when user presses the crosshair button */}
					<button-left onClick={() => this.resetCoordinates()}><i class="fa fa-crosshairs"></i></button-left>
					
					{/* Update text input and coordinates when user makes a search*/}
					<input type="text" placeholder="Postcode..." id="searchField"  onChange={this.updateInputValue}></input>
					<button-left onClick={() => this.postcodeSearch()} ><i class="fa fa-search" id="searchButton"></i></button-left>	
					
					{/* Settings button has no functionality currently */}
					<button-right><i class="fa fa-cog"></i></button-right>	
				</div>

			{/* The component that displays the current weather */}
				<div class ={ style_home.container }>
					<current>
						<weather-location> {this.state.locate} </weather-location>
						
						{/* Determine which icon to use depending on current conditions */}
						<weather-icon><br />
							<div style="font-size: 120px;">
								{this.state.cond == "Thunderstorm" ? <i class="fa fa-bolt"></i> : null}
								{this.state.cond == "Drizzle" ? <i class="fa fa-tint"></i> : null}
								{this.state.cond == "Light Rain" ? <i class="fa fa-tint"></i> : null}
								{this.state.cond == "Moderate Rain" ? <i class="fa fa-tint"></i> : null}
								{this.state.cond == "Heavy Rain" ? <i class="fa fa-tint"></i> : null}
								{this.state.cond == "Freezing Rain" ? <i class="fa fa-tint"></i> : null}
								{this.state.cond == "Snow" ? <i class="fa fa-snowflake"></i> : null}
								{this.state.cond == "Mist" ? <i class="fa fa-align-justify"></i> : null}
								{this.state.cond == "Haze" ? <i class="fa fa-align-justify"></i> : null}
								{this.state.cond == "Fog" ? <i class="fa fa-align-justify"></i> : null}
								{this.state.cond == "Clear Sky" ? <i class="fa fa-sun"></i> : null}
								{this.state.cond == "Clouds" ? <i class="fa fa-cloud"></i> : null}
							</div>
						{this.state.cond} </weather-icon>
						
						{/* Display temperature, wind speed, wind direction*/}
						<weather-text> 
							<br /><sub-icon><i class="fa fa-thermometer"></i></sub-icon>{this.state.temp} 
							<br /><sub-icon><i class="fa fa-align-right"></i></sub-icon>{this.state.winds} 
							<br /><sub-icon><i class="fa fa-compass"></i></sub-icon>{this.state.windd}
						</weather-text>
					</current>
					<route></route>
					<route></route>
					<route></route>
				</div>

				{/* Commenting out the boilerplate button
				<div class={ style.display }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>


				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
				*/}

				{/* Bottom navigation bar. Not currently functional. Contains buttons linking home, hourly, route, and radar pages. */}
				<div class={ style_bottomnav.container }>
					<bottom-button><i class="fa fa-home"></i></bottom-button>
					<bottom-button><i class="fa fa-clock-o"></i></bottom-button>
					<bottom-button><i class="fa fa-map-marker"></i></bottom-button>
					<bottom-button><i class="fa fa-bullseye"></i></bottom-button>
				</div>
			</div>
		);
	}
}