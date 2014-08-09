angular.module('spartan.controllers', [])
  .controller('mainCtrl', function ($scope, $state) {
    var already;
    $scope.$state = $state;
    $scope.user = {
      auth: false,
      data: {}
    };
    already = localStorage['data.user'];
    if (already !== void 0 && already !== '') {
      $scope.user = JSON.parse(already);
    }
  })


.controller('LoginCtrl', function ($scope, $firebase, $state, $firebaseSimpleLogin) {
  var ref, auth;
  ref = new Firebase("https://mtolympus.firebaseio.com/");
  auth = $firebaseSimpleLogin(ref);

  $scope.loginWithFacebook = function () {
    auth.$login("facebook").then(function (user) {
      $scope.user.auth = true;
      user.picture = "http://graph.facebook.com/" + user.id + "/picture?type=large";
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


  // Chambonada //
  // Demo by http://creative-punch.net

  var items = document.querySelectorAll('.circle a');

  for (var i = 0, l = items.length; i < l; i++) {
    items[i].style.left = (50 - 35 * Math.cos(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";

    items[i].style.top = (50 + 35 * Math.sin(-0.5 * Math.PI - 2 * (1 / l) * i * Math.PI)).toFixed(4) + "%";
  }

  document.querySelector('.menu-button').onclick = function (e) {
    e.preventDefault();
    document.querySelector('.circle').classList.toggle('open');
  }


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
  .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {


  })

.controller('PlaylistsCtrl', function ($scope) {
  $scope.playlists = [
    {
      title: 'Reggae',
      id: 1
        },
    {
      title: 'Chill',
      id: 2
        },
    {
      title: 'Dubstep',
      id: 3
        },
    {
      title: 'Indie',
      id: 4
        },
    {
      title: 'Rap',
      id: 5
        },
    {
      title: 'Cowbell',
      id: 6
        }
  ];
})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});