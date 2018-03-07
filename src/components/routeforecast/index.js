// import preact
import { h, render, Component } from 'preact';

// import stylesheet for iphone
import style from '../iphone/style';

// import helper functions for API response parsing
import {FetchWeatherForecast, ParseConditions, ParseWind} from '../../helpers.js';

export default class Routeforecast extends Component {

	componentWillMount() {
	    this.fetchForecastData();
	}

	// on component mount, assign dropdown button and expanding dropdown element an id unique to each instance of the component
	// ensures dropdown buttons animate consistently and always display the correct elemtn when clicked
	componentDidMount() {
		if (document.getElementById("details")){
			var element = document.getElementById("details");
		    element.id = this.state.detailsid;
	    }
	    if (document.getElementById("icon")){
	    	var element = document.getElementById("icon");
	    	element.id = this.state.iconid;
	    }
	}

	// set initial values for the route
	constructor(props){
		super(props);
		this.state.count = 0;
		this.expand = this.expand.bind(this);
		this.state.detailsid = this.props.num + "d";
	   	this.state.iconid = this.props.num + "i";
	}

	// a call to fetch weather forecasts for each end of the route via open weather map
	fetchForecastData = () => {
		var parsed_json = FetchWeatherForecast(this.props.lat1, this.props.lon1);
		console.log("Call Made - Start of Route")
		this.parseForecastResponse(parsed_json);
		this.state.count = 1;

		parsed_json = FetchWeatherForecast(this.props.lat2, this.props.lon2);
		console.log("Call Made - End of Route")
		this.parseForecastResponse(parsed_json);
		this.state.count =0;
	}

	// parse relevant fields from Open Weather Map API response, for later rendering
	parseForecastResponse = (parsed_json) => {
		var forecast_list = parsed_json['list'];

		for (var i = 0; i < forecast_list.length; i++) {
			if (this.state.count == 0) {
				if ((forecast_list[i]['dt_txt']).indexOf(this.props.time1) > 0) {
					var forecast = forecast_list[i];
					break;
				}
			} else {
				if ((forecast_list[i]['dt_txt']).indexOf(this.props.time2) > 0) {
					var forecast = forecast_list[i];
					break;
				}
			}
		}

		var temp_c = Math.round((forecast['main']['temp']-273.15) * 10) / 10;
		var wind_speed = forecast['wind']['speed'];
		var wind_direction = forecast['wind']['deg'];
		var conditions = forecast['weather'][0]['id'];
		var sunstate = forecast['sys']['pod'];

		// call two additional helper functions to parse numeric values for wind direction and conditions into English
		var cond_icon = ParseConditions(conditions, sunstate);
		conditions = cond_icon[0];
		var icon = cond_icon[1];
		wind_direction = ParseWind(wind_direction);

		// set states for fields so they can be rendered later on
		if (this.state.count == 0) {
			this.state.temp1 = temp_c + "°";
			this.state.cond1 = conditions;
			this.state.winds1 = wind_speed + "m/s";
			this.state.windd1 = wind_direction;
			this.state.icon1 = icon;
		} else {
			this.state.temp2 = temp_c + "°";
			this.state.cond2 = conditions;
			this.state.winds2 = wind_speed + "m/s";
			this.state.windd2 = wind_direction;
			this.state.icon2 = icon;
		}
	}

	// sets the routedetails element to open when the dropdown button is clicked
	// animates the dropdown button
	expand() {
	    var element = document.getElementById(this.state.detailsid);
	    if (element.style.display === "none") {
	        element.style.display = "inline-block";
	    } else {
	        element.style.display = "none";
	    }

		var icon = document.getElementById(this.state.iconid);
		if(icon.className == "fa fa-chevron-circle-down") {
			icon.className = "fa fa-chevron-circle-up";
		} else {
			icon.className = "fa fa-chevron-circle-down";
		}
	}

	// the main render method for the routeforecast component
	render() {

		return (
			<div class={ style.route }>
				<div class={ style.name }>{this.props.title}</div>
				<div class={ style.dropdown } onClick={this.expand}><i id="icon" class="fa fa-chevron-circle-down"/></div>
				<div class={ style.routetext }>{this.props.name1}: {this.props.timed1}</div>
				<div class={ style.routetext }>{this.props.name2}: {this.props.timed2}</div>
				<div class={ style.routegraphics }>
					<div class={ style.routeicon }><i class= {this.state.icon1}></i></div>
					<div class={ style.line }/>
					<div class={ style.routeicon }><i class= {this.state.icon2}></i></div>
				</div>
				<div class={ style.routetext }>{this.state.temp1}</div>
				<div class={ style.routetext }>{this.state.temp2}</div>
				<div class={ style.routedetails } id="details" style="display: none">
					<div class={ style.detailtext }>{this.state.cond1}<br />{this.state.winds1}<br />{this.state.windd1}</div>
					<div class={ style.detailicon }><i class="wi wi-strong-wind"/><br /><i class="fa fa-compass"/></div>
					<div class={ style.detailtext }>{this.state.cond2}<br />{this.state.winds2}<br />{this.state.windd2}</div>
				</div>
			</div>
		);
	}
}
