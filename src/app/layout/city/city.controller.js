"use strict";

/* Inject Dependencies */
CityController.$inject = ["$scope", "$uibModal","$cookies", "$location","toastr", 
	"$state", "AppConstants","geolocation","HomeService"];

/**
* Controller responsible for managing login data
* =============================================================================
*
* @param {[type]} $scope                [description]
* @param {[type]} $location             [description]
* @param {[type]} AppConstants          [description]
* @param {[type]} AuthenticationService [description]
* @param {[type]} toastr                [description]
* @param {[type]} SessionService        [description]
*/
function CityController($scope, $uibModal, $cookies, $location,toastr,
	$state, AppConstants,geolocation,HomeService) {
	const self = this;

	// ============================================================================
	//                            INIT BLOCK                                    //
	// ============================================================================


	// ============================================================================
	//                            EVENTS BLOCK                                  //
	// ============================================================================

	// Gets called when the page hassai@mail.com completed loading
	$scope.$on("$stateChangeSuccess", function() {
		
		if ($state.current.name === "city"){
			if (angular.isDefined($state.params.city) && $state.params.city !== "") {
				console.log("cityParam",$state.params.city);
				// self.city = $state.params.city;
				loadRestaurantsBasedOnCity($state.params.city);
			} else {
				$state.go("home");
			}
			loadAllCities();
			loadAllCountries();
		}

	});

	// ============================================================================
	//   													FUNCTIONS BLOCK                               //
	// ============================================================================

	/**
	 * Function to load the list of all serviced cities
	 * ===========================================================================
	 *
	 * @return {[type]} [description]
	 */
	function loadAllCities() {
		HomeService.getAllCities().then(function (response) {
			self.cityCount = response.count;
			self.cities = response.cities;
			console.log("loc controller Response",response);
		}, function (error) {
			toastr.error("Unable to load Data. Please try again.",
				error ? error.error : "Error");
		});
	}

	/**
	 * Function to load the list of all serviced cities
	 * ===========================================================================
	 *
	 * @return {[type]} [description]
	 */
	function loadAllCountries() {
		HomeService.getAllCountries().then(function (response) {
			console.log(response.cities);
			self.countryCount = response.count;
			console.log("loc controller Response",response);
		}, function (error) {
			toastr.error("Unable to load Data. Please try again.",
				error ? error.error : "Error");
		});
	}

	/**
	 * Function to load the list of restaurants based on city
	 * ===========================================================================
	 *
	 * @return {[type]} [description]
	 */
	function loadRestaurantsBasedOnCity(city) {
		HomeService.getRestaurantsBasedOnCity(city).then(function (response) {
			console.log("restaurants",response.restaurants);
			self.restaurants = response.restaurants;
			console.log("loc controller Response",response);
		}, function (error) {
			toastr.error("Unable to load Data. Please try again.",
				error ? error.error : "Error");
		});
	}

}

// Export the module
module.exports = {
	name : "CityController", // Change this name
	fn : CityController, // Change this function name
	type : "controller"
};
