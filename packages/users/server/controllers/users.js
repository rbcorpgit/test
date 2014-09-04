'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Validate = require('./../services/validate');

exports.checkUsername = function(req, res){
  var username = req.params.username;

  // Verificando se há erros nos parâmetros
  var result = Validate.validateUsername(username);
  if(result.err){
    return res.status(400).json(result);
  }

  User.findOne({
    username : username
  },function(err, data){
      if(err){
          res.status(400).json({
            err : true,
            param : 'username',
            flag : 'server_error'
          });
          return;
      }

      if(data){
        res.json({
          err : false,
          param : 'username',
          flag : 'username_unavailable'
        });
        return;
      }

      res.json({
        err : false,
        param : 'username',
        flag : 'username_available'
      });
      return;

  });
};

exports.checkEmail = function(req, res){
  var email = req.params.email;
  
  // Verificando se há erros nos  parâmetros
  var result = Validate.validateEmail(email);
  if(result.err){
    return res.status(400).json(result);
  }

  User.findOne({
    email : email
  },function(err, data){
      if(err){
          res.json({
              err : true,
              param : 'email',
              flag : 'server_error'
          });
          return;
      }

      if(!data){
          res.json({
              err : false,
              param : 'email',
              flag : 'email_available'
          });
          return;
      }

      res.json({
        err : false,
        param : 'email',
        flag : 'email_unavailable'
      });

  });
};

exports.register = function(req, res){
  
  var username = req.body.username;
  var email = req.body.email;
  var result ;
  //var password = req.body.password;

  // Checa se o campo username é válido
  result = Validate.validateUsername(username);
  if(result.err){
    return res.status(400).json(result);
  }

  // Checa se o campo email é válido
  result = Validate.validateEmail(email);
  if(result.err){
    return res.status(400).json(result);
  }

  var user = new User(req.body);
  user.save(function(err, user){

    if(err && (err.err.indexOf('$username') !== -1)){
      res.status(400).json({
        err : true,
        param : 'username',
        flag : 'username_unavailable'
      });
      return;
    }

    if(err && (err.err.indexOf('$email') !== -1)){
      res.status(400).json({
        err : true,
        param : 'email',
        flag : 'email_unavailable'
      });
      return;
    }

    res.json({
        err : false,
        flag : 'success',
        user : user
      });

  });
};
