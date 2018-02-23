// import preact
import { h, render, Component } from 'preact';
	
export default class Relocate extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}	
		return (
			<buttonleft onClick={clickFunction}>
				<i class="fa fa-crosshairs"></i>
			</buttonleft>
		);
	}
}