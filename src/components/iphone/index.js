// import preact
import { h, render, Component } from 'preact';

// import stylesheets for iphone, topnav
import style from './style';
import style_topnav from '../topnav/style';

// import required application components
import Routeforecast from '../routeforecast/';
import Relocate from '../topnav/relocate_index';
import Search from '../topnav/search_index';

// import helper functions for API response parsing
import {FetchCurrentWeather, ParseConditions, ParseWind} from '../../helpers.js';

export default class Iphone extends Component {

    componentWillMount() {
    	this.setState({
    		lon: this.props.lon,
    		lat: this.props.lat
    	})
    	this.parseResponse(FetchCurrentWeather(this.state.lat, this.state.lon));
    	console.log("Call Made - Current Weather")
    }

    componentWillReceiveProps(nextProps) {
    	if (nextProps.lon != this.props.lon) {
	    	this.setState({
	        	lon: nextProps.lon,
	        	lat: nextProps.lat
	        })
    	this.parseResponse(FetchCurrentWeather(this.state.lat, this.state.lon));
    	}
    }

	// parse relevant fields from Open Weather Map API resposne, for later rendering
	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = Math.round((parsed_json['main']['temp']-273.15) * 10) / 10;
		var wind_speed = Math.round(parsed_json['wind']['speed'] * 10) / 10;
		var wind_direction = parsed_json['wind']['deg'];
		var conditions = parsed_json['weather'][0]['id'];
		var sunrise = parsed_json['sys']['sunrise'];
		var sunset = parsed_json['sys']['sunset'];
		var time = parsed_json['dt'];
		if (sunrise < time && time < sunset) {
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
		this.setState({
			locate: location,
			temp: temp_c + "°",
			cond : conditions,
			winds : wind_speed + "m/s",
			windd: wind_direction
		});
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