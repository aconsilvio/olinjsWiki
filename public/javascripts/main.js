var angulartoDo = angular.module('angulartoDo', []);

function mainController($scope, $http) {
  $scope.formData = {};

  $http.get('api/')
    .success(function(data){
      $scope.toDos = data;
    })
    .error(function(data){
      console.log('Error:' + data);
    });

  $scope.home = function(){
    $http.post('api/', $scope.formData)
      .success(function(data){
        $scope.formData = {};
        $scope.toDos = data;
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

}

//http://jsfiddle.net/timriley/GVCP2/
