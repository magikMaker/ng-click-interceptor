/**
 * This intercepts an ng-click
 */
angular.module('app', []);
angular.module('app').controller('AppController', function($scope) {
    $scope.disabledState = true;

    $scope.toggle = function(){
        $scope.disabledState = !$scope.disabledState;
    };
    
    $scope.go = function(){
        alert('navigating to...');
    };
});

angular.module('app').directive('uiDisabled', function () {
    return {
        priority: 1,
        restrict: 'A',
        terminal: true,
        link: function (scope, element, attr) {
            var clickAction = attr.ngClick;
            attr.ngClick = null;
            
            scope.$watch('disabledState', function(value) {
                element
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