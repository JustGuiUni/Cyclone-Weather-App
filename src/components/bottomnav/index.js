// import preact
import {h, render, Component} from 'preact';

// import link component
import { Link } from 'preact-router';

// import stylesheet for bottomnav
import style from './style';

export default class Bottomnav extends Component {

// the main render method for the iphone component
   render() {
      
      return (
            //Links are used to control routing between different pages of the app
            <nav class={ style.container }>
                <Link activeClassName="active" href="/index"><div class={ style.bottombutton }><i class="fa fa-home"></i></div></Link>
                <Link activeClassName="active" href="/hourly"><div class={ style.bottombutton }><i class="fa fa-clock-o"></i></div></Link>
                <Link activeClassName="active" href="/routes"><div class={ style.bottombutton }><i class="fa fa-map-marker"></i></div></Link>
                <Link activeClassName="active" href="/rain-radar"><div class={ style.bottombutton }><i class="fa fa-bullseye"></i></div></Link>
            </nav>
        );
    }
}