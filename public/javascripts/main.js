var wikiApp = angular.module('wikiApp', []);

function mainController($scope, $http) {
  // $scope.formData = {};

  $http.get('api/')
    .success(function(data){
      $scope.wiki = data;
      console.log($scope.wiki)
    })
    .error(function(data){
      console.log('Error:' + data);
    });

  // $scope.home = function(){
  //   $http.post('api/', $scope.formData)
  //     .success(function(data){
  //       // $scope.formData = {};
  //       $scope.toDos = data;
  //     })
  //     .error(function(data){
  //       console.log('Error:' + data);
  //     });
  // };

  $scope.newWiki = function(){ 
    $scope.wiki.header = {}; 
    $scope.wiki.content = {}; 
  }
}

//http://jsfiddle.net/timriley/GVCP2/
