// import preact
import { h, Component } from 'preact';

// import router and link components
import { Router } from 'preact-router';
import { Link } from 'preact-router';

// import required application components
import Topnav from './topnav';
import Iphone from './iphone';
import Route from './routes';
import Hourly from './hourly';
import Bottomnav from './bottomnav';
import Radar from './rain-radar';

// import stylesheet for iphone
import style from './iphone/style';
import style_topnav from './topnav/style'

export default class App extends Component {

	constructor (props) {
    	super(props)
    	this.state.lon = "-0.03749985";
		this.state.lat = "51.520497918";
    }

    updateLocation = (newLon, newLat) => {
    	this.setState({
    		lon: newLon,
    		lat: newLat,
    	})
    	console.log(this.state.lon)
    	console.log(this.state.lat)
    }

	//A render method to display the required components on screen
	render(){

		return (

			<div class = {style.container}>

				<Topnav updateLocation={this.updateLocation}/>

				{/* External stylesheets with icons for interface elements and weather display, accessible throughout the app */}
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css"></link>
				<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet"></link>

				<div>
					{/* Implement the preact Router component to handle navigating between pages of the app */}
					<Router onChange={this.handleRoute}>
						<Iphone path = "/index" lon={this.state.lon} lat={this.state.lat}/>
						<Iphone path = "/" lon={this.state.lon} lat={this.state.lat}/>
						<Hourly path = "/hourly" lon={this.state.lon} lat={this.state.lat}/>
						<Route path = "/routes" />
						<Radar path = "/rain-radar" />
					</Router>
				</div>
				<Bottomnav/>
			</div>
		);
	}
}