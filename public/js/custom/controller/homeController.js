contactApp.controller('homeController', function($scope,$window,$http,$location,$rootScope) {
   
    
    $rootScope.content = "Welcome to Simple Contact Application | Contact List";
    
    $scope.showAdd=false;
    $scope.contact={};
    $scope.contactList = [];
    $scope.message = "";
    $scope.showAddForm = function (){
        $scope.showAdd=true;
        $scope.contact={};
    };

    $scope.cancleAddForm = function(){
        $scope.showAdd=false;
        $scope.contact={};
    };
    $scope.getContactList = function(){
        $http.get('/contact-list')
        .success(function(response) {
            if (response.status == true) {
                $scope.contactList = response.data;
            } else {
                $scope.message = response.message;
            }
        })
        .error(function(error) {
            console.log(error);
            $scope.message = error.message;
            
        });
    };
    $scope.getContactList();

    $scope.saveContact = function(){
        $scope.contact.mobileEx="+91";
        $scope.contactList.push($scope.contact);
        $scope.showAdd=false;
        $scope.contact={};
    };

    $scope.setMessageData = function(index){
        $window.localStorage.removeItem('contentDetail');
        $window.localStorage['contentDetail'] = JSON.stringify($scope.contactList[index]);
        $location.path('/contact-detail/'+index);
        return false;
    }

    
});