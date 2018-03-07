// import jquery for API calls
import $ from 'jquery';

export const FetchCurrentWeather = (lat, lon) => {		

	var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=d237a7f64a603e590c18e8f7479ed65c";
	var result = "";
	$.ajax({
		url: url,
		async: false,
		dataType: "json",
		success : function(data) {result = data},
		error : function(req, err){ console.log('API call failed ' + err); }
	})
	return result;
}

export const FetchWeatherForecast = (lat, lon) => {
	
	var url = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=d237a7f64a603e590c18e8f7479ed65c";
	var result = "";
	$.ajax({
		url: url,
		async: false,
		dataType: "json",
		success : function(data) {result = data},
		error : function(req, err){ console.log('API call failed ' + err); }
	})
	return result;
}

// Open Weather Map uses an id code to indicate weather conditions
// This function converts an id code into an English language description and sets the appropriate icon
export const ParseConditions = (c, sunstate) => {

	var i = "";

	if (200 <= c && c <= 232){
		c = "Thunderstorm";
		if (sunstate == "d") {
			i = "wi wi-day-thunderstorm";
		} else {
			i = "wi wi-night-alt-thunderstorm";
		}
	} else if (300 <= c && c <= 321){
		c = "Drizzle";
		if (sunstate == "d") {
			i = "wi wi-day-showers";
		} else {
			i = "wi wi-night-alt-showers";
		}
	} else if (c == 500 || c == 520){
		c = "Light Rain";
		if (sunstate == "d") {
			i = "wi wi-day-showers";
		} else {
			i = "wi wi-night-alt-showers";
		}
	} else if (c == 501 || c == 521){
		c = "Moderate Rain";
		if (sunstate == "d") {
			i = "wi wi-day-showers";
		} else {
			i = "wi wi-night-alt-showers";
		}
	} else if ((502 <= c && c <= 504) || (522 <= c && c <= 531)){
		c = "Heavy Rain";
		if (sunstate == "d") {
			i = "wi wi-day-rain";
		} else {
			i = "wi wi-night-alt-rain";
		}
	} else if (c == 511){
		c = "Freezing Rain";
		if (sunstate == "d") {
			i = "wi wi-day-sleet";
		} else {
			i = "wi wi-night-alt-sleet";
		}
	} else if (600 <= c && c <= 622){
		c = "Snow";
		if (sunstate == "d") {
			i = "wi wi-day-snow";
		} else {
			i = "wi wi-night-alt-snow";
		}
	} else if (701 == c) {
		c = "Mist";
		if (sunstate == "d") {
			i = "wi wi-day-fog";
		} else {
			i = "wi wi-night-fog";
		}
	} else if (721 == c) {
		c = "Haze";
		if (sunstate == "d") {
			i = "wi wi-day-haze";
		} else {
			i = "wi wi-night-fog";
		}
	} else if (741 == c) {
		c = "Fog";
		if (sunstate == "d") {
			i = "wi wi-day-fog";
		} else {
			i = "wi wi-night-fog";
		}
	} else if (800 == c) {
		c = "Clear Sky"
		if (sunstate == "d") {
			i = "wi wi-day-sunny";
		} else {
			i = "wi wi-night-clear";
		}
	} else {
		c = "Clouds";
		if (sunstate == "d") {
			i = "wi wi-day-cloudy";
		} else {
			i = "wi wi-night-alt-cloudy";
		}
	}
	return [c,i];
}

// Open Weather Map uses degrees from North for wind direction
// This function converts degress from North into an 8-point-compass direction

export const ParseWind = (w) => {

	if (22.5 < w && w <= 67.5) {
		w = "NE";
	} else if (67.5 < w && w <= 112.5) {
		w = "E";
	} else if (112.5 < w && w <= 157.5) {
		w = "SE";
	} else if (157.5 < w && w <= 202.5) {
		w = "S";
	} else if (202.5 < w && w <= 247.5) {
		w = "SW";
	} else if (247.5 < w && w <= 292.5) {
		w = "W";
	} else if (292.5 < w && w <= 337.5) {
		w = "NW";
	} else {
		w = "N";
	}

	return w;
}