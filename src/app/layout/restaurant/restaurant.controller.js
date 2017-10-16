"use strict";

/* Inject Dependencies */
RestaurantController.$inject = ["$scope", "$uibModal","$cookies", "$location","toastr", 
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
function RestaurantController($scope, $uibModal, $cookies, $location,toastr,
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
		
		if ($state.current.name === "restaurant"){
			if (angular.isDefined($state.params.id)) {
				console.log("resIDParam",$state.params.id);
				loadRestaurantById($state.params.id);
			}
			
			self.times = [
				{
					time : "10:30 A.M"
				},
				{
					time : "4:30 P.M"
				},
				{
					time : "6:30 P.M"
				},
				{
					time : "9:30 P.M"
				}
			];
			// console.log("hello");
	  
			// self.coords = geolocation.getLocation().then(function(data){
			// 		// console.log("geodata",data.coords.latitude);
			// 		self.data = data.coords.latitude + "," +  data.coords.longitude;
			// 		HomeService.getLocationByLatLng(
			// 			16.8357413,-100.0027406
			// 		).then(function (response) {
			// 			// console.log("success");
			// 			// response.results.forEach(function(row,index){
							
			// 			// });
			// 			console.log("loc controller Response",response);
			// 		}, function (error) {
			// 			toastr.error("Unable to load Data. Please try again.",
			// 				error ? error.error : "Error");
			// 		});
			// 		const latlng = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
			// 		const geocoder = new google.maps.Geocoder();
			// 		geocoder.geocode({ "latLng": latlng }, function (results, status) {
			// 			if (status === google.maps.GeocoderStatus.OK) {
			// 				if (results[1]) {
			// 					console.log("Location: ", results[1].formatted_address);
			// 				}
			// 			}
			// 		});
			// 	return {lat:data.coords.latitude, long:data.coords.longitude};
			// });

			// console.log(self.coords.$$state.value);
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
	function loadRestaurantById(id) {
		HomeService.getRestaurantById(id).then(function (response) {
			console.log("restaurant",response);
			self.restaurant = response;
			// self.restaurant.address = self.restaurant.address+","+
			// self.restaurant.city+","+self.restaurant.state+","+self.restaurant.area+","+
			// self.restaurant.postal_code+","+self.restaurant.country+".";
			// console.log("loc controller Response",response);
		}, function (error) {
			toastr.error("Unable to load Data. Please try again.",
				error ? error.error : "Error");
		});
	}

	/**
	* Function to book a table
	* ===========================================================================
	* This funciton will book a table.
	*
	* @return {[type]} [description]
	*/
	self.bookNow = function(){
		// Show the modal
		$uibModal.open({
			templateUrl: "./app/layout/restaurant/booking-modal.html",
			// Prevent dialog close
			backdrop: "static",
			// size: "lg",
			controller: ["$uibModalInstance", function($uibModalInstance, message){

				const vm = this;
				// Init params
				vm.title = "Please fill in following information to confirm booking";

				vm.normal=true;

				vm.success=false;

				/* Create a category */
				vm.createOrUpdate = function () {
					vm.normal=false;
					self.booking = null;
					vm.success=true;
				};


				/* Close the modal */
				vm.cancel = function () {
					$uibModalInstance.dismiss();
				};

			}],
			controllerAs: "model"
		});
	};

}

// Export the module
module.exports = {
	name : "RestaurantController", // Change this name
	fn : RestaurantController, // Change this function name
	type : "controller"
};
