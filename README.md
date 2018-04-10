## Introduction

High fidelity prototype for the mobile weather app "Cyclone", built with Preact. Cyclone targets commuter cyclists looking to inform their gear choices with weather forecasts for their cycling routes. Part 2 of a 3 part Graphical User Interface project covering stakeholder research and design, product prototyping, and product evaluation.

## App Summary

The prototype comprises four pages: home, hourly, routes, and radar. 

*Home*
Displays the current weather at a saved home location. Supports user search for weather at locations within the UK. Also display forecast for start/end points of saved routes.

*Hourly*
24-hour forecast for the location currently displayed on the home page. Also supports user search.

*Route*
Placeholder page visualising the route management system. Envisages functionality to save routes and update favourites to display on the home page.

*Radar*
Placeholder page visualising rain radar system, a priority according to our stakeholders.

## Set-Up Guide

**0. Install latest versions of node and npm (npm v: 4.0.5 & node v: 7.4.0) :**

```sh
node -v
npm -v
```
**1. Clone this repository :**

```sh
git clone --depth 1 https://github.com/JustGuiUni/weatherapp.git
cd weather-app
```

**2. Make it your own :**

```sh
rm -rf .git && git init && npm init
```

> Command above re-initializes the repo and sets up NPM project on your local machine.


**3. Install the dependencies :**

```sh
npm install
```

**4. Test the app with a live-reload development server :**

```sh
npm run dev
```

> This is a full web server for the application. Any changes to the `src` directory will rebuild the app and even refresh the browser.
