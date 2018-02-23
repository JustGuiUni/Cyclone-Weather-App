// import preact
import { h, render, Component } from 'preact';
	
export default class Search extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}	
		return (
			<buttonleft onClick={clickFunction}>
				<i class="fa fa-search"></i>
			</buttonleft>
		);
	}
}