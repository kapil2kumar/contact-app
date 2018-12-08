contactApp.controller('listMessageController', function($scope,$window,$http,$location,$rootScope) {
   
    
    $rootScope.content = "Welcome to Simple Contact Application | Message List";
    
    $scope.messageList =[];
    $scope.message='';
    $scope.getMessageList = function(){
        $http.get('/message-list')
        .success(function(response) {
            if (response.status == true) {
                $scope.messageList = response.data;
                
            } else {
                $scope.message = response.message;
            }
        })
        .error(function(error) {
            console.log(error);
            $scope.message = error.message;
            
        });
    };
    $scope.getMessageList();

    
});