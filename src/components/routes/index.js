// import preact
import { h, render, Component } from 'preact';

// import stylesheets for iphone, button
import style from './style.less';
import style_topnav from '../topnav/style';
import style_iphone from '../iphone/style';

export default class Route extends Component {

    componentWillMount() {
        this.props.hideTopNav();
    }

    // the main render method for the routes component
	render() {

		return (
    		<div class={ style.container }>


          <div class={ style_topnav.container }>
            <input class={ style_topnav.input } type="route" placeholder="Search my routes..." id="searchField"></input>
            <div class={ style_topnav.buttonleft }><a><i class="fa fa-search" id="searchButton"></i></a></div>
          </div>


          {/* Each grid element represents settings for a route, inputted by the user */}
          <div class={ style_iphone.homepage }>
            <div class={ style.plusbutton }>
              <button-left><i class="fa fa-plus-circle" id="addRoute"> <text-add>Add Route</text-add></i></button-left><br />
            </div>
    				<div class={ style.grid }>

    					<div class= {style.gridchild1 }><table class={ style.table }><tr><td>UNI</td><td>Start: Home</td></tr><tr><td>8 am</td><td>End: QMUL</td></tr></table></div>
    					<div class= {style.gridchild2 }><button-right><i class="fa fa-edit" id="editroute"></i></button-right></div>
    				</div>

					<div class={ style.grid }>
						<div class= {style.gridchild1 }><table class={ style.table }><tr><td>GYM</td><td>Start: W12</td></tr><tr><td>6 pm</td><td>End: W18</td></tr></table></div>
						<div class= {style.gridchild2 }> <button-right><i class="fa fa-edit"></i></button-right></div>
          			</div>

					<div class={ style.grid }>
						<div class= {style.gridchild1 }><table class={ style.table }><tr><td>HOME</td><td>Start: E16</td></tr><tr><td>6 pm</td><td>End: SE18</td></tr></table></div>
						<div class= {style.gridchild2 }><button-right><i class="fa fa-edit" id="editroute"></i></button-right></div>
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
                </div>
			</div>
		);
	}
}
