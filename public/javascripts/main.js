var wikiApp = angular.module('wikiApp', []);

function mainController($scope, $http) {
  // $scope.formData = {};
  $scope.show = false; 

  $http.get('api/home')
    .success(function(data){
      console.log(data);
      $scope.wiki = data;
      console.log("b;ahohdo", $scope.wiki)
    })
    .error(function(data){
      console.log('Error:' + data);
    });

  $scope.home = function(){
    $http.post('api/home')
      .success(function(data){
        // $scope.formData = {};
        $scope.wiki = data;
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

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

// function filterController($scope, $http){
//     $scope.wiki = $http.get('api/')
//     .success(function(data){
//       $scope.wiki = data;
//       return $scope.wiki
//     })
//     .error(function(data){
//       console.log('Error:' + data);
//     });

//     $scope.header = $scope.wiki.header;
//     $scope.content = $scope.wiki.content;
//     $scope.editorEnabled = false;
      
//     $scope.enableEditor = function() {
//         $scope.editorEnabled = true;
//         $scope.editableHeader = $scope.wiki.header;
//         $scope.editableContent = $scope.wiki.content;
//     };
      
//     $scope.disableEditor = function() {
//         $scope.editorEnabled = false;
//     };
      
//     $scope.save = function(header) {
//         $scope.wiki.content = $scope.editableContent;
//         $scope.wiki.header = $scope.editableHeader;
//         $scope.disableEditor();
//         $http.post('/api/' + header, {content:$scope.wiki.content})
//           .success(function(data){
//             console.log('saved correctly')

//           })
//           .error(function(data){
//           console.log('Error:' + data);
//         });
//     };

// }
//http://jsfiddle.net/timriley/GVCP2/
