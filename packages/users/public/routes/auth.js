'use strict';

//Setting up route
angular.module('mean.users').config(['$stateProvider',
  function($stateProvider) {

    // states for my app
    $stateProvider
      .state('register', {
        url: '/register',
        templateUrl: 'users/views/register.html'
      });
  }
]);
