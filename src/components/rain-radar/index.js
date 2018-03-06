//import preact
import { h, render, Component } from 'preact';
//import stylesheets
import style_iphone from '../iphone/style';
import style from './style_radar';
import style_topnav from '../topnav/style';

export default class Radar extends Component {

  render () {

    return(

      <div class={ style.routes }>
        <div class = {style_iphone.homepage}>

          <div class = {style.heading}>
            <p> Search live rainfall information </p>
          </div>
          <div class = {style.container}>
            <div class = {style.buttonplus}><i class="fa fa-plus-square-o"></i></div>
            <div class = {style.buttonminus}><i class="fa fa-minus-square-o"></i></div>
          </div>
        </div>
      </div>
    );
  }
}
