// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone, button
import style from './style.less';
import style_home from '../home/style_home'
import style_topnav from '../topnav/style_topnav';
import style_bottomnav from '../bottomnav/style_bottomnav';

// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
//Import pages
//import Home from '../index.js';
//import Route from './index.js';

export default class Route extends Component {

  // a constructor with initial set states
  constructor(props){
    super(props);
  }


  // the main render method for the routes component
	render() {

    // dsiplay route mapping
		return (
    		<div class={ style_home.container }>


	      	<div class={style_topnav.containerRoute}>
	        	<search-bar><input type="text" placeholder="Search my routes..." id="searchField"></input></search-bar>
	        	<button-left><a><i class="fa fa-search" id="searchButton"></i></a></button-left>
	        	<button-right><a><i class="fa fa-cog"></i></a></button-right>
	      	</div>

	      	<div class={style.plusbutton}>
				<button-left><i class="fa fa-plus-circle" id="addRoute"> <text-add>Add Route</text-add></i></button-left><br />
    	  	</div>


			<div class={ style.grid }>
					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>WORK</td><td>Start: SE27</td></tr><tr><td>6 pm</td><td>End: N19</td></tr></table></div>
					<div class= {style.gridchild2 }><button-right><i class="fa fa-edit" id="editroute"></i></button-right></div>
				</div>

				<div class={ style.grid }>
					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>HOME</td><td>Start: E16</td></tr><tr><td>6 pm</td><td>End: SE18</td></tr></table></div>
					<div class= {style.gridchild2 }><button-right><i class="fa fa-edit" id="editroute"></i></button-right></div>
				</div>

				<div class={ style.grid }>
					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>UNI</td><td>Start: NE2</td></tr><tr><td>6 pm</td><td>End: SW1</td></tr></table></div>
					<div class= {style.gridchild2 }><button-right><i class="fa fa-edit"></i></button-right></div>
				</div>

				<div class={ style.grid }>
					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>GYM</td><td>Start: W12</td></tr><tr><td>6 pm</td><td>End: W18</td></tr></table></div>
					<div class= {style.gridchild2 }> <button-right><i class="fa fa-edit"></i></button-right></div>
          </div>



			</div>
		);
	}
}