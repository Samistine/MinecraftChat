/**
 * Connect Controller
 */

module.exports = function($scope, socket, servers) {

  $scope.connectSam = function() {
    var clientToken = Android.getClientToken();
    var accessToken = Android.getAccessToken();
    //var hostname    = Android.getServerIP();
    //var port        = Android.getServerPort();
    socket.emit('server:connect', {
      hostname: 'samistine.com',
      port: '25565',
      clientToken: clientToken,
      accessToken: accessToken
    });
  }
};
