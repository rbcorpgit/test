'use strict';

angular.module('mean.users')
.factory('InputUsername' , ['$http',
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
				// Verifica se o username está vazio
				if(this.value.length === 0){
					callback(true, {
						err : true,
						flag : 'username_empty'
					});
					return;
				}
				// Verifica se o username é válido
				if(this.value.length < 5 || this.value.length > 20){
					callback(true, {
						err : true,
						flag : 'username_number_characters'
					});
					return;
				}

				// verificando se o username é válido
				if(!/^[a-z0-9_-]{5,20}$/.test(this.value)){
					callback(true,{
						err : true,
						flag : 'username_invalid'
					});
					return;
				}

				// Consulta no servidor se o usuário está disponível
				$http.get('/users/checkusername/'+this.value)
				.success(function(data){
			        //Se houver algum erro na execução
			        if(data.err){
			        	callback(true, data);
			        	return;
			        }

			        if(data.flag === 'username_unavailable'){
			        	callback(true, data);
			        	return;
			        }
			        //Se o resultado não tiver sido encontrado, seta borda none
			        callback(false);
			    })
				.error(function(err){
					callback(true, err);

				});
			};
		};
}
]);