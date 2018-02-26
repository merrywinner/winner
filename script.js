var myApp = angular.module("myApp" , [] );
myApp.controller('myController', ['$scope' , function($scope){
  $scope.gmail = {
    username: "",
    email: ""
  };
  $scope.onGoogleLogin = function(){
    var params = {
     'clientid': '288949950778-4h5kmst65rckqpt1ea3t52nbk93jro83.apps.googleusercontent.com',
      'cookiepolicy': 'single_host_origin',
      'callback': function(result){
        if (result['status']['signed_in']){
          var request = gapi.client.plus.people.get(
           {
             'userId': 'me'
           }
          );
          request.excute(function(resp){
            $scope.$apply(function(){
              $scope.gmail.username = resp.displayName;
              $scope.gmail.email = resp.emails[0].value;
            });
          });
        }
      },
      'approvalprompt':'force',
      'scope':'https:://www.googleapis.com/auth/plus.login https:://www.googleapis.com/auth/plus.profile.emails.read '
    };
    gapi.auth.signIn(params);
  }
  
} ]);
