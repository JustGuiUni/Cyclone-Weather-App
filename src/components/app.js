// import preact
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router';

// import required Components from 'components/'
import Iphone from './iphone';
import Route from './routes';
import Bottomnav from './bottomnav';

import style from './iphone/style';

export default class App extends Component {
//var App = React.createClass({

	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render(){
		return (

			<div class = {style.container}>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

				<div id="app">
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