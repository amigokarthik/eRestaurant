"use strict";

/* Inject Dependencies */
datePicker.$inject = ["$timeout"];

/**
* Directive to display date picker
* ==============================================================================
* This directive is used to show date dropdown menu.
*
* @return {[type]}         [description]
*/
function datePicker($timeout) {
  return {
    restrict: "EAC", // It is an attribute
    require: "?ngModel", // It uses ng-model binding
    scope: {
      ngModel: "="
    },
    link: function(scope, elem, attrs) {
      scope.$watch(scope.ngModel, function() {
        // Get the value from the binding
        elem.val(scope.ngModel);

        // Initialize the countries with the desired options
        return elem.datepicker({
          format: "yyyy-mm-dd",
          todayHighlight : true,
          orientation : "auto bottom",
          // Close the calendar popup when a date is selected
          autoclose: true
        });
      });

    }
  };
}

// Export the module
module.exports = {
  name : "datePicker",
  fn : datePicker,
  type : "directive"
};
