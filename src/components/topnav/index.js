// import preact
import {h, render, Component} from 'preact';
import Relocate from './relocate_index';
import Search from './search_index';

// import stylesheet for bottomnav
import style from './style';

export default class Topnav extends Component {

    constructor(props){
        super(props);
        this.updateInputValue = this.updateInputValue.bind(this);
    }

    componentWillMount() {
        this.state.showError = false;
    }

    // makes a call to postcodes.io based on the postcode value inputed by the user
    // parses this postcode into lat and lon values
    postcodeSearch(){
        var postcodeRE = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/;
        var postcode = postcodeRE.exec(this.state.postcodeVal);

        postcode = postcode[0];
        console.log("postcode" + postcode);

        var url = "https://api.postcodes.io/postcodes/" + postcode;

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send();
        console.log(xhr.responseText);

        var JSONresponse = JSON.parse(xhr.responseText);

        this.props.updateLocation(JSONresponse['result']['longitude'], JSONresponse['result']['latitude']);
    }

    // makes a call to nominatim.openstreetmap.org based on the location entered by the user
    // calls postcodeSearch() if the user has entered a postcode
    // if not a postcode, parses this location into lat and lon values
    placeSearch = () =>{
        var place = this.state.postcodeVal;

        var url = "https://nominatim.openstreetmap.org/search?q=" + place + "&format=jsonv2";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, false);
        xhr.send();
        console.log(xhr.responseText);

        var JSONresponse = JSON.parse(xhr.responseText);

        try {
            if (JSONresponse[0] == undefined) {
                this.postcodeSearch();
                return;
            }
        } catch (err) {
            console.log("Postcode Search Error");
        }

        try {
            for (var i = 0; i <= JSONresponse.length; i++) {
                console.log("place" + place);
                console.log(JSONresponse[i]['display_name']);
                var checkString = JSONresponse[i]['display_name'];
                if (checkString.includes("United Kingdom")) {
                    this.props.updateLocation(JSONresponse[0]['lon'], JSONresponse[0]['lat']);
                    return;
                }
            }
        } catch (err) {
            console.log("Place Search Error");
            this.setState({
                showError: true,
            })
            console.log(this.state.showError);
        }
    }

    // reads data from the text input on any update and sets the class variable "postcodeVal" to that value.
    updateInputValue(evt) {
        this.state.postcodeVal = evt.target.value;
        console.log(this.state.postcodeVal);
		evt.target.value = '';
    }

    // resets coordinates to default location when user presses the crosshair button
    resetCoordinates = () => {
        this.props.updateLocation("-0.03749985", "51.520497918");
        //this.fetchWeatherData();
    }

    hideError = () => {
        this.setState({
            showError: false,
        })
        console.log(this.state.showError);
    }

// the main render method for the iphone component
    render() {

        var error_box =
                <div class={ style.error } id="popup">
                  <div>Search location <br />not recognised.<br />Please try again</div>
                    <okbutton onclick = {this.hideError}>OK</okbutton>
                </div>

        //Links are used to control routing between different pages of the app
        return (
            <div class={ style.container }>

                {/* Reset coordinates when user presses the crosshair button */}
                <Relocate clickFunction = {this.resetCoordinates}/>

                {/* Update text input and coordinates when user makes a search*/}
                <input class={ style.input }  type="location" placeholder="Search Location..." id="searchField"  onChange ={ this.updateInputValue }></input>
                <Search clickFunction = {this.placeSearch}/>
                {this.state.showError ? error_box : null}
            </div>
        );
    }
}
