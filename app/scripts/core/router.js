(function () {
    'use strict';

    angular.module('ariaNg').config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/downloading', {
                templateUrl: 'scripts/controllers/list.html',
                controller: 'DownloadListController'
            })
            .when('/waiting', {
                templateUrl: 'scripts/controllers/list.html',
                controller: 'DownloadListController'
            })
            .when('/stopped', {
                templateUrl: 'scripts/controllers/list.html',
                controller: 'DownloadListController'
            })
            .when('/new', {
                templateUrl: 'scripts/controllers/new.html',
                controller: 'NewTaskController'
            })
            .when('/new/:url', {
                template: '',
                controller: 'CommandController'
            })
            .when('/task/detail/:gid', {
                templateUrl: 'scripts/controllers/task-detail.html',
                controller: 'TaskDetailController'
            })
            .when('/settings/ariang', {
                // templateUrl: 'scripts/controllers/settings-ariang.html',
                controller: 'AriaNgSettingsController'
            })
            .when('/settings/ariang/:extendType', {
                templateUrl: 'scripts/controllers/settings-ariang.html',
                controller: 'AriaNgSettingsController'
            })
            .when('/settings/aria2/basic', {
                templateUrl: 'scripts/controllers/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/http-ftp-sftp', {
                templateUrl: 'scripts/controllers/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/http', {
                templateUrl: 'scripts/controllers/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/ftp-sftp', {
                templateUrl: 'scripts/controllers/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/bt', {
                templateUrl: 'scripts/controllers/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/metalink', {
                templateUrl: 'scripts/controllers/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/rpc', {
                templateUrl: 'scripts/controllers/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/aria2/advanced', {
                templateUrl: 'scripts/controllers/settings-aria2.html',
                controller: 'Aria2SettingsController'
            })
            .when('/settings/rpc/set', {
                template: '',
                controller: 'CommandController'
            })
            .when('/settings/rpc/set/:protocol/:host/:port/:interface/:secret?', {
                template: '',
                controller: 'CommandController'
            })
            .when('/debug', {
                templateUrl: 'scripts/controllers/debug.html',
                controller: 'AriaNgDebugController'
            })
            .when('/status', {
                templateUrl: 'scripts/controllers/status.html',
                controller: 'Aria2StatusController'
            })
            .otherwise({
                redirectTo: '/downloading'
            });
    }]);
}());
