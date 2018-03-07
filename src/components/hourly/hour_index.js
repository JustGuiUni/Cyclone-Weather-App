// import preact
import { h, render, Component } from 'preact';

// import stylesheets for iphone, button
import style from '../iphone/style.less';
import style_hourly from './style.less';

// import helper functions for API response parsing
import {ParseConditions, ParseWind} from '../../helpers.js';

export default class Hourly extends Component {

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

	    this.parseHourlyWeather();
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
		var cond_icon = ParseConditions(conditions, sunstate);
		conditions = cond_icon[0];
		this.state.icon = cond_icon[1];
		wind_direction = ParseWind(wind_direction);

		// set states for fields so they can be rendered later on
		this.state.temp = temp_c + "°";
		this.state.cond = conditions;
		this.state.winds = wind_speed + "m/s";
		this.state.windd = wind_direction;
		this.state.icon = cond_icon[1];
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

		for (var i = 0; i < this.state.forecast_list.length; i++) {
			if ((this.state.forecast_list[i]['dt_txt']).indexOf(hour_group + ":") > 0) {
				var forecast = this.state.forecast_list[i];
				break;
			}
		}
		var temp_c = Math.round((forecast['main']['temp']-273.15) * 10) / 10;
		var wind_speed = Math.round(forecast['wind']['speed'] * 10) / 10;
		var wind_direction = forecast['wind']['deg'];
		var conditions = forecast['weather'][0]['id'];
		var sunstate = forecast['sys']['pod'];

		// call two additional helper functions to parse numeric values for wind direction and conditions into English
		var cond_icon = ParseConditions(conditions, sunstate);
		conditions = cond_icon[0];
		var icon = cond_icon[1];
		wind_direction = ParseWind(wind_direction);

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