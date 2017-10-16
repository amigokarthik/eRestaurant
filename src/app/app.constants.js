"use strict";

// Cloud server ip
 const SERVER_URL = "http://localhost";
// const SERVER_URL = "http://139.59.78.0";

/*
 * app.constants.js
 * =============================================================================
 * Define all application specific constants to be used inside
 * angular modules here.
 */
const AppConstants = {
  /* Application title */
  appTitle: "app title",
  appName : "application name",
  /* Application Version */
  version: "0.1",
  httpTimeout: 5000,
  /* API resource end point */
  // apiUrl: SERVER_URL+":5050/xyz/API",
  homeUrl: "/home",
  dashBoardUrl: "/dashboard",
  apiAuthenticationUrl: SERVER_URL + ":5050/xyz/API/token",
  apiRevokeTokenUrl: SERVER_URL + ":5050/xyz/API/logout",
  loginUrl : "/login",
  homeUrl: "/home",
  logoutUrl : "/logout",
  client_id : "xyzDesk",
  client_secret : "*%z@0!7",
};

module.exports = AppConstants;
