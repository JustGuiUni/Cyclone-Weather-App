import { h, render, Component } from 'preact';
import style_bottomnav from './style_bottomnav';

export default class Bottomnav extends Component {

	render() {
		return(

			<div class={ style_bottomnav.container }>
				<bottom-button><i class="fa fa-home"></i></bottom-button>
				<bottom-button><i class="fa fa-clock-o"></i></bottom-button>
				<bottom-button><i class="fa fa-map-marker"></i></bottom-button>
				<bottom-button><i class="fa fa-bullseye"></i></bottom-button>
			</div>
		)
	}
}