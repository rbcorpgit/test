'use strict';

angular.module('mean.users')
.factory('InputEmail' , ['$http',
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
						flag : 'email_empty'
					});
					return;
				}
				// Verifica se o email é válido
				if(!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(this.value)){
					callback(true, {
						err : true,
						flag : 'email_invalid'
					});
					return;
				}

				// Consulta no servidor se o usuário está disponível
				$http.get('/users/checkemail/'+this.value)
				.success(function(data){
			        //Se houver algum erro na execução
			        if(data.err){
			        	callback(true, data);
			        	return;
			        }

			        if(data.flag === 'email_unavailable'){
			        	callback(true, data);
			        	return;
			        }
			        //Se o resultado não tiver sido encontrado, seta borda none
			        callback(false);
			    })
				.error(function(data){
					callback(true, data);
				});
			};
		};
}
]);