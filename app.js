// Twitch.init({clientId: 'gh4p8qnbrzxx1au8hnphujd0n5n34b5'}, function(error, status){

// });



angular.module('twitchApp', [])

.controller('twitchCtrl', ['$scope', '$http', function($scope, $http){

  var options = {
    width: 640,
    heigth: 360,
    channel: 'freecodecamp'
  }

  var Player = new Twitch.Player('player1', options);
  player.setVolume(0.5);

  $scope.twitchReq = function(){

    var req = {
      url: 'https://api.twitch.tv/kraken/streams/freecodecamp',
      params: {
        client_id: 'gh4p8qnbrzxx1au8hnphujd0n5n34b5'
      }
    }

    $http(req).then(function success(res){
      console.log('success: ', res.data);
    }, function error(res){
      console.log('error: ', res);
    }) 
  }
  
}]);