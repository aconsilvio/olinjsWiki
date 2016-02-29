var wikiApp = angular.module('wikiApp', []);

function mainController($scope, $http) {
  $scope.newWiki = {};
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

  $scope.newWiki = function(){ 
    console.log("are you in here (in new wiki)??")
    $scope.show = false; 
    console.log("about to post")
    $http.post('/api/createNew', {header: $scope.newWiki.header, content: $scope.newWiki.content})
      .success(function(data){ 
        $scope.newWiki = {}; 
        console.log("Success", data)
      })
      .error(function(data){ 
        console.log("Failure", data)
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
