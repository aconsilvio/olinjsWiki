var wikiApp = angular.module('wikiApp', []);

function mainController($scope, $http) {
  $scope.showNewWiki = false; 

  //load front page with database information
  $http.get('api/home')
    .success(function(data){
      $scope.wiki = data;
    })
    .error(function(data){
      console.log('Error:' + data);
    });


  $scope.selectWiki = function(header){
  //loads content and header for a specific database entry based on link

    //hides the new wiki form & resets the current entry into newWiki
    $scope.showNewWiki = false; 
    $scope.newWiki = {};

    //get request to database to get object specified by header
    $http.get('api/header/'+header)
      .success(function(data){
        //enters object data into index.html mainWiki content
        $scope.mainWiki = data;
        $scope.header = $scope.mainWiki.header;
        $scope.content = $scope.mainWiki.content;

        //sets content editor to false
        $scope.editorEnabled = false;
      })
      .error(function(data){
        console.log('Error:' + data);
      });
  };

  $scope.saveNewWiki = function(){ 
  //saves new wiki to database
    //hides new wiki form
    $scope.showNewWiki = false;

    //posts new wiki content to database
    $http.post('/api/createNew', {header: $scope.newWiki.header, content: $scope.newWiki.content})
      .success(function(data){ 
        $scope.newWiki = data.newWiki;
        $scope.wiki = data.all;
      })
      .error(function(data){ 
        console.log("Failure", data)
      })

  }
  
  //shows new wiki form
  $scope.enableShowNewWiki = function(){ 
    $scope.showNewWiki = true; 
  }

  //shows editor for main wiki header & content
  $scope.enableEditor = function() {
    $scope.editorEnabled = true;
    $scope.editableHeader = $scope.mainWiki.header;
    $scope.editableContent = $scope.mainWiki.content;
  };
  
  //hides main wiki header & content editor
  $scope.disableEditor = function() {
    $scope.editorEnabled = false;
  };
   
  //save edited wiki to database    
  $scope.save = function(header) {
    //hides new wiki form
    $scope.showNewWiki = false; 

    //sets main wiki content to content in edit form
    $scope.mainWiki.content = $scope.editableContent;
    $scope.mainWiki.header = $scope.editableHeader;

    //disables main wiki editor
    $scope.disableEditor();

    //posts new content to database
    $http.post('/api/header/' + header, {header: $scope.mainWiki.header, content:$scope.mainWiki.content})
      .success(function(data){
        $scope.wiki = data.all;
      })
      .error(function(data){
      console.log('Error:' + data);
    });
  };

  $scope.search = function(){
    //searched database for a specific query in search form
    $scope.searchQuery = angular.copy($scope.query)
    $scope.selectWiki($scope.searchQuery);
  }

}