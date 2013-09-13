'use strict';

angular.module('GuessApp')
  .factory('Rating', function () {
    // Service logic
    var ratings = {
      '100': {pass: true, rate: 'S', message: "Perfect! Now this is the score worth bragging for!"},
      '95': {pass: true, rate: 'A+', message: "Wow! This must be really easy for you."},
      '90': {pass: true, rate: 'A', message: "Wow! This must be really easy for you."},
      '85': {pass: true, rate: 'A-', message: "You've done great! Now play some more and you'll get the highest score."},
      '80': {pass: true, rate: 'B+', message: "You've done great! Now play some more and you'll get the highest score."},
      '75': {pass: true, rate: 'B', message: "Good job! Have you been to the cities that you got right?"},
      '70': {pass: true, rate: 'B-', message: "Good job! Have you been to the cities that you got right?"},
      '65': {pass: true, rate: 'C+', message: "Good enough!"},
      '60': {pass: true, rate: 'C', message: "Good enough!"},
      '55': {pass: true, rate: 'C-', message: "You've barely passed! But that's better than failing at all."},
      '50': {pass: true, rate: 'D+', message: "You've barely passed! But that's better than failing at all."},
      '45': {pass: false, rate: 'D', message: "You almost passed! Try harder next time."},
      '40': {pass: false, rate: 'D-', message: "You almost passed! Try harder next time."},
      '35': {pass: false, rate: 'E+', message: "E for Effort!"},
      '30': {pass: false, rate: 'E', message: "E for Effort!"},
      '25': {pass: false, rate: 'E-', message: "You should really try browsing Google Maps first."},
      '20': {pass: false, rate: 'F+', message: "You should really try browsing Google Maps first."},
      '15': {pass: false, rate: 'F', message: "Why did you even bother to finish the game?"},
      '10': {pass: false, rate: 'F', message: "Why did you even bother to finish the game?"},
      '0': {pass: false, rate: 'F-', message: "Why did you even bother to finish the game?"}
    };

    // Public API here
    return {
      get: function(score) {
        score = Math.floor(score || 0);
        score -= score % 5; // round to nearest 5's
        score += ''; // make it a string
        return ratings[score];
      }
    };
  });
