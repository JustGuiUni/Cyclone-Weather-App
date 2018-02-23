// import preact
import { h, Component } from 'preact';
import { Router } from 'preact-router';
import { Link } from 'preact-router';

// import required Components from 'components/'
import Iphone from './iphone';
import style from './iphone/style';
import Route from './routes';
import Footer from './bottomnav';
//import TopNav from './topnav';

export default class App extends Component {
//var App = React.createClass({

		/*
		*@param {object} event
		*@param {string} event.url
		*/

	handleRoute = e => {
				this.currentUrl = e.url;
			};


	/*
		A render method to display the required Component on screen (iPhone or iPad) : selected by checking component's isTablet state
	*/
	render(){

			return (

				<div class = {style.container}>
					<div id="app">
						<Router onChange={this.handleRoute}>
							<Iphone path = "/index" />
							<Route path="/routes" />
						</Router>

						<Footer/>
						</div>
					</div>

		);

	}
}
