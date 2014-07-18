ng-click-interceptor
====================

Angular directive to intercept the ng-click handler. Whenever you, as a developer, have no control over the
ng-click functions that are added to an HTML element and you want to be able to cancel that function,
add the ui-disabled directive to the element and the ng-click function will only be fired when $scope.disabledState
equals false.

Obviously change to your needs. $scope.disabledState is only here for demo purposes.

```html
<button ui-disabled="disabledState" ng-click="go()">Test button</button>
```

# Example
See the live example on plnkr:
http://embed.plnkr.co/eNxXMm15Amj9dPMswLdA/preview
