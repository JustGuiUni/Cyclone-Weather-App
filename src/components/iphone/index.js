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

    componentWillMount() {
        this.props.showTopNav();
    	this.setState({
    		lon: this.props.lon,
    		lat: this.props.lat
    	})
        this.fetchWeatherData();
    }

    componentWillReceiveProps(nextProps) {
    	if (nextProps.lon != this.props.lon) {
	    	this.setState({
	        	lon: nextProps.lon,
	        	lat: nextProps.lat
	        })
    		this.fetchWeatherData();
    	}
    }

	// a call to fetch weather data via open weather map
	fetchWeatherData = () => {

		var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&appid=d237a7f64a603e590c18e8f7479ed65c";
		console.log(url)
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
		var sunrise = parsed_json['sys']['sunrise'];
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
	parseConditions = (c, time, sunrise, sunset) => {
		var i = "";

		if (200 <= c && c <= 232){
			c = "Thunderstorm";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-thunderstorm";
			} else {
				i = "wi wi-night-alt-thunderstorm";
			}
		} else if (300 <= c && c <= 321){
			c = "Drizzle";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-showers";
			} else {
				i = "wi wi-night-alt-showers";
			}
		} else if (c == 500 || c == 520){
			c = "Light Rain";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-showers";
			} else {
				i = "wi wi-night-alt-showers";
			}
		} else if (c == 501 || c == 521){
			c = "Moderate Rain";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-showers";
			} else {
				i = "wi wi-night-alt-showers";
			}
		} else if ((502 <= c && c <= 504) || (522 <= c && c <= 531)){
			c = "Heavy Rain";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-rain";
			} else {
				i = "wi wi-night-alt-rain";
			}
		} else if (c == 511){
			c = "Freezing Rain";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-sleet";
			} else {
				i = "wi wi-night-alt-sleet";
			}
		} else if (600 <= c && c <= 622){
			c = "Snow";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-snow";
			} else {
				i = "wi wi-night-alt-snow";
			}
		} else if (701 == c) {
			c = "Mist";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-fog";
			} else {
				i = "wi wi-night-fog";
			}
		} else if (721 == c) {
			c = "Haze";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-haze";
			} else {
				i = "wi wi-night-fog";
			}
		} else if (741 == c) {
			c = "Fog";
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-fog";
			} else {
				i = "wi wi-night-fog";
			}
		} else if (800 == c) {
			c = "Clear Sky"
			if (sunrise < time && time < sunset) {
				i = "wi wi-day-sunny";
			} else {
				i = "wi wi-night-clear";
			}
		} else {
			c = "Clouds";
			if (sunrise < time && time < sunset) {
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

	// the main render method for the iphone component
	render() {

		return (
			<div class ={ style.container }>
				
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