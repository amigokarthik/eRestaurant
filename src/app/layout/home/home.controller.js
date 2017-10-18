"use strict";

/* Inject Dependencies */
HomeController.$inject = ["$scope", "$uibModal","$cookies", "$location","toastr", 
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
function HomeController($scope, $uibModal, $cookies, $location,toastr,
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
		
		if ($state.current.name === "home"){
			
			self.redirect = false;

			// Function that checks for user location and passes to city state
			
			geolocation.getLocation().then(function(data){
				// self.testingData = 38.933132 + "," +  -90.08830209999999;
				// self.data = data.coords.latitude + "," +  data.coords.longitude;
				HomeService.getLocationByLatLng(
					data.coords.latitude,data.coords.longitude
				).then(function (response) {
					response.results[0].address_components.forEach(function(row,index){
						if (row.types.length === 2 && row.types[0] === "locality"
							&& row.types[1] === "political"){
							console.log(row.long_name);
							self.redirect = true;;
							$state.go("city",{city : row.long_name});
						}
					});
				}, function (error) {
					toastr.error("Unable to load Data. Please try again.",
						error ? error.error : "Error");
				});
			});
			if(self.redirect === false){
				$state.go("city",{city : ""});
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
			// console.log("loc controller Response",response);
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
			// console.log(response.cities);
			self.countryCount = response.count;
			// console.log("loc controller Response",response);
		}, function (error) {
			toastr.error("Unable to load Data. Please try again.",
				error ? error.error : "Error");
		});
	}
}

// Export the module
module.exports = {
	name : "HomeController", // Change this name
	fn : HomeController, // Change this function name
	type : "controller"
};
