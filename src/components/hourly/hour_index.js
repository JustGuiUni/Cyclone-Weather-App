// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone, button

import style from '../iphone/style.less';
import style_hourly from './style.less';

export default class Hourly extends Component {

	constructor(props){
		super(props);
		this.state.fetched = false;
	}

	componentWillMount() {
		this.setState({
			current: this.props.current,
			forecast_list: this.props.hourly['list'],
			hour: (this.props.hr + this.props.num) % 24
		})

		if(this.state.hour == 12) {
	    	this.state.time = "12pm";
	    } else if(this.state.hour == 0) {
	    	this.state.time = "12am";
	    } else if(this.state.hour >12) {
	    	this.state.time = this.state.hour - 12 + "pm";
	    } else {
	    	this.state.time = this.state.hour + "am";
	    }

	    //this.parseHourlyWeather();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.current != this.props.current) {
			this.setState({
  				current: nextProps.current,
  				forecast_list: nextProps.hourly['list']
			})
		}
		this.parseHourlyWeather();
	}

	// parse relevant fields from Open Weather Map API resposne, for later rendering
	parseCurrentWeather = () => {
		var parsed_json = this.state.current;
		var location = parsed_json['name'];
		var temp_c = Math.round((parsed_json['main']['temp']-273.15) * 10) / 10;
		var wind_speed = parsed_json['wind']['speed'];
		var wind_direction = parsed_json['wind']['deg'];
		var conditions = parsed_json['weather'][0]['id'];
		var sunrise = parsed_json['sys']['sunrise'];
		var sunset = parsed_json['sys']['sunset'];
		var weather_time = parsed_json['dt'];

		if (sunrise < weather_time && weather_time < sunset) {
			var sunstate = "d";
		} else {
			var sunstate = "n";
		}

		// call two additional helper functions to parse numeric values for wind direction and conditions into English
		var cond_icon = this.parseConditions(conditions, sunstate);
		conditions = cond_icon[0];
		this.state.icon = cond_icon[1];
		wind_direction = this.parseWind(wind_direction);

		// set states for fields so they can be rendered later on
		this.state.temp = temp_c + "°";
		this.state.cond = conditions;
		this.state.winds = wind_speed + "m/s";
		this.state.windd = wind_direction;
		this.state.icon = cond_icon[1];

		this.state.fetched = true;
	}

	parseHourlyWeather = () => {

		if((this.props.num < (3 - this.props.hr % 3))) {
			this.parseCurrentWeather();
			return;
		}

		var hour_group = (this.state.hour - (this.state.hour % 3));
		if (hour_group == 24 || hour_group == 0) {
			hour_group = "00:00";
		}

		console.log(hour_group);

		for (var i = 0; i < this.state.forecast_list.length; i++) {
			if ((this.state.forecast_list[i]['dt_txt']).indexOf(hour_group + ":") > 0) {
				var forecast = this.state.forecast_list[i];
				break;
			}
		}
		var temp_c = Math.round((forecast['main']['temp']-273.15) * 10) / 10;
		var wind_speed = forecast['wind']['speed'];
		var wind_direction = forecast['wind']['deg'];
		var conditions = forecast['weather'][0]['id'];
		var sunstate = forecast['sys']['pod'];

		// call two additional helper functions to parse numeric values for wind direction and conditions into English
		var cond_icon = this.parseConditions(conditions, sunstate);
		conditions = cond_icon[0];
		var icon = cond_icon[1];
		wind_direction = this.parseWind(wind_direction);

		this.state.temp = temp_c + "°";
		this.state.cond = conditions;
		this.state.winds = wind_speed + "m/s";
		this.state.windd = wind_direction;
		this.state.icon = icon;

		if(this.state.hour % 3 == 2) {
			delete this.state.forecast_list[forecast];
		}

		this.state.fetched = true;
	}

	// Open Weather Map uses an id code to indicate weather conditions
	// This function converts an id code into an English language description and sets the appropriate icon
	parseConditions = (c, sunstate) => {

		var i = "";

		if (200 <= c && c <= 232){
			c = "Thunderstorm";
			if (sunstate == "d") {
				i = "wi wi-day-thunderstorm";
			} else {
				i = "wi wi-night-alt-thunderstorm";
			}
		} else if (300 <= c && c <= 321){
			c = "Drizzle";
			if (sunstate == "d") {
				i = "wi wi-day-showers";
			} else {
				i = "wi wi-night-alt-showers";
			}
		} else if (c == 500 || c == 520){
			c = "Light Rain";
			if (sunstate == "d") {
				i = "wi wi-day-showers";
			} else {
				i = "wi wi-night-alt-showers";
			}
		} else if (c == 501 || c == 521){
			c = "Moderate Rain";
			if (sunstate == "d") {
				i = "wi wi-day-showers";
			} else {
				i = "wi wi-night-alt-showers";
			}
		} else if ((502 <= c && c <= 504) || (522 <= c && c <= 531)){
			c = "Heavy Rain";
			if (sunstate == "d") {
				i = "wi wi-day-rain";
			} else {
				i = "wi wi-night-alt-rain";
			}
		} else if (c == 511){
			c = "Freezing Rain";
			if (sunstate == "d") {
				i = "wi wi-day-sleet";
			} else {
				i = "wi wi-night-alt-sleet";
			}
		} else if (600 <= c && c <= 622){
			c = "Snow";
			if (sunstate == "d") {
				i = "wi wi-day-snow";
			} else {
				i = "wi wi-night-alt-snow";
			}
		} else if (701 == c) {
			c = "Mist";
			if (sunstate == "d") {
				i = "wi wi-day-fog";
			} else {
				i = "wi wi-night-fog";
			}
		} else if (721 == c) {
			c = "Haze";
			if (sunstate == "d") {
				i = "wi wi-day-haze";
			} else {
				i = "wi wi-night-fog";
			}
		} else if (741 == c) {
			c = "Fog";
			if (sunstate == "d") {
				i = "wi wi-day-fog";
			} else {
				i = "wi wi-night-fog";
			}
		} else if (800 == c) {
			c = "Clear Sky"
			if (sunstate == "d") {
				i = "wi wi-day-sunny";
			} else {
				i = "wi wi-night-clear";
			}
		} else {
			c = "Clouds";
			if (sunstate == "d") {
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

	render() {

		return(
			<div class = { style_hourly.nested }>
				<div>{this.state.time}</div>
				<div><i class={ this.state.icon }/></div>
				<div>{ this.state.cond }</div>
				<div><i class="fa fa-thermometer"></i></div>
				<div>{ this.state.temp }</div>
				<div><i class="wi wi-strong-wind"></i></div>
				<div>{ this.state.winds } { this.state.windd }</div>
				<div></div>
			</div>
        );
	}
}
