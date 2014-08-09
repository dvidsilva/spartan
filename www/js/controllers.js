angular.module('spartan.controllers', [])
    .controller('mainCtrl', function ($scope) {
        var already;
        $scope.user = {
            auth: false,
            data: {}
        };
        already = localStorage['data.user'];
        if(already !== void 0 && already !== ''){
            $scope.user = JSON.parse(already);
        }
    })
    .controller('DashCtrl', function ($scope) {})

.controller('FriendsCtrl', function ($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function ($scope, $firebase, $firebaseSimpleLogin) {
    var ref, auth;
    ref = new Firebase("https://mtolympus.firebaseio.com/");
    auth = $firebaseSimpleLogin(ref);

    $scope.loginWithFacebook = function () {
        auth.$login("facebook").then(function (user) {
            $scope.user.auth = true;
            user.picture = user.thirdPartyUserData.picture.data.url
            angular.extend($scope.user, {
                data: user
            });
            ref.child('users').child(user.uid).set({
                displayName: user.displayName,
                provider: user.provider,
                provider_id: user.id,
                details: user.thirdPartyUserData, 
                picture: user.picture
            });
            localStorage['data.user'] = JSON.stringify(angular.copy($scope.user));
        }, function (error) {
            $scope.user.auth = false;
            $scope.user.data = {};
            localStorage['data.user'] = '';
        });
    };


    $scope.logout = function () {
        auth.$logout();
        $scope.user.auth = false;
        $scope.user.data = {};
        localStorage['data.user'] = '';
    };

    // create an AngularFire reference to the data
    // var sync = $firebase(ref);
    // syncObject.$bindTo($scope, "data");

    // download the data into a local object
    // $scope.user.data = sync.$asObject();

})
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});