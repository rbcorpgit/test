'use strict';

angular.module('mean.users')
.factory('InputPassword' , ['$http',
	function($http){
		return function(){
			// Atributos
			this.value = '';
			this.err = false;
			this.isValid = false;

			// Métodos

			this.setError = function(err){
				this.err = err;
			};

			this.getError = function(){
				return this.err;
			};	

			this.setValue = function(value){
				this.value = value;
			};

			this.getValue = function(){
				return this.value;
			};

			this.setIsValid = function(value){
				this.isValid = value;
			};

			this.getIsValid = function(){
				return this.isValid;
			};



			this.validate = function(callback){
				// Verifica se o email está vazio
				if(this.value.length === 0){
					callback(true, {
						err : true,
						flag : 'password_empty'
					});
					return;
				}
				// Verifica se o email é válido
				if(this.value.length < 5){
					callback(true, {
						err : true,
						flag : 'password_number_characters'
					});
					return;
				}

				if(!/^[a-z1-9]{5,20}$/.test(this.value)){
					callback(true, {
						err : true,
						flag : 'password_invalid'
					});
					return;
				}

				callback(false);
			};
		};
}]);