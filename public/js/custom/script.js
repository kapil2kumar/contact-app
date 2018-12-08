var contactApp = angular.module('contactApp', ['ngRoute']);

contactApp.config(function($routeProvider) {
$routeProvider
    // route for the home page
    .when('/', {
        templateUrl : 'home.html',
        controller  : 'homeController',
        title: 'Contact App',
        heading: 'Contact List'
    })
    .when('/contact-detail/:id', {
        templateUrl : 'contact-detail.html',
        controller  : 'contactDetailController',
        title: 'Contact App',
        heading: 'Contact Detail'
    })
    .when('/list-message', {
        templateUrl : 'list-message.html',
        controller  : 'listMessageController',
        title: 'Contact App',
        heading: 'Mesage List'
    })
    .otherwise({redirectTo:'/'});
});

contactApp.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
        $rootScope.heading = current.$$route.heading;
    });
}]);








  
