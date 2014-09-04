'use strict';

exports.validateUsername = function(username){
	username = username  || '';
	// Testa tamanho do username
	if(username.length < 5 || username.length > 20){
		return {
			err : true,
			param : 'username',
			flag : 'username_number_characters'
		};
	}

	// verificando se o username é válido
	if(!/^[a-z0-9_-]{5,20}$/.test(username)){
		return {
			err : true,
			param : 'username',
			flag : 'username_invalid'
		};
	}
	// retorna resposta de que o username é válido
	return {
		err : false,
		param : 'username',
		flag : 'username_valid'
	};

};

exports.validateEmail = function(email){
	email = email  || '';
	
	// Verifica se o email é válido
	if(!/^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(email)){
		return {
			err : true,
			flag : 'email_invalid'
		};
	}
	// retorna resposta de que o username é válido
	return {
		err : false,
		param : 'email',
		flag : 'email_valid'
	};

};