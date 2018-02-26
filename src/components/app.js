// import preact
import { h, Component } from 'preact';

// import router and link components
import { Router } from 'preact-router';
import { Link } from 'preact-router';

// import required application components
import Iphone from './iphone';
import Route from './routes';
import Bottomnav from './bottomnav';

// import stylesheet for iphone
import style from './iphone/style';

export default class App extends Component {

	//A render method to display the required components on screen
	render(){
		return (

			<div class = {style.container}>

			{/* External stylesheets with icons for interface elements and weather display, accessible throughout the app */}
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/weather-icons/2.0.9/css/weather-icons.min.css"></link>

				<div id="app">
					{/* Implement the preact Router component to handle navigating between pages of the app */}
					<Router onChange={this.handleRoute}>
						<Iphone path = "/index" />
						<Iphone path = "/" />
						<Route path = "/routes" />
					</Router>

					<Bottomnav/>
				</div>
			</div>
		);
	}
}