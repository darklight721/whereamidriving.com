'use strict';

angular.module('GuessApp')
  .directive('map', function () {
    return {
      template: '<div id="map-canvas"></div>',
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
          if (!position) return;

          position = JSON.parse(position);
          var originalPos = new google.maps.LatLng(position.lat, position.lng);
          streetView.setPosition(originalPos);

          if (position.pov) {
            var pov = streetView.getPov();
            pov.heading = position.pov;
            streetView.setPov(pov);
          }

          google.maps.event.addListener(streetView, 'position_changed', function() {
            if (originalPos.equals(streetView.getPosition())) return;
            scope.$apply(function(){ scope.onposchanged() });
          });
        });

        scope.$on('$destroy', function() {
          google.maps.event.clearInstanceListeners(streetView);
        });
      }
    };
  });
