// import preact
import { h, render, Component } from 'preact';
// import stylesheets
import style from './style';
import style_bottomnav from '../bottomnav/style_bottomnav';
import style_home from '../home/style_home';
// import jquery for API calls
import $ from 'jquery';
// import components
import Home from '../home/home_index';
import Route from '../home/route_index';

export default class Iphone extends Component {

	// the main render method for the iphone component
	render() {
				
		return (
			<div class={ style.container }>		

				{/* Link to an external stylesheet 'font awesome' that includes icons */}
				{/* Allows icon for any element to be set with the following syntax: <i class ="fa fa-ICONNAME"></i>}*/}
				<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>	
		
				<div class ={ style_home.container }>

					{/* The element that displays the current weather */}
					<Home/>
					
					{/* Elements containing route weather information */}
					<Route title = "Your Next Commute" lon1 = "-0.099" lat1 = "51.463" lon2 = "-0.037" lat2 = "51.520" name1 = "Home" name2 = "QMUL" time1 = "06:00:00" time2 = "09:00:00" timed1 = "8am" timed2 = "9am"/>
					<Route title = "Gym" lon1 = "-0.037" lat1 = "51.520" lon2 = "-0.219" lat2 = "51.516" name1 = "QMUL" name2 = "Gym" time1 = "15:00:00" time2 = "18:00:00" timed1 = "5pm" timed2 = "6pm"/>
					<Route title = "Home" lon1 = "-0.219" lat1 = "51.516" lon2 = "-0.099" lat2 = "51.463" name1 = "Gym" name2 = "Home" time1 = "21:00:00" time2 = "21:00:00" timed1 = "8pm" timed2 = "9pm"/>
				</div>

				{/* Bottom navigation bar. Not currently functional. Contains buttons linking home, hourly, route, and radar pages. */}
				<div class={ style_bottomnav.container }>
					<bottom-button><i class="fa fa-home"></i></bottom-button>
					<bottom-button><i class="fa fa-clock-o"></i></bottom-button>
					<bottom-button><i class="fa fa-map-marker"></i></bottom-button>
					<bottom-button><i class="fa fa-bullseye"></i></bottom-button>
				</div>
			</div>
		);
	}
}