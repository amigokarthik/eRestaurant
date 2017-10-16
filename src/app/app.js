"use strict";

/**
 * Global Imports
 * =============================================================================
 * Imports all the global script files that are
 * used throughout the application.
 */
 require("angular");
 require("angular-animate");
 require("angular-cookies");
 require("angular-sanitize");
 require("angular-ui-bootstrap");
 require("angular-ui-router");
 require("angular-base64");
 require("angular-moment");
 require("angular-toastr");
 require("oi.select");

// Custom created components
require("./templatescache");

// ===========================================================================//
// angular modules import
// ===========================================================================//
const constants = require("./app.constants");
const config = require("./app.config");
const onRunConfig = require("./app.onrun");

// Load from bower components
require("../../bower_components/angularjs-geolocation/dist/angularjs-geolocation.min");

// ===========================================================================//
// create and bootstrap application
// ===========================================================================//
const requires = [
  /** For angular animations **/
  "ngAnimate",
  /** For angular cookiestore **/
  "ngCookies",
  /** Sanitization for angular messages **/
  "ngSanitize",
  /** For routing options **/
  "ui.router",
  "ui.bootstrap",
  /** For creating toastr notifications **/
  "toastr",
  /** For base64 conversions **/
  "base64",
  /** Caching all html pages into one file **/
  "templatescache",
  /** angular list select **/
  "oi.select",
  /** Use momentjs in angular **/
  "angularMoment",
  // Add more vendor or custom modules
  "geolocation"
];

/** The application component name **/
/** Do not use this name in any other component **/
const appName = "yourAppName";

const plugins = {};

// mount on window for testing, disable this for production
angular.module(appName, requires);

// ===========================================================================//
// Define constants here
// ===========================================================================//
angular.module(appName).constant("AppConstants", constants);

// https://github.com/urish/angular-moment
// Even if you have moment-timezone in your package.json, angular-moment will
// not be able to use it unless you override moment using Angular"s dependency
// injection.
angular.module(appName).constant("moment", require("moment-timezone"));

/** Mount your applicaiton plugins **/
angular.module(appName).constant("AppPlugins", plugins);

// ============================================================================//
// application extensions configurations
// ============================================================================//
/** String utlity library plugin **/
plugins.underscoreString = require("underscore.string");


// ===========================================================================//
// Define controllers here
// ===========================================================================//
const controllers = [
  require("./layout/home/home.controller"),
  require("./layout/city/city.controller"),
  require("./layout/restaurant/restaurant.controller")
];



// ===========================================================================//
// Define services here
// ===========================================================================//
const services = [
  require("./services/home.service"),
];


// ===========================================================================//
// Define components here
// ===========================================================================//
const components = [
  require("./components/navbar.component")
];


// ===========================================================================//
// Define directives here
// ===========================================================================//
const directives = [
  require("./utils/spinner.directive"),
  require("./utils/date.picker.directive")
];


// ===========================================================================//
// Define filters here
// ===========================================================================//
const filters = [
];


// ===========================================================================//
// Mapping components happens here - Dont edit these sections
// ===========================================================================//

angular.forEach(controllers, function(item){ // Mapping controllers
  if (item.fn && angular.isFunction(item.fn)) {
    angular.module(appName).controller(item.name, item.fn);
  }
});

angular.forEach(services, function(item){ // Mapping services
  if (item.fn && angular.isFunction(item.fn)) {
    angular.module(appName).factory(item.name, item.fn);
  }
});

angular.forEach(components, function(item){ // Mapping components
  if (item.fn && angular.isFunction(item.fn)) {
    angular.module(appName).component(item.name, item.fn());
  }
});

angular.forEach(directives, function(item){ // Mapping directives
  if (item.fn && angular.isFunction(item.fn)) {
    angular.module(appName).directive(item.name, item.fn);
  }
});

angular.forEach(filters, function(item){ // Mapping filters
  if (item.fn && angular.isFunction(item.fn)) {
    angular.module(appName).filter(item.name, item.fn);
  }
});

// ===========================================================================//
// Application configurations
// ===========================================================================//
angular.module(appName).config(config);
angular.module(appName).run(onRunConfig);

// ===========================================================================//
// Map the app as the module to the DOM - Dont edit these sections
// This will set the app that is created to the dom when page gets loaded.
// ===========================================================================//
angular.bootstrap(document, [appName], {
  strictDi: true
});
