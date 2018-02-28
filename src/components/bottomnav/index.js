import {h, render, Component} from 'preact';
import { Link } from 'preact-router';
import style from './style';

export default class Bottomnav extends Component {

   render() {
      return (
        <nav class={ style.container }>
        <Link activeClassName="active" href="/index"><div class={ style.bottombutton }><i class="fa fa-home"></i></div></Link>
        <div class={ style.bottombutton }><i class="fa fa-clock-o"></i></div>
        <Link activeClassName="active" href="/routes"><div class={ style.bottombutton }><i class="fa fa-map-marker"></i></div></Link>
        <Link activeClassName="active" href="/rain-radar"><div class={ style.bottombutton }><i class="fa fa-bullseye"></i></div></Link>
        </nav>
      );
    }
}
