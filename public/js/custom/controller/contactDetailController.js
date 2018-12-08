contactApp.controller('contactDetailController', function($scope,$window,$http,$location,$rootScope,$timeout) {
   
    if ($window.localStorage['contentDetail']) {
        $rootScope.content = "Welcome to Simple Contact Application | Contact Detail";
        $scope.showSendMessageForm=false;
        $scope.sendMessageData={};
        $scope.sendMessageForm = function(){
            $scope.showSendMessageForm=true;
            $scope.sendMessageData={};
            var otp = Math.floor((Math.random() * 999999) + 1);
            $scope.sendMessageData.message = 'Hi. Your OTP is: '+ otp;
            $scope.sendMessageData.otp = otp;
        };

        $scope.cancleForm = function(){
            $scope.showSendMessageForm=false;
            $scope.sendMessageData={};
        };

        $scope.contentDetail = JSON.parse($window.localStorage['contentDetail']);
        
        $scope.message="";
        $scope.saveMessageToUser = function(){
            $scope.contentDetail.message = $scope.sendMessageData.message;
            $scope.contentDetail.otp = $scope.sendMessageData.otp;

            $http.post('/send-opt-message', $scope.contentDetail)
            .success(function(response) {
                if (response.status == true) {
                    $scope.message = response.message;
                    $timeout(callAtTimeout, 5*1000);
                } else {
                    $scope.message = response.message;
                    $timeout(callAtTimeout, 5*1000);
                }
            })
            .error(function(error) {
                $scope.message = error.message;
                $timeout(callAtTimeout, 5*1000);
            });    
        }
        
        function callAtTimeout() {
            $scope.message="";
            $scope.sendMessageData={};
            $scope.showSendMessageForm=false;
        }
        
    } else {
        $location.path('/'); 
    }
    
});