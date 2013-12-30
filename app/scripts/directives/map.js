'use strict';

angular.module('whereAmIdrivingApp')
  .directive('map', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      scope: { onposchanged: '&', position: '@' },
      link: function postLink(scope, element) {
        var streetView = null;
        scope.$watch('position', function(position) {
          if (!position) return;
          position = JSON.parse(position);

          if (streetView) google.maps.event.clearInstanceListeners(streetView);
          element.empty();

          streetView = new google.maps.StreetViewPanorama(element[0], {
            addressControl: false,
            linksControl: false,
            panControl: false,
            zoomControl: false,
            enableCloseButton: false,
            position: new google.maps.LatLng(position.lat, position.lng),
            pov: { heading: position.pov, pitch: 0 }
          });

          var originalPos = null;
          google.maps.event.addListener(streetView, 'position_changed', function() {
            var position = streetView.getPosition();
            if (!originalPos) {
              originalPos = position;
            }
            else if (!originalPos.equals(position)) {
              scope.$apply(function(){ scope.onposchanged(); });
            }
          });
        });
      }
    };
  });
