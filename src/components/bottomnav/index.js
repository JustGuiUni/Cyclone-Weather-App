import {h, render, Component} from 'preact';
import { Link } from 'preact-router';
import style_bottomnav from './style_bottomnav.less';

export default class Bottomnav extends Component {

   render() {
      return (
        <nav class={ style_bottomnav.container }>
        <Link activeClassName="active" href="/index"><bottom-button><i class="fa fa-home"></i></bottom-button></Link>
        <bottom-button><i class="fa fa-clock-o"></i></bottom-button>
        <Link activeClassName="active" href="/routes"><bottom-button><i class="fa fa-map-marker"></i></bottom-button></Link>
        <bottom-button><i class="fa fa-bullseye"></i></bottom-button>
        </nav>
      );
    }
}
