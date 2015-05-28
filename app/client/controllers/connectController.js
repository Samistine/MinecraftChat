/**
 * Connect Controller
 */

module.exports = function($scope, socket, servers) {

  $scope.servers = servers.get();

  $scope.select = function(id) {
    $scope.ip = servers.select(id).ip;
    $scope.port = servers.select(id).port;

    if ($scope.username.length > 0 && $scope.password.length > 0) {
      $scope.connect();
    }

  };

  // connect handler
  $scope.connect = function() {
    $('#connectModal').modal('hide');
    

    $scope.login(function() {
      if (socket.connected && $scope.accessToken != '') {
        console.log('Sending');
        console.log('ClientToken: ' + $scope.clientToken);
        console.log('AccessToken: ' + $scope.accessToken);
        console.log('To : ' + $scope.ip + $scope.port);
        socket.emit('server:connect', {
          hostname: $scope.ip,
          port: $scope.port,
          clientToken: $scope.clientToken,
          accessToken: $scope.accessToken
        });
      }
      else {
        alert('Server unreachable, please try again later...');
      }
    });

  };


  $scope.login = function(cb) {
    $scope.clientToken = 'C001D00D-5ECC-BEEF-CA4E-B00B1E54A111';
    $scope.accessToken = '';
    var superagent = require('superagent');
    var loginSrv = 'https://authserver.mojang.com';

    superagent.post(loginSrv + '/authenticate') //here
    // this piece of code is ran in the browser, not on the server. As such, it needs to abide to the request origin rules.
      .type('json')
      .send({
        'agent': {
          'name': 'Minecraft',
          'version': 1
        },
        'username': $scope.username,
        'password': $scope.password,
        'clientToken': $scope.clientToken
      })
      .set('Accept', 'application/json')
      .end(function(err, resp) {
        if (!err) {
          var session = resp.body;
          session.username = resp.body.selectedProfile.name;
          $scope.accessToken = resp.body.accessToken;
        }
        else {
          console.log('Error, Couldn\'t generate your session token');
        }
        cb();
      });
  }
};
