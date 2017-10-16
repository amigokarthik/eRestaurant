"use strict";

/* Inject Dependencies */
AppConfig.$inject = ["$stateProvider", "$locationProvider", "AppConstants",
"$urlRouterProvider", "$compileProvider", "$httpProvider", "toastrConfig",
"$qProvider"];

function AppConfig($stateProvider, $locationProvider, AppConstants,
  $urlRouterProvider, $compileProvider, $httpProvider, toastrConfig,
  $qProvider) {

  // Show debug info based on environment check
  if (process.env.NODE_ENV === "production") {
    $compileProvider.debugInfoEnabled(false);
  }

$qProvider.errorOnUnhandledRejections(false);

  // Configure the application routes
  $stateProvider
  // HOME STATES AND NESTED VIEWS ==============================================
  .state("home", {
    url: "/home",
    views: {
      "main": {
        templateUrl: "./app/layout/home/home.html",
        controller: "HomeController",
        controllerAs: "model"
      }
    }
  })
  .state("city", {
    url: "/city/:city",
    views: {
      "main": {
        templateUrl: "./app/layout/city/city.html",
        controller: "CityController",
        controllerAs: "model"
      }
    }
  })
  .state("restaurant", {
    url: "/restaurant/:id",
    views: {
      "main": {
        templateUrl: "./app/layout/restaurant/restaurant.html",
        controller: "RestaurantController",
        controllerAs: "model"
      }
    }
  });

  // If any route is not found then navigate to default route
  $urlRouterProvider.otherwise("/home");

  // Configure the authentication interceptor to filter the urls and attach
  // authentication headers to it.
  // $httpProvider.interceptors.push("HttpAccessInteceptor");

  // ===========================================================================
  // Configure vendor libraries if attached
  // ===========================================================================
  angular.extend(toastrConfig, {
    closeButton: true,
    extendedTimeOut: 1000,
    timeOut: 3000,
  });
}

// Export the module
module.exports = AppConfig;
