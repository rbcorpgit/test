'use strict';

// User routes use users controller
var users = require('../controllers/users');

module.exports = function(MeanUser, app, auth, database, passport) {

  app.route('/users/checkusername/:username')
    .get(users.checkUsername);

  app.route('/users/checkemail/:email')
    .get(users.checkEmail);

  app.route('/users/register')
    .post(users.register);

    
};
