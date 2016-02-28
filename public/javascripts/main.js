var wikiApp = angular.module('wikiApp', []);

function mainController($scope, $http) {
  // $scope.formData = {};
  $scope.show = false; 

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

  $scope.newWiki = function(wiki){ 
    $http.post('/api/createNew', wiki)
      .sucess(function(stuff){ 
        console.log("stuff", stuff); 
      })
      .error(function(err){ 
        console.log("There has been an error making a new wiki. problem thrown in front end", err); 
      })

  }
}

//http://jsfiddle.net/timriley/GVCP2/
