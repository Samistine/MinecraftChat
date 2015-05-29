module.exports = function() {

  var connected = 'connected';

  createjs.Sound.registerSound('https://minecraftchat-samistine.c9.io/sounds/connected.mp3', connected);

  return {
    connected: function() {
      createjs.Sound.play(connected);
    }
  };

};
