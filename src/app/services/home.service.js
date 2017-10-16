"use strict";

/* Inject Dependencies */
HomeService.$inject = ["$http", "$q", "AppConstants"];

/**
 * Service to manage all dummy operations
 * =============================================================================
 *
 * @param {{type}} $http        [description]
 * @param {[type]} $q           [description]
 * @param {[type]} AppConstants [description]
 * @param {[type]} FormUtils    [description]
 * @param {[type]} SessionService    [description]
 */
function HomeService($http, $q, AppConstants){

    // Service instance variable
    const INSTANCE = {};

    /**
     * Get contexts by id
     * =========================================================================
     * @return {[type]} [description]
     */
    INSTANCE.getLocationByLatLng = function(lat,lng){
        const deferred = $q.defer();
        const latLngUrl = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lng;
        $http.get(latLngUrl).then(function(response, status, headers, config) {
            deferred.resolve(response.data);
            // console.log("loc Response",response.data.results[0].address_components);
        }).catch(
        function(data, status, headers, config){
            deferred.reject(data);
        });
        // return your promise to the user
        return deferred.promise;
    };

    /**
     * Get all cities
     * =========================================================================
     * @return {[type]} [description]
     */
    INSTANCE.getAllCities = function(){
        const deferred = $q.defer();
        const cityUrl = "http://opentable.herokuapp.com/api/cities";
        $http.get(cityUrl).then(function(response, status, headers, config) {
            deferred.resolve(response.data);
            // console.log("loc Response",response.data.results[0].address_components);
        }).catch(
        function(data, status, headers, config){
            deferred.reject(data);
        });
        // return your promise to the user
        return deferred.promise;
    };

    /**
     * Get all countries
     * =========================================================================
     * @return {[type]} [description]
     */
    INSTANCE.getAllCountries = function(){
        const deferred = $q.defer();
        const cityUrl = "http://opentable.herokuapp.com/api/countries";
        $http.get(cityUrl).then(function(response, status, headers, config) {
            deferred.resolve(response.data);
            // console.log("loc Response",response.data.results[0].address_components);
        }).catch(
        function(data, status, headers, config){
            deferred.reject(data);
        });
        // return your promise to the user
        return deferred.promise;
    };

    /**
     * Get all countries
     * =========================================================================
     * @return {[type]} [description]
     */
    INSTANCE.getRestaurantsBasedOnCity = function(city){
        const deferred = $q.defer();
        const retaurantListUrl = "http://opentable.herokuapp.com/api/restaurants?city="+city;
        $http.get(retaurantListUrl).then(function(response, status, headers, config) {
            deferred.resolve(response.data);
            // console.log("loc Response",response.data.results[0].address_components);
        }).catch(
        function(data, status, headers, config){
            deferred.reject(data);
        });
        // return your promise to the user
        return deferred.promise;
    };

    /**
     * Get restaurant by id
     * =========================================================================
     * @return {[type]} [description]
     */
    INSTANCE.getRestaurantById = function(id){
        const deferred = $q.defer();
        const retaurantUrl = "http://opentable.herokuapp.com/api/restaurants/"+id;
        $http.get(retaurantUrl).then(function(response, status, headers, config) {
            deferred.resolve(response.data);
            // console.log("loc Response",response.data.results[0].address_components);
        }).catch(
        function(data, status, headers, config){
            deferred.reject(data);
        });
        // return your promise to the user
        return deferred.promise;
    };


    /** functions exposed by the service **/
    return INSTANCE;
}

// Export the module
module.exports = {
  name : "HomeService", // Change this name
  fn : HomeService // Change this function name
};
