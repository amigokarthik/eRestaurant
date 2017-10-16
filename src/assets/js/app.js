"use strict";

/* global require */
(function () {
    // Add your code here

    // Create the root object reference
  	var root = window;

  	// Global APP Object reference
  	var APP = new Object();

  	// Register APP as global object
  	root.APP = APP;

  	/**
  	 * Function executing after DOM load
  	 *
  	 * Include all your post DOM loader events in the function block below so
  	 * that it will get executed immediately after the DOM loading.
  	 */
  	$(document).ready(function() {

  	});

    // Event triggered when resized
    $(window).resize(function(){

    });


}());
