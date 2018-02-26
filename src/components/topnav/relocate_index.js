// import preact
import { h, render, Component } from 'preact';

// import stylesheet for topnav
import style from './style';
	
export default class Relocate extends Component {

	// A render method to render a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}	
		return (
			<div class={ style.buttonleft } onClick={clickFunction}>
				<i class="fa fa-crosshairs"></i>
			</div>
		);
	}
}