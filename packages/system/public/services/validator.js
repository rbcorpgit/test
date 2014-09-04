'use strict';

//Global service for global variables
angular.module('mean.system').factory('Validator', [
  function(){
    return {
      checkUsername : function(username){
        username = username || '';
        return (username.length < 4) ? false : true;
      }
    };
  }
]);
