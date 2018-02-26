// import preact
import { h, render, Component } from 'preact';
// import stylesheets for iphone, button
import style from './style.less';
import style_topnav from '../topnav/style_topnav';

export default class Route extends Component {

  // a constructor with initial set states
  constructor(props){
    super(props);
  }


  // the main render method for the routes component
	render() {

    // dsiplay route mapping
		return (
    		<div class={ style.container }>

		      	<div class={style_topnav.container}>
		        	<routesearch><input type="text" placeholder="Search my routes..." id="searchField"></input></routesearch>
		        	<buttonleft><a><i class="fa fa-search" id="searchButton"></i></a></buttonleft>
		        	<buttonright><a><i class="fa fa-cog"></i></a></buttonright>
		      	</div>

            <div class={style.plusbutton}>
					    <button-left><i class="fa fa-plus-circle" id="addRoute"> <text-add>Add Route</text-add></i></button-left><br />
	    	  	</div>

            <homepage>
    				<div class={ style.grid }>
    					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>UNI</td><td>Start: Home</td></tr><tr><td>8 am</td><td>End: QMUL</td></tr></table></div>
    					<div class= {style.gridchild2 }><button-right><i class="fa fa-edit" id="editroute"></i></button-right></div>
    				</div>

    				<div class={ style.grid }>
    					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>GYM</td><td>Start: QMUL</td></tr><tr><td>5 pm</td><td>End: Gym</td></tr></table></div>
    					<div class= {style.gridchild2 }><button-right><i class="fa fa-edit" id="editroute"></i></button-right></div>
    				</div>

    				<div class={ style.grid }>
    					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>HOME</td><td>Start: Gym</td></tr><tr><td>8 pm</td><td>End: Home</td></tr></table></div>
    					<div class= {style.gridchild2 }><button-right><i class="fa fa-edit"></i></button-right></div>
    				</div>

    				<div class={ style.grid }>
    					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>COFFEE TIME</td><td>Start: Home</td></tr><tr><td>11 am</td><td>End: Coffee store</td></tr></table></div>
    					<div class= {style.gridchild2 }> <button-right><i class="fa fa-edit"></i></button-right></div>
            </div>

            <div class={ style.grid }>
    					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>FAMILY</td><td>Start: Home</td></tr><tr><td>5 pm</td><td>End: Family place</td></tr></table></div>
    					<div class= {style.gridchild2 }> <button-right><i class="fa fa-edit"></i></button-right></div>
            </div>

            <div class={ style.grid }>
    					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>JAMES</td><td>Start: Home</td></tr><tr><td>12 am</td><td>End: James place</td></tr></table></div>
    					<div class= {style.gridchild2 }> <button-right><i class="fa fa-edit"></i></button-right></div>
            </div>

            </homepage>
			</div>
		);
	}
}
