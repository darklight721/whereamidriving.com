'use strict';

angular.module('GuessApp')
  .directive('map', function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      scope: { onposchanged: '&', position: '@' },
      link: function postLink(scope, element, attrs) {
        var streetView = new google.maps.StreetViewPanorama(element[0], {
          addressControl: false,
          linksControl: false,
          panControl: false,
          zoomControl: false,
          enableCloseButton: false
        });

        scope.$watch('position', function(position) {
          google.maps.event.clearInstanceListeners(streetView);
          if (!position) return;

          position = JSON.parse(position);
          streetView.setPosition(new google.maps.LatLng(position.lat, position.lng));

          if (position.pov) {
            streetView.setPov({
              heading: position.pov,
              pitch: 0
            });
          }

          var originalPos = null;
          google.maps.event.addListener(streetView, 'position_changed', function() {
            var position = streetView.getPosition();
            if (!originalPos) {
              originalPos = position;
            }
            else if (!originalPos.equals(position)) {
              scope.$apply(function(){ scope.onposchanged() });
            }
          });
        });
      }
    };
  });
