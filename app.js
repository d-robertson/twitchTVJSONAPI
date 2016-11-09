// Twitch.init({clientId: 'gh4p8qnbrzxx1au8hnphujd0n5n34b5'}, function(error, status){

// });



angular.module('twitchApp', [])

.controller('twitchCtrl', ['$scope', '$http', function($scope, $http){

  // var options = {
  //   width: 640,
  //   heigth: 360,
  //   channel: 'freecodecamp'
  // }

  // var Player = new Twitch.Player('player1', options);
  // player.setVolume(0.5);
  $scope.streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  $scope.fullStreams = [];

  $scope.counter = 0;

  $scope.addSearch = function(){
    $scope.streams.push($scope.search);
    $scope.search = '';
  }

  $scope.twitchReq = function(){
    if($scope.streams.length - 1 >= $scope.counter){
      var req = {
        url: 'https://api.twitch.tv/kraken/streams/' + $scope.streams[$scope.counter],
        params: {
          client_id: 'gh4p8qnbrzxx1au8hnphujd0n5n34b5'
        }
      }
       var title = $scope.streams[$scope.counter];
       console.log('set: ',title);
      // console.log(req);

      $http(req).then(function success(res){

        // console.log('success: ', res.data);
        console.log('in http: ', title);
        var status = '';

        if(res.data.stream === null){
          status = 'Offline';
        } else {
          status = 'Online';
        }

        var stream = {
          streamTitle: title,
          status: status,
          data: res.data
        }

        console.log('streamObj: ', stream);

        $scope.fullStreams.push(stream);
        $scope.counter += 1;
        console.log($scope.counter);
        $scope.twitchReq();
         
      }, function error(res){

        console.log('error: ', res);

      }); 
    }
    console.log('fullStreams: ', fullStreams);
  }
}]);