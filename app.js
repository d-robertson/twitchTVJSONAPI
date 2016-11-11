angular.module('twitchApp', [])

.controller('twitchCtrl', ['$scope', '$http', function($scope, $http){

  $scope.streams = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];

  $scope.fullStreams = [];

  $scope.counter = 0;

  $scope.addSearch = function(){
    $scope.streams.push($scope.search);
    $scope.search = '';

    var req = {
      url: 'https://api.twitch.tv/kraken/streams/' + $scope.streams[$scope.streams.length - 1],
      params: {
        client_id: 'gh4p8qnbrzxx1au8hnphujd0n5n34b5'
      }
    }

    var title = $scope.streams[$scope.streams.length - 1];

    $http(req).then(function success(res){
      
      var status = '';
      var img = '';

      if(res.data.stream === null){
        status = 'Offline';
        img = 'https://static-cdn.jtvnw.net/jtv_user_pictures/ratedmgl-profile_image-265b33ec1dc201e4-300x300.png'
      } else {
        status = 'Online';
        img = res.data.stream.channel.logo;
      }
      var stream = {
        streamTitle: title,
        status: status,
        data: res.data,
        img: img,
        all: 'All'
      }

      console.log('streamObj: ', stream);

      $scope.fullStreams.push(stream);

    }, function error(res){
      console.log('error: ', res);
      console.log(res.status);
      var stream = {
        streamTitle: title,
        status: 'Not Found!',
        img: 'http://static.petersplugins.com/uploads/2013/09/404page-1000x1000-300x300.png',
        all: 'All'
      }

      console.log('streamObj: ', stream);
      $scope.fullStreams.push(stream);
    });
  }

  $scope.deleteItem = function(idx){
    $scope.fullStreams.splice(idx, 1);
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
        var img = '';

        if(res.status === 200){
         
          if(res.data.stream === null){
            status = 'Offline';
            img = 'https://static-cdn.jtvnw.net/jtv_user_pictures/ratedmgl-profile_image-265b33ec1dc201e4-300x300.png'
          } else {
            status = 'Online';
            img = res.data.stream.channel.logo;
          }
          var stream = {
            streamTitle: title,
            status: status,
            data: res.data,
            img: img,
            all: 'All'
          }

          console.log('streamObj: ', stream);

          $scope.fullStreams.push(stream);
          $scope.counter += 1;
          console.log($scope.counter);
          $scope.twitchReq();

        } 
      }, function error(res){

        console.log(res.status);
        var stream = {
          streamTitle: title,
          status: 'Not Found!',
          img: 'http://static.petersplugins.com/uploads/2013/09/404page-1000x1000-300x300.png',
          all: 'All'
        }

        console.log('streamObj: ', stream);
        $scope.fullStreams.push(stream);

      }); 
    }
  }

  $scope.online = function(){
    $scope.filter = {status: 'Online'};
  }

  $scope.offline = function(){
    $scope.filter = {status: 'Offline'};
  }

  $scope.all = function(){
    $scope.filter = {all: 'All'};
  }

  $scope.twitchReq();
}]);