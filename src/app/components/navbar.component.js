"use strict";

/* Inject Dependencies */
// navbarComponent.$inject = ["$scope"];

/**
 * Component responsible for managing dummy data
 * =============================================================================
 * Functions to be mapped to navbar component and its related links.
 *
 * @param       {[type]} $scope [description]
 * @constructor
 */
function navbarComponent() {
	return {
    templateUrl: "./app/components/navbar.component.html",
	controller: ["$state","$rootScope","$window", "$uibModal", "$location",
	  "toastr", "$cookies", "$timeout", "AppConstants", function ($state, $rootScope,
		 $window, $uibModal,$location, toastr, $cookies, $timeout, 
		   AppConstants) {
			
			// Instance object of the component
			const self = this;

			self.stateName = $state.current.name;

	}]
  };
}

// Export the module
module.exports = {
  name : "navbarComponent", // Change this name
  fn : navbarComponent, // Change this function name
	type : "component"
};
