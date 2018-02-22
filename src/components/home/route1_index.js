// import preact
import { h, render, Component } from 'preact';
import $ from 'jquery';
	
export default class Route extends Component {

	// check if weather data for the given route has been fetched
	componentDidMount() {
		if (this.state.temp1 === "") {
			this.fetchForecastData();
		}
	}

	// set initial values for the route
	constructor(props){
		super(props);
		this.state.lon1 = "-0.0997446597109663";
		this.state.lat1 = "51.4632800638367";
		this.state.lon2 = "-0.03749985";
		this.state.lat2 = "51.520497918";
		this.state.name1 = "Home";
		this.state.name2 = "QMUL";
		this.state.time1 = "06:00:00";
		this.state.time2 = "09:00:00";
		this.state.temp1 = "";
		this.state.count = 0;
	}

	// a call to fetch weather forecasts for each end of the route via open weather map
	fetchForecastData = () => {
		
		var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.state.lat1 + "&lon=" + this.state.lon1 + "&appid=fb1dc4da37f9e2330043b353f437dea9";
		$.ajax({
			url: url,
			dataType: "json",
			async: false,
			success : this.parseForecastResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		this.state.count =1;

		url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + this.state.lat2 + "&lon=" + this.state.lon2 + "&appid=fb1dc4da37f9e2330043b353f437dea9";
		$.ajax({
			url: url,
			dataType: "json",
			async: false,
			success : this.parseForecastResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		this.state.count =0;
	}

	// parse relevant fields from Open Weather Map API response, for later rendering
	parseForecastResponse = (parsed_json) => {
		var forecast_list = parsed_json['list'];

		for (var i = 0; i < forecast_list.length; i++) {
			if (this.state.count == 0) {
				if ((forecast_list[i]['dt_txt']).indexOf(this.state.time1) > 0) {
					var forecast = forecast_list[i];
					break;
				}
			} else {
				if ((forecast_list[i]['dt_txt']).indexOf(this.state.time2) > 0) {
					var forecast = forecast_list[i];
					break;
				}
			}
		}

		var temp_c = Math.round((forecast['main']['temp']-273.15) * 10) / 10;
		var wind_speed = forecast['wind']['speed'];
		var wind_direction = forecast['wind']['deg'];
		var conditions = forecast['weather'][0]['id'];

		// call two additional helper functions to parse numeric values for wind direction and conditions into English
		var cond_icon = this.parseConditions(conditions);
		conditions = cond_icon[0];
		var icon = cond_icon[1];
		wind_direction = this.parseWind(wind_direction);

		// set states for fields so they could be rendered later on
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


	// Open Weather Map uses an id code to indicate weather conditions
	// This function converts an id code into an English language description and sets the appropriate icon
	parseConditions = (c) => {
		var i = "";

		if (200 <= c && c <= 232){
			c = "Thunderstorm";
			i = "fa fa-bolt";
		} else if (300 <= c && c <= 321){
			c = "Drizzle";
			i = "fa fa-tint";
		} else if (c == 500 || c == 520){
			c = "Light Rain";
			i = "fa fa-tint";
		} else if (c == 501 || c == 521){
			c = "Moderate Rain";
			i = "fa fa-tint";
		} else if ((502 <= c && c <= 504) || (522 <= c && c <= 531)){
			c = "Heavy Rain";
			i = "fa fa-tin";
		} else if (c == 511){
			c = "Freezing Rain";
			i = "fa fa-tint";
		} else if (600 <= c && c <= 622){
			c = "Snow";
			i = "fa fa-snowflake";
		} else if (701 == c) {
			c = "Mist";
			i = "fa fa-align-justify";
		} else if (721 == c) {
			c = "Haze";
			i = "fa fa-align-justify";
		} else if (741 == c) {
			c = "Fog";
			i = "fa fa-align-justify";
		} else if (800 == c) {
			c = "Clear Sky"
			i = "fa fa-sun-o";
		} else {
			c = "Clouds";
			i = "fa fa-cloud";
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

	// The elements to render when this component mounts
	render() {

		return (
			<route>
				<name>Your Next Commute</name>
				<dropdown></dropdown>
				<route-text>{this.state.name1}: 8:00am</route-text>
				<route-text>{this.state.name2}: 9:00am</route-text>
				<block>a</block>
				<route-icon><i class= {this.state.icon1}></i></route-icon>
				<line/>
				<route-icon><i class= {this.state.icon2}></i></route-icon>
				<route-text>{this.state.temp1}</route-text>
				<route-text>{this.state.temp2}</route-text>
			</route>

		);
	}
}