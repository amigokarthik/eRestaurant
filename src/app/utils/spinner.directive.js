"use strict";

/* Inject Dependencies */
spinner.$inject = ["$http"];

/**
* Directive to display ajax loading
* ==============================================================================
* This directive is used to show loading spinner on the page. It will block the
* page until all the rquests completes loading.
*
* @param  {[type]} $window [description]
* @return {[type]}         [description]
*/
function spinner($http) {
    return {
        // Make this component restrict to attribute alone
        restrict: "A",
        // link a callback function to the directive
        link: function (scope, elm, attrs) {
            // Attach a parameter to the scope
            scope.isLoading = function () {
                // $http.pendingRequests.filter(function(request){
                //   if (request.url.indexOf("viewFile") > -1){
                //     console.log(request.url.indexOf("viewFile"));
                //     return false;
                //   }
                // });
                return $http.pendingRequests.length > 0;
            };

            // Watch for loading parameter status
            scope.$watch(scope.isLoading, function (status) {
                if (status) {
                    elm.show();
                } else {
                    elm.hide();
                }
            });
        }
    };
}


// Export the module
// module.exports = spinner;
module.exports = {
    name: "spinner",
    fn: spinner,
    type: "directive"
};
