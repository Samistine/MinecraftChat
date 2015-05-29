module.exports = function($scope, socket) {

  $scope.players = [];

  // request player list every 5000ms
  setInterval(function() {
    socket.emit('players');
  }, 5000);


  // when the player list is received
  socket.on('bot:players', function(data) {
    var players = [];

    for (var player in data) {
      if (player.substring(0, 8) != '0000tab#') {
        players.push(player);
      }
    }

    $scope.$apply(function() {
      $scope.players = players;
    });

  });

  // clear player list if socket is disconnected
  socket.on('disconnect', function() {
    $scope.$apply(function() {
      $scope.players = [];
    });
  });

  // clear player list when bot disconnects
  socket.on('bot:disconnect', function() {
    $scope.$apply(function() {
      $scope.players = [];
    });
  });

};
