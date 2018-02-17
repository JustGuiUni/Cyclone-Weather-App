// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone, button
import style from './style';
import style_iphone from '../button/style_iphone';
import style_topnav from '../topnav/style_topnav';
// import jquery for API calls
import $ from 'jquery';
// import the Button
import Button from '../button';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via open weather map
	fetchWeatherData = () => {
		var lat = "51.5240670"
		var lon = "-0.0403740"
		var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=fb1dc4da37f9e2330043b353f437dea9";
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		
		// topnav element links to an external stylesheet 'font awesome' that includes icons
		// allows icon for any element to be set with the following syntax: <i class ="fa fa-ICONNAME"></i>
		return (
			<div class={ style.container }>
				
				<div class={ style_topnav.container }>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>	
					<button-left><a><i class="fa fa-bullseye"></i></a></button-left>
					<input type="text" placeholder="Search.."></input>
					<button-left><a><i class="fa fa-search"></i></a></button-left>	
					<button-right><a><i class="fa fa-cog"></i></a></button-right>	
				</div>

				<div class={ style.display }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>


				<div class={ style.details }></div>
				<div class= { style_iphone.container }> 
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['name'];
		var temp_c = Math.round((parsed_json['main']['temp']-273.15) * 10) / 10;
		var conditions = parsed_json['weather'][0]['main'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});      
	}
}