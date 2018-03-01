//import preact
import { h, render, Component } from 'preact';
//import stylesheets
import style_iphone from '../iphone/style';
import style from './style_radar';
import style_topnav from '../topnav/style';

//Import components from topnav
import Relocate from '../topnav/relocate_index';
import Search from '../topnav/search_index';

export default class Radar extends Component {

  // a constructor with initial set states
  constructor(props){
    super(props);
  }

  render () {

    return(

      <div class={ style_iphone.container }>

      <div class={ style_topnav.container }>

        {/* Reset coordinates when user presses the crosshair button */}
        <Relocate />

        {/* Update text input and coordinates when user makes a search*/}
        <input class={ style_topnav.input }  type="location" placeholder="Search Location..." id="searchField"></input>
        <Search />
        {/* Settings button has no functionality currently */}
        <div class={ style_topnav.buttonright }><i class="fa fa-cog"></i></div>
      </div>

      <div class = {style_iphone.homepage}>

        <div class = {style.heading}>
          <p> Search live rainfall information </p>
        </div>
        <div class = {style.container}>
          <div class = {style.buttonplus}><i class="fa fa-plus-square"></i></div>
          <div class = {style.buttonminus}><i class="fa fa-minus-square"></i></div>
        </div>



      </div>


      </div>


    );


  }


}
