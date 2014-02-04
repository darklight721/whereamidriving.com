'use strict';

describe('Filter: exclude', function () {

  // load the filter's module
  beforeEach(module('whereAmIdrivingApp'));

  // initialize a new instance of the filter before each test
  var exclude;
  beforeEach(inject(function ($filter) {
    exclude = $filter('exclude');
  }));

  it('should return the input prefixed with "exclude filter:"', function () {
    var text = 'angularjs';
    expect(exclude(text)).toBe('exclude filter: ' + text);
  });

});
