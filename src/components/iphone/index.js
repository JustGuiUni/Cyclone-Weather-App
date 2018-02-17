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
		// temperature, long, lat initialise state
		this.state.temp = "";
		this.state.lon = "-0.03749985";
		this.state.lat = "51.520497918";
		// this.state.postcodeVal = "";
		// button display state
		this.setState({ display: true });
		this.updateInputValue = this.updateInputValue.bind(this);
	}

	// a call to fetch weather data via open weather map
	fetchWeatherData = (lat,lon) => {

		var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + this.state.lat + "&lon=" + this.state.lon + "&appid=fb1dc4da37f9e2330043b353f437dea9";
		$.ajax({
			url: url,
			dataType: "json",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });

	}

		// The below section sets up a listener on the text input and the search button, takes that data
		// and sends an API call to poscodes.io, parses the response data and puts the relevant data into variables.
		// This is all done on the client side. 

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

		this.fetchWeatherData(this.state.lat,this.state.lon);

	}

	updateInputValue(evt){
	    this.state.postcodeVal = evt.target.value;
	    console.log(this.state.postcodeVal);
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
					<input type="text" placeholder="Please put in your postcode..." id="searchField"  onChange={this.updateInputValue}></input>
					<button-left onClick={() => this.postcodeSearch()} ><a><i class="fa fa-search" id="searchButton"></i></a></button-left>	
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
