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

          var position = JSON.parse(position),
              latlng = new google.maps.LatLng(position.lat, position.lng);

          streetView.setPosition(latlng);
          google.maps.event.addListener(streetView, 'position_changed', function() {
            if (latlng.equals(streetView.getPosition())) return;
            scope.$apply(function(){ scope.onposchanged() });
          });
        });

        scope.$on('$destroy', function() {
          google.maps.event.clearInstanceListeners(streetView);
        });
      }
    };
  });
