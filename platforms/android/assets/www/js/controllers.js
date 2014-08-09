angular.module('spartan.controllers', [])
    .controller('mainCtrl', function ($scope) {
        $scope.user = {
            auth: false,
            data: {}
        };
    })
    .controller('DashCtrl', function ($scope) {})

.controller('FriendsCtrl', function ($scope, Friends) {
    $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function ($scope, $stateParams, Friends) {
    $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function ($scope, $firebase, $firebaseSimpleLogin) {
    var ref = new Firebase("https://mtolympus.firebaseio.com/");
    var auth = $firebaseSimpleLogin(ref);

    $scope.loginWithFacebook = function () {
        auth.$login("facebook").then(function (user) {
            $scope.user.auth = true;
            angular.extend($scope.user, {
                data: user
            });
            ref.child('users').child(user.uid).set({
                displayName: user.displayName,
                provider: user.provider,
                provider_id: user.id,
                details: user.thirdPartyUserData, 
                picture: user.thirdPartyUserData.picture.data.url
            });
            console.log("Logged in as: " + user.uid);
        }, function (error) {
            $scope.user.auth = false;
            $scope.user.data = {};
            console.error("Login failed: " + error);
        });
    };


    $scope.logout = function () {
        auth.$logout();
        $scope.user.auth = false;
        $scope.user.data = {};
    };

    // create an AngularFire reference to the data
    var sync = $firebase(ref);
    // syncObject.$bindTo($scope, "data");

    // download the data into a local object
    $scope.user.data = sync.$asObject();

});