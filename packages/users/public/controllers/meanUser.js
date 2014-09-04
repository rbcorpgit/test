'use strict';
angular.module('mean.users')
.controller('RegisterCtrl', ['$scope', '$rootScope', '$http', '$location','$timeout','InputUsername','InputEmail','InputPassword',
  function($scope, $rootScope, $http, $location, $timeout, InputUsername, InputEmail, InputPassword) {
      // This object will be filled by the form
      $scope.user = {};
      $scope.messageAlert = 'Insira suas informações';

      var iUsername = new InputUsername();
      var iEmail = new InputEmail();
      var iPassword = new InputPassword();
      var timeInterval = 500;

      var messagesError = {
        'server_error' : 'Houve algum erro no servidor',
        'username_empty' : 'Campo username está vazio',
        'username_invalid' : 'Insira um username válido',
        'username_number_characters' : 'O username precisa ter de 5 a 20 caracteres',
        'username_unavailable' : 'Nome de usuário já está sendo usado',
        'email_empty' : 'Campo e-mail está vazio',
        'email_invalid' : 'Insira um e-mail válido',
        'email_unavailable' : 'Endereço de e-mail já está sendo usado',
        'password_empty' : 'Campo password está vazio',
        'password_number_characters' : 'O password precisa ter de 5 a 20 caracteres',
        'password_invalid' : 'Insira um password válido'

      };

      var checkAndSetErrorOnAlert = function(errs){
        var flag ;
        if(iUsername.getError()){
          flag = iUsername.getError().flag;
          $scope.messageAlert = messagesError[flag];
          return;
        }

        if(iEmail.getError()){
          flag = iEmail.getError().flag;
          $scope.messageAlert = messagesError[flag];
          return;
        }

        if(iPassword.getError()){
          flag = iPassword.getError().flag;
          $scope.messageAlert = messagesError[flag];
          return;
        }

        $scope.messageAlert = 'Continue com o cadastro';
      };

      // ----------------------------- USERNAME

      // Criando variável forda do escopo watch para ser capturada
      // em um futuro laço do evento watch.
      var usernameInterval;

      // Faz uma validação 500 ms depois de o usuário parar de digitar
      $scope.$watch('user.username',function(newValue, oldValue){
        if(newValue === oldValue) return;

        // Limpa o tempo do timeout
        $timeout.cancel(usernameInterval);

        // Seta o novo valor de username
        var username =  $scope.user.username || '';
        iUsername.setValue(username);

        // Validando username chamando callback
        usernameInterval = $timeout(function(){
          
          iUsername.validate(function(err, data){
            // Verifica se houve erros durante a validação
            if(err){
              iUsername.setError(data);
              iUsername.setIsValid(false);
              $scope.usernameColorBorder = 'borderRed';
            }else{
              iUsername.setError(false);
              iUsername.setIsValid(true);
              $scope.usernameColorBorder = 'borderNone';
            }

            // Percore os inputs e verifica se há algum erro
            // caso haja, mostra para o usuário
            checkAndSetErrorOnAlert();

          });
          
        },timeInterval);

      });


      // ----------------------------- EMAIL

      // Criando variável forda do escopo watch para ser capturada
      // em um futuro laço do evento watch.
      var emailInterval;

      // Faz uma validação 500 ms depois de o usuário parar de digitar
      $scope.$watch('user.email',function(newValue, oldValue){
        if(newValue === oldValue) return;

        // Limpa o tempo do timeout
        $timeout.cancel(emailInterval);

        // Seta o novo valor de email
        var email =  $scope.user.email || '';
        iEmail.setValue(email);

        // Validando username chamando callback
        emailInterval = $timeout(function(){

          iEmail.validate(function(err, data){
            // Verifica se houve erros durante a validação
            if(err){
              iEmail.setError(data);
              iEmail.setIsValid(false);
              $scope.emailColorBorder = 'borderRed';
            }else{
              iEmail.setError(false);
              iEmail.setIsValid(true);
              $scope.emailColorBorder = 'borderNone';
            }

            // Percore os inputs e verifica se há algum erro
            // caso haja, mostra para o usuário
            checkAndSetErrorOnAlert();

          });

        },timeInterval);

      });


      // ----------------------------- PASSWORD

      // Criando variável forda do escopo watch para ser capturada
      // em um futuro laço do evento watch.
      var passwordInterval;

      // Faz uma validação 500 ms depois de o usuário parar de digitar
      $scope.$watch('user.password',function(newValue, oldValue){
        if(newValue === oldValue) return;

        // Limpa o tempo do timeout
        $timeout.cancel(passwordInterval);

        // Seta o novo valor de email
        var password =  $scope.user.password || '';
        iPassword.setValue(password);

        // Validando username chamando callback
        passwordInterval = $timeout(function(){

          iPassword.validate(function(err, data){
            // Verifica se houve erros durante a validação
            if(err){
              iPassword.setError(data);
              iPassword.setIsValid(false);
              $scope.passwordColorBorder = 'borderRed';
            }else{
              iPassword.setError(false);
              iPassword.setIsValid(true);
              $scope.passwordColorBorder = 'borderNone';
            }

            // Percore os inputs e verifica se há algum erro
            // caso haja, mostra para o usuário
            checkAndSetErrorOnAlert();

          });
        
        },timeInterval);

      });


      // Registra cliente no banco de dados
      $scope.registerClient = function(){

        // Verifica se todo o formulário está validado
        if(!iUsername.getIsValid() ||  !iEmail.getIsValid() ||  !iPassword.getIsValid() ){
          return;
        }

        // faz requisição no servidor passando os valores dos inputs
        $http.post('/users/register',{
          username : iUsername.getValue(),
          email : iEmail.getValue(),
          password : iPassword.getValue()
        })
        // Esperando dados de resposta
        // Success represnta que os dados foram salvos com sucesso
        .success(function(data){
          console.log('succss');
        })

        // Se Houver erro, verifica de que campo é o erro, e mostra ao
        // usuário
        .error(function(data){
          if(data.err && data.param === 'username'){
            iUsername.setError(data);
            iUsername.setIsValid(false);
            $scope.usernameColorBorder = 'borderRed';
            checkAndSetErrorOnAlert();
            return;
          }

          if(data.err && data.param === 'email'){
            iEmail.setError(data);
            iEmail.setIsValid(false);
            $scope.emailColorBorder = 'borderRed';
            checkAndSetErrorOnAlert();
            return;
          }

        }); 

      };

    }]);
