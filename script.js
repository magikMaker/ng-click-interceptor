/**
 * This intercepts an ng-click
 */
angular.module('app', []);

/**
 * The controller is only here for demo purposes
 */
angular.module('app').controller('AppController', function($scope) {
    $scope.disabledState = true;

    /**
     * For demo purposes to toggle the disabled state
     */
    $scope.toggle = function(){
        $scope.disabledState = !$scope.disabledState;
    };

    /**
     * Example ng-click function that will be intercepted
     */
    $scope.go = function(){
        alert('navigating to...');
    };
});

/**
 * @ngdoc       directive
 * @name        magik.ng-click-interceptor
 * @restrict    A
 * @description With this directive it's possible to intercept an ng-click function that you, as a developer
 *              do not have control over.
 */
angular.module('app').directive('uiDisabled', function () {
    return {
        priority: 1,
        restrict: 'A',
        terminal: true,
        link: function (scope, element, attr) {
            var clickAction = attr.ngClick;
            attr.ngClick = null;

            scope.$watch('disabledState', function(value) {

                /*
                 // Just one element
                 element
                     .prop('disabled', !!value)
                     .toggleClass('ui-disabled', scope.disabledState);
                 */

                // also set disabled state for any nested elements
                var elements = [element[0]],
                    children = element.children();

                if(children && children.length > 0){
                    angular.forEach(children, function(value, key) {
                        elements.push(value);
                    });
                }

                angular
                    .element(elements)
                    .prop('disabled', !!value)
                    .toggleClass('ui-disabled', scope.disabledState);

            });

            element.bind('click',function (e) {

                if(true === scope.disabledState) {
                    e.preventDefault();
                } else {
                    scope.$eval(clickAction);
                }
            });
        }
    };
});