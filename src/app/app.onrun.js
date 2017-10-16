"use strict";

/* Inject Dependencies */
onRunConfig.$inject = ["$rootScope", "$state", "toastr"];

/**
 * Application on run configurations
 * =============================================================================
 * Define all application run configurations. Here we are checking the user
 * authentication state when moving across different routes.
 *
 * @param  {[type]} $rootScope [description]
 * @param  {[type]} $state     [description]
 * @param  {[type]} toastr     [description]
 * @return {[type]}            [description]
 */
function onRunConfig($rootScope, $state, toastr) {

  // Assign $state to be used on pages. This is mainly used for showing and
  // hiding pages pased on the state.
  $rootScope.$state = $state;
  $rootScope.parseInt = parseInt;

  // ===========================================================================
  //  Check the sate when the state transition starts
  // ===========================================================================
  $rootScope.$on("$stateChangeStart", function (event, toState, toParams,
    fromState, fromParams) {

    // Parameter - 3
    // If a redirectTo property is present, then redirect to the url defined
    if (toState.redirectTo) {
      event.preventDefault();
      $state.go(toState.redirectTo, toParams);
    }

  });

  // ===========================================================================
  // State to check the errors whern state url canges
  // ===========================================================================
  $rootScope.$on("$stateChangeError", function (event, toState, toParams,
    fromState, fromParams, error) {
    event.preventDefault();

    // Show error messages
    toastr.error("Unable to load the requested page. Please try again.",
      error ? error.error : "Error");

    // Redirect to old page
    $state.go(fromState.redirectTo, fromParams);
  });

}

// Export the module
module.exports = onRunConfig;
