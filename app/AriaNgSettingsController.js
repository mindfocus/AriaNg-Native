"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriaNgSettingsController = void 0;
var core_1 = require("@angular/core");
var ariaNgTitleService_1 = require("./ariaNgTitleService");
var ariaNgNativeElectronService_1 = require("./ariaNgNativeElectronService");
var ariaNgLanguages_1 = require("./ariaNgLanguages");
var ariaNgCommonService_1 = require("./ariaNgCommonService");
var ariaNgSettingService_1 = require("./ariaNgSettingService");
var AriaNgSettingsController = /** @class */ (function () {
    function AriaNgSettingsController(ariaNgTitleService, ariaNgMonitorService, ariaNgNativeElectronService, ariaNgCommonService, ariaNgFileService, ariaNgSettingService) {
        this.ariaNgTitleService = ariaNgTitleService;
        this.ariaNgMonitorService = ariaNgMonitorService;
        this.ariaNgNativeElectronService = ariaNgNativeElectronService;
        this.ariaNgCommonService = ariaNgCommonService;
        this.ariaNgFileService = ariaNgFileService;
        this.ariaNgSettingService = ariaNgSettingService;
        this.currentTab = 'global';
        this.isCurrentLatestVersion = false;
        this.languages = ariaNgLanguages_1.AriaNgLanguages;
        this.trueFalseOptions = [{ name: 'Enabled', value: true }, { name: 'Disabled', value: false }];
        this.showRpcSecret = false;
        this.exportSettingsCopied = false;
        this.ariaNgNativeVersion = this.ariaNgNativeElectronService.getVersion();
        this.ariaNgVersion = this.ariaNgNativeElectronService.getAriaNgVersion();
        this.runtimeEnvironment = this.ariaNgNativeElectronService.getRuntimeEnvironment();
        this.availableTime = this.ariaNgCommonService.getTimeOptions([1000, 2000, 3000, 5000, 10000, 30000, 60000], true);
        this.isInsecureProtocolDisabled = this.ariaNgSettingService.isInsecureProtocolDisabled();
        this.settings = this.ariaNgSettingService.getAllOptions();
        this.sessionSettings = this.ariaNgSettingService.getAllSessionOptions();
        this.rpcSettings = this.ariaNgSettingService.getAllRpcSettings();
        this.isSupportBlob = this.ariaNgFileService.isSupportBlob();
        this.isSupportDarkMode = this.ariaNgSettingService.isBrowserSupportDarkMode();
        this.showDebugMode = this.sessionSettings.debugMode || extendType === 'debug';
        this.nativeSettings = this.getNativeSettings();
        this.titlePreview = this.getFinalTitle();
    }
    // var extendType = $routeParams.extendType;
    // var lastRefreshPageNotification = null;
    AriaNgSettingsController.prototype.getFinalTitle = function () {
        return this.ariaNgTitleService.getFinalTitleByGlobalStat({
            globalStat: this.ariaNgMonitorService.getCurrentGlobalStat(),
            currentRpcProfile: this.getCurrentRPCProfile()
        });
    };
    AriaNgSettingsController.prototype.getCurrentRPCProfile = function () {
        if (!context || !rpcSettings || rpcSettings.length < 1) {
            return null;
        }
        for (var i = 0; i < rpcSettings.length; i++) {
            var rpcSetting = rpcSettings[i];
            if (rpcSetting.isDefault) {
                return rpcSetting;
            }
        }
        return null;
    };
    AriaNgSettingsController.prototype.getNativeSettings = function () {
        var originalConfig = ariaNgNativeElectronService.getNativeConfig();
        var config = {};
        config.defaultPosition = originalConfig.defaultPosition || 'last-position';
        if (!originalConfig.minimizedToTray) {
            config.afterMainWindowClosed = 'exit-application';
        }
        else {
            config.afterMainWindowClosed = 'minimize-to-tray';
        }
        return config;
    };
    AriaNgSettingsController.prototype.setNeedRefreshPage = function () {
        if (this.lastRefreshPageNotification) {
            return;
        }
        this.lastRefreshPageNotification = this.ariaNgLocalizationService.notifyInPage('', 'Configuration has been modified, please reload the page for the changes to take effect.', {
            delay: false,
            type: 'info',
            templateUrl: 'views/notification-reloadable.html',
            onClose: function () {
                this.lastRefreshPageNotification = null;
            }
        });
    };
    ;
    AriaNgSettingsController.prototype.changeGlobalTab = function () {
        this.currentTab = 'global';
    };
    ;
    AriaNgSettingsController.prototype.isCurrentGlobalTab = function () {
        return this.currentTab === 'global';
    };
    ;
    AriaNgSettingsController.prototype.changeRpcTab = function (rpcIndex) {
        currentTab = 'rpc' + rpcIndex;
    };
    ;
    AriaNgSettingsController.prototype.isCurrentRpcTab = function (rpcIndex) {
        return currentTab === 'rpc' + rpcIndex;
    };
    ;
    AriaNgSettingsController.prototype.getCurrentRpcTabIndex = function () {
        if (isCurrentGlobalTab()) {
            return -1;
        }
        return parseInt(currentTab.substring(3));
    };
    ;
    AriaNgSettingsController.prototype.checkUpdate = function () {
        return this.ariaNgVersionService.getTheLatestVersion()
            .then(function onSuccess(response) {
            if (!response || !response.data || !response.data.tag_name) {
                this.ariaNgLogService.warn('[AriaNgSettingsController.checkUpdate] data format of latest version is invalid', response);
                this.ariaNgLocalizationService.showError('Failed to get latest version!');
                return;
            }
            var latestVersion = response.data.tag_name;
            if (this.ariaNgVersionService.compareVersion(this.ariaNgNativeVersion, latestVersion) >= 0) {
                this.ariaNgLocalizationService.showInfo('Check Update', 'You have installed the latest version!');
                this.isCurrentLatestVersion = true;
            }
            else {
                this.ariaNgNativeElectronService.openProjectReleaseLink();
            }
        }).catch(function onError(response) {
            this.ariaNgLogService.error('[AriaNgSettingsController.checkUpdate] failed to get latest version', response);
            this.ariaNgLocalizationService.showError('Failed to get latest version!');
        });
    };
    ;
    AriaNgSettingsController.prototype.updateTitlePreview = function () {
        this.titlePreview = this.getFinalTitle();
    };
    ;
    // $rootScope.swipeActions.extendLeftSwipe() {
    //     var tabIndex = -1;
    //
    //     if (!isCurrentGlobalTab()) {
    //         tabIndex = parseInt(getCurrentRpcTabIndex());
    //     }
    //
    //     if (tabIndex < rpcSettings.length - 1) {
    //         changeRpcTab(tabIndex + 1);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };
    // $rootScope.swipeActions.extendRightSwipe() {
    //     var tabIndex = -1;
    //
    //     if (!isCurrentGlobalTab()) {
    //         tabIndex = parseInt(getCurrentRpcTabIndex());
    //     }
    //
    //     if (tabIndex > 0) {
    //         changeRpcTab(tabIndex - 1);
    //         return true;
    //     } else if (tabIndex === 0) {
    //         changeGlobalTab();
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };
    AriaNgSettingsController.prototype.isSupportNotification = function () {
        return this.ariaNgNotificationService.isSupportBrowserNotification() &&
            ariaNgSettingService.isCurrentRpcUseWebSocket(settings.protocol);
    };
    ;
    AriaNgSettingsController.prototype.setLanguage = function (value) {
        if (this.ariaNgSettingService.setLanguage(value)) {
            this.ariaNgLocalizationService.applyLanguage(value);
        }
        this.updateTitlePreview();
    };
    ;
    AriaNgSettingsController.prototype.setTheme = function (value) {
        this.ariaNgSettingService.setTheme(value);
        // $rootScope.setTheme(value);
    };
    ;
    AriaNgSettingsController.prototype.setDebugMode = function (value) {
        this.ariaNgSettingService.setDebugMode(value);
    };
    ;
    AriaNgSettingsController.prototype.setTitle = function (value) {
        this.ariaNgSettingService.setTitle(value);
    };
    ;
    AriaNgSettingsController.prototype.setEnableBrowserNotification = function (value) {
        this.ariaNgSettingService.setBrowserNotification(value);
        if (value && !this.ariaNgNotificationService.hasBrowserPermission()) {
            this.ariaNgNotificationService.requestBrowserPermission(function (result) {
                if (!result.granted) {
                    this.settings.browserNotification = false;
                    this.ariaNgLocalizationService.showError('You have disabled notification in your browser. You should change your browser\'s settings before you enable this function.');
                }
            });
        }
    };
    ;
    AriaNgSettingsController.prototype.setTitleRefreshInterval = function (value) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.setTitleRefreshInterval(value);
    };
    ;
    AriaNgSettingsController.prototype.setGlobalStatRefreshInterval = function (value) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.setGlobalStatRefreshInterval(value);
    };
    ;
    AriaNgSettingsController.prototype.setDownloadTaskRefreshInterval = function (value) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.setDownloadTaskRefreshInterval(value);
    };
    ;
    AriaNgSettingsController.prototype.setRPCListDisplayOrder = function (value) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.setRPCListDisplayOrder(value);
    };
    ;
    AriaNgSettingsController.prototype.setSwipeGesture = function (value) {
        this.ariaNgSettingService.setSwipeGesture(value);
    };
    ;
    AriaNgSettingsController.prototype.setDragAndDropTasks = function (value) {
        this.ariaNgSettingService.setDragAndDropTasks(value);
    };
    ;
    AriaNgSettingsController.prototype.setAfterCreatingNewTask = function (value) {
        this.ariaNgSettingService.setAfterCreatingNewTask(value);
    };
    ;
    AriaNgSettingsController.prototype.setRemoveOldTaskAfterRetrying = function (value) {
        this.ariaNgSettingService.setRemoveOldTaskAfterRetrying(value);
    };
    ;
    AriaNgSettingsController.prototype.setConfirmTaskRemoval = function (value) {
        this.ariaNgSettingService.setConfirmTaskRemoval(value);
    };
    ;
    AriaNgSettingsController.prototype.setIncludePrefixWhenCopyingFromTaskDetails = function (value) {
        this.ariaNgSettingService.setIncludePrefixWhenCopyingFromTaskDetails(value);
    };
    ;
    AriaNgSettingsController.prototype.setAfterRetryingTask = function (value) {
        this.ariaNgSettingService.setAfterRetryingTask(value);
    };
    ;
    AriaNgSettingsController.prototype.setDefaultPosition = function (value) {
        this.ariaNgNativeElectronService.setDefaultPosition(value);
    };
    AriaNgSettingsController.prototype.setAfterMainWindowClosed = function (value) {
        if (value === 'minimize-to-tray') {
            this.ariaNgNativeElectronService.setMinimizedToTray(true);
        }
        else if (value === 'exit-application') {
            this.ariaNgNativeElectronService.setMinimizedToTray(false);
        }
    };
    ;
    AriaNgSettingsController.prototype.showImportSettingsModal = function () {
        this.importSettings = null;
        angular.element('#import-settings-modal').modal();
    };
    ;
    // $('#import-settings-modal').on('hide.bs.modal', function (e) {
    //     importSettings = null;
    // });
    AriaNgSettingsController.prototype.openAriaNgConfigFile = function () {
        this.ariaNgFileService.openFileContent({
            scope: $scope,
            fileFilter: '.json',
            fileType: 'text'
        }, function (result) {
            this.importSettings = result.content;
        }, function (error) {
            this.ariaNgLocalizationService.showError(error);
        }, angular.element('#import-file-holder'));
    };
    ;
    AriaNgSettingsController.prototype.importSettings = function (settings) {
        var settingsObj = null;
        try {
            settingsObj = JSON.parse(settings);
        }
        catch (e) {
            this.ariaNgLogService.error('[AriaNgSettingsController.importSettings] parse settings json error', e);
            this.ariaNgLocalizationService.showError('Invalid settings data format!');
            return;
        }
        if (!angular.isObject(settingsObj) || angular.isArray(settingsObj)) {
            this.ariaNgLogService.error('[AriaNgSettingsController.importSettings] settings json is not object');
            this.ariaNgLocalizationService.showError('Invalid settings data format!');
            return;
        }
        if (settingsObj) {
            ariaNgLocalizationService.confirm('Confirm Import', 'Are you sure you want to import all settings?', 'warning', function () {
                ariaNgSettingService.importAllOptions(settingsObj);
                window.location.reload();
            });
        }
    };
    ;
    AriaNgSettingsController.prototype.showExportSettingsModal = function () {
        this.exportSettings = $filter('json')(this.ariaNgSettingService.exportAllOptions());
        this.exportSettingsCopied = false;
        angular.element('#export-settings-modal').modal();
    };
    ;
    // $('#export-settings-modal').on('hide.bs.modal', function (e) {
    //     exportSettings = null;
    //     exportSettingsCopied = false;
    // });
    AriaNgSettingsController.prototype.copyExportSettings = function () {
        this.clipboard.copyText(this.exportSettings, {
            container: angular.element('#export-settings-modal')[0]
        });
        this.exportSettingsCopied = true;
    };
    ;
    AriaNgSettingsController.prototype.addNewRpcSetting = function () {
        this.setNeedRefreshPage();
        var newRpcSetting = this.ariaNgSettingService.addNewRpcSetting();
        this.rpcSettings.push(newRpcSetting);
        this.changeRpcTab(this.rpcSettings.length - 1);
    };
    ;
    AriaNgSettingsController.prototype.updateRpcSetting = function (setting, field) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.updateRpcSetting(setting, field);
    };
    ;
    AriaNgSettingsController.prototype.removeRpcSetting = function (setting) {
        var rpcName = (setting.rpcAlias ? setting.rpcAlias : setting.rpcHost + ':' + setting.rpcPort);
        this.ariaNgLocalizationService.confirm('Confirm Remove', 'Are you sure you want to remove rpc setting "{{rpcName}}"?', 'warning', function () {
            this.setNeedRefreshPage();
            var currentIndex = this.getCurrentRpcTabIndex();
            var index = this.rpcSettings.indexOf(setting);
            this.ariaNgSettingService.removeRpcSetting(setting);
            this.rpcSettings.splice(index, 1);
            if (currentIndex >= this.rpcSettings.length) {
                this.changeRpcTab(rpcSettings.length - 1);
            }
            else if (currentIndex <= 0 || currentIndex <= index) {
                ; // Do Nothing
            }
            else { // currentIndex > index
                this.changeRpcTab(currentIndex - 1);
            }
        }, false, {
            textParams: {
                rpcName: rpcName
            }
        });
    };
    ;
    AriaNgSettingsController.prototype.setDefaultRpcSetting = function (setting) {
        if (setting.isDefault) {
            return;
        }
        this.ariaNgSettingService.setDefaultRpcSetting(setting);
        window.location.reload();
    };
    ;
    AriaNgSettingsController.prototype.resetSettings = function () {
        this.ariaNgLocalizationService.confirm('Confirm Reset', 'Are you sure you want to reset all settings?', 'warning', function () {
            this.ariaNgSettingService.resetSettings();
            window.location.reload();
        });
    };
    ;
    AriaNgSettingsController.prototype.clearHistory = function () {
        this.ariaNgLocalizationService.confirm('Confirm Clear', 'Are you sure you want to clear all settings history?', 'warning', function () {
            this.aria2SettingService.clearSettingsHistorys();
            window.location.reload();
        });
    };
    ;
    AriaNgSettingsController.prototype.reloadApp = function () {
        this.ariaNgNativeElectronService.reload();
    };
    var _a, _b;
    AriaNgSettingsController = __decorate([
        core_1.Component({
            selector: 'AriaNg-SettingsController',
            template: "\n        <section class=\"content no-padding\">\n    <div class=\"nav-tabs-custom\">\n        <ul class=\"nav nav-tabs\">\n            <li [ngStyle]=\"{'active': isCurrentGlobalTab()}\">\n                <a class=\"pointer-cursor\" (click)=\"changeGlobalTab()\" translate>Global</a>\n            </li>\n            <li class=\"nav-tab-title-rpcname\" *ngFor=\"let setting of rpcSettings; index as i\" [ngStyle]=\"{'active': isCurrentRpcTab(i)}\">\n                <a class=\"pointer-cursor\" (click)=\"changeRpcTab(i)\">\n                    <span class=\"nav-tab-rpcname\" [(ngModel)]=\"'RPC' + (setting.rpcAlias || setting.rpcHost ? ' (' + (setting.rpcAlias ? setting.rpcAlias : setting.rpcHost + ':' + setting.rpcPort) + ')' : '')\" title=\"{{(setting.rpcAlias ? setting.rpcAlias : setting.rpcHost + ':' + setting.rpcPort)}}\">RPC</span>\n                </a>\n                <a class=\"pointer-cursor nav-tab-close\" ng-if=\"!setting.isDefault\" title=\"{{'Delete RPC Setting' | translate}}\">\n                    <i class=\"fa fa-times\" (click)=\"removeRpcSetting(setting)\"></i>\n                </a>\n            </li>\n            <li class=\"slim\">\n                <a class=\"pointer-cursor\" (click)=\"addNewRpcSetting()\" title=\"{{'Add New RPC Setting' | translate}}\">\n                    <i class=\"fa fa-plus\"></i>\n                </a>\n            </li>\n        </ul>\n        <div class=\"tab-content no-padding\">\n            <div class=\"tab-pane\" [ngStyle]=\"{'active': isCurrentGlobalTab()}\">\n                <div class=\"settings-table striped hoverable\">\n                    <div class=\"row\" ng-if=\"ariaNgVersion\">\n                        <div class=\"setting-key col-sm-4\">\n                            <span translate>AriaNg Version</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <span ng-bind=\"'AriaNg Native ' + ariaNgNativeVersion + ' (AriaNg ' + ariaNgVersion + ')'\"></span>\n                            <button class=\"btn btn-xs btn-default\" (click)=\"checkUpdate()\" [disabled]=\"isCurrentLatestVersion\" promise-btn>\n                                <span ng-bind=\"(isCurrentLatestVersion ? 'Latest Version' : 'Check Update') | translate\" translate>Check Update</span>\n                            </button>\n                        </div>\n                    </div>\n                    <div class=\"row\" ng-if=\"runtimeEnvironment\">\n                        <div class=\"setting-key col-sm-4\">\n                            <span translate>Runtime Environment</span>\n                            <i class=\"icon-expand pointer-cursor fa\" ng-if=\"runtimeEnvironment.length > 1\"\n                               [ngStyle]=\"{'fa-plus': runtimeEnvironmentCollapsed, 'fa-minus': !runtimeEnvironmentCollapsed}\"\n                               (click)=\"runtimeEnvironmentCollapsed = !runtimeEnvironmentCollapsed\"\n                               title=\"{{(runtimeEnvironmentCollapsed ? 'Expand' : 'Collapse') | translate}}\"></i>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <span class=\"multi-line auto-ellipsis\" ng-bind=\"item.name + ': ' + item.value\"\n                                  ng-repeat=\"item in runtimeEnvironment | limitTo: (runtimeEnvironmentCollapsed ? 1 : task.runtimeEnvironment.length)\"></span>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Language</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.language\"\n                                    ng-options=\"type as (((('languages.' + language.name) | translate) !== ('languages.' + language.name) ? (('languages.' + language.name) | translate) : language.name) + ' (' + language.displayName + ')') for (type, language) in languages\"\n                                    ng-change=\"setLanguage(settings.language)\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Theme</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.theme\"\n                                    ng-change=\"setTheme(settings.theme)\">\n                                <option value=\"light\" translate>Light</option>\n                                <option value=\"dark\" translate>Dark</option>\n                                <option ng-if=\"isSupportDarkMode\" value=\"system\" translate>Follow system settings</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Page Title</span>\n                            <i class=\"icon-primary fa fa-question-circle\" data-toggle=\"popover\"\n                               data-trigger=\"hover\" data-placement=\"auto right\" data-container=\"body\" data-html=\"true\"\n                               data-content=\"{{('Supported Placeholder' | translate) + ':<br/>' +\n                               ('AriaNg Title' | translate) + ': " + title + "<br/>' +\n                               ('Current RPC Alias' | translate) + ': " + rpcprofile + "<br/>' +\n                               ('Downloading Count' | translate) + ': " + downloading + "<br/>' +\n                                ('Waiting Count' | translate) + ': " + waiting + "<br/>' +\n                                ('Stopped Count' | translate) + ': " + stopped + "<br/>' +\n                                ('Download Speed' | translate) + ': " + downspeed + "<br/>' +\n                                ('Upload Speed' | translate) + ': " + upspeed + "<br/><br/>' +\n                                ('Tips: You can use the &quot;noprefix&quot; tag to ignore the prefix, &quot;nosuffix&quot; tag to ignore the suffix, and &quot;scale=n&quot; tag to set the decimal precision.' | translate) + '<br/>' +\n                                ('Example: ${downspeed:noprefix:nosuffix:scale=1}' | translate)}}\"></i>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <input class=\"form-control\" type=\"text\" ng-model=\"settings.title\"\n                                   ng-change=\"setTitle(settings.title); updateTitlePreview()\"/>\n                            <em>[<span translate>Preview</span>] <span ng-bind=\"titlePreview\"></span></em>\n                        </div>\n                    </div>\n                    <div class=\"row\" ng-if=\"isSupportNotification()\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Enable Browser Notification</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\"\n                                    ng-model=\"settings.browserNotification\"\n                                    ng-change=\"setEnableBrowserNotification(settings.browserNotification)\"\n                                    ng-options=\"option.value as (option.name | translate) for option in trueFalseOptions\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Updating Page Title Interval</span>\n                            <span class=\"asterisk\">*</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\"\n                                    ng-model=\"settings.titleRefreshInterval\"\n                                    ng-change=\"setTitleRefreshInterval(settings.titleRefreshInterval)\"\n                                    ng-options=\"time.optionValue as (time.name | translate: {value: time.value}) for time in availableTime\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Updating Global Stat Interval</span>\n                            <span class=\"asterisk\">*</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\"\n                                    ng-model=\"settings.globalStatRefreshInterval\"\n                                    ng-change=\"setGlobalStatRefreshInterval(settings.globalStatRefreshInterval)\"\n                                    ng-options=\"time.optionValue as (time.name | translate: {value: time.value}) for time in availableTime\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Updating Task Information Interval</span>\n                            <span class=\"asterisk\">*</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\"\n                                    ng-model=\"settings.downloadTaskRefreshInterval\"\n                                    ng-change=\"setDownloadTaskRefreshInterval(settings.downloadTaskRefreshInterval)\"\n                                    ng-options=\"time.optionValue as (time.name | translate: {value: time.value}) for time in availableTime\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Swipe Gesture</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.swipeGesture\"\n                                    ng-change=\"setSwipeGesture(settings.swipeGesture)\"\n                                    ng-options=\"option.value as (option.name | translate) for option in trueFalseOptions\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Change Tasks Order by Drag-and-drop</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.dragAndDropTasks\"\n                                    ng-change=\"setDragAndDropTasks(settings.dragAndDropTasks)\"\n                                    ng-options=\"option.value as (option.name | translate) for option in trueFalseOptions\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>RPC List Display Order</span>\n                            <span class=\"asterisk\">*</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.rpcListDisplayOrder\"\n                                    ng-change=\"setRPCListDisplayOrder(settings.rpcListDisplayOrder)\">\n                                <option value=\"recentlyUsed\" translate>Recently Used</option>\n                                <option value=\"rpcAlias\" translate>RPC Alias</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Action After Creating New Tasks</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.afterCreatingNewTask\"\n                                    ng-change=\"setAfterCreatingNewTask(settings.afterCreatingNewTask)\">\n                                <option value=\"task-list\" translate>Navigate to Task List Page</option>\n                                <option value=\"task-detail\" translate>Navigate to Task Detail Page</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Action After Retrying Task</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.afterRetryingTask\"\n                                    ng-change=\"setAfterRetryingTask(settings.afterRetryingTask)\">\n                                <option value=\"task-list-downloading\" translate>Navigate to Downloading Tasks Page</option>\n                                <option value=\"task-detail\" translate>Navigate to Task Detail Page</option>\n                                <option value=\"stay-on-current\" translate>Stay on Current Page</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Remove Old Tasks After Retrying</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.removeOldTaskAfterRetrying\"\n                                    ng-change=\"setRemoveOldTaskAfterRetrying(settings.removeOldTaskAfterRetrying)\"\n                                    ng-options=\"option.value as (option.name | translate) for option in trueFalseOptions\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Confirm Task Removal</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.confirmTaskRemoval\"\n                                    ng-change=\"setConfirmTaskRemoval(settings.confirmTaskRemoval)\"\n                                    ng-options=\"option.value as (option.name | translate) for option in trueFalseOptions\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Include Prefix When Copying From Task Details</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"settings.includePrefixWhenCopyingFromTaskDetails\"\n                                    ng-change=\"setIncludePrefixWhenCopyingFromTaskDetails(settings.includePrefixWhenCopyingFromTaskDetails)\"\n                                    ng-options=\"option.value as (option.name | translate) for option in trueFalseOptions\">\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Default Window Position</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"nativeSettings.defaultPosition\"\n                                    ng-change=\"setDefaultPosition(nativeSettings.defaultPosition)\">\n                                <option value=\"last-position\" translate>Last Position</option>\n                                <option value=\"screen-center\" translate>Screen Center</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Action After Main Window Closed</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"nativeSettings.afterMainWindowClosed\"\n                                    ng-change=\"setAfterMainWindowClosed(nativeSettings.afterMainWindowClosed)\">\n                                <option value=\"minimize-to-tray\" translate>Minimize to Tray</option>\n                                <option value=\"exit-application\" translate>Exit Application</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Import / Export AriaNg Settings</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <button class=\"btn btn-sm btn-default\" (click)=\"showImportSettingsModal()\">\n                                <span translate>Import Settings</span>\n                            </button>\n                            <button class=\"btn btn-sm btn-default\" (click)=\"showExportSettingsModal()\">\n                                <span translate>Export Settings</span>\n                            </button>\n                        </div>\n                    </div>\n                    <div class=\"row tip no-background no-hover\">\n                        <span class=\"asterisk\">*</span>\n                        <span translate>Changes to the settings take effect after refreshing page.</span>\n                        <button class=\"btn btn-xs btn-default\" (click)=\"resetSettings()\">\n                            <span translate>Reset Settings</span>\n                        </button>\n                        <button class=\"btn btn-xs btn-default\" (click)=\"clearHistory()\">\n                            <span translate>Clear Settings History</span>\n                        </button>\n                        <button class=\"btn btn-xs btn-default\" (click)=\"reloadApp()\">\n                            <span translate>Reload AriaNg Native</span>\n                        </button>\n                    </div>\n                </div>\n            </div>\n            <div class=\"tab-pane\" ng-repeat=\"setting in rpcSettings\" [ngStyle]=\"{'active': isCurrentRpcTab($index)}\">\n                <div class=\"settings-table striped hoverable\">\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Aria2 RPC Alias</span>\n                            <span class=\"asterisk\">*</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <input class=\"form-control\" type=\"text\" ng-placeholder=\"(setting.rpcHost ? setting.rpcHost + ':' + setting.rpcPort : '')\" ng-model=\"setting.rpcAlias\" ng-change=\"updateRpcSetting(setting, 'rpcAlias')\"/>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Aria2 RPC Address</span>\n                            <span class=\"asterisk\">*</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <div class=\"input-group input-group-multiple\">\n                                <span class=\"input-group-addon\" ng-bind=\"setting.protocol + '://'\"></span>\n                                <input class=\"form-control\" type=\"text\" ng-model=\"setting.rpcHost\" ng-change=\"updateRpcSetting(setting, 'rpcHost')\"/>\n                                <span class=\"input-group-addon\">:</span>\n                                <div class=\"input-group-addon-container\">\n                                    <input class=\"form-control form-control-rpcport\" type=\"text\" ng-model=\"setting.rpcPort\" ng-change=\"updateRpcSetting(setting, 'rpcPort')\"/>\n                                </div>\n                                <span class=\"input-group-addon\">/</span>\n                                <div class=\"input-group-addon-container\">\n                                    <input class=\"form-control form-control-rpcinterface\" type=\"text\" ng-model=\"setting.rpcInterface\" ng-change=\"updateRpcSetting(setting, 'rpcInterface')\"/>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Aria2 RPC Protocol</span>\n                            <span class=\"asterisk\">*</span>\n                            <i class=\"icon-primary fa fa-question-circle\" ng-tooltip-container=\"body\" ng-tooltip-placement=\"top\"\n                               ng-tooltip=\"{{'Http and WebSocket would be disabled when accessing AriaNg via Https.' | translate}}\"></i>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"setting.protocol\" ng-change=\"updateRpcSetting(setting, 'protocol')\">\n                                <option value=\"http\" ng-disabled=\"::(isInsecureProtocolDisabled)\" ng-bind=\"('Http' + (isInsecureProtocolDisabled ? ' (Disabled)' : '')) | translate\">Http</option>\n                                <option value=\"https\" translate>Https</option>\n                                <option value=\"ws\" ng-disabled=\"::(isInsecureProtocolDisabled)\" ng-bind=\"('WebSocket' + (isInsecureProtocolDisabled ? ' (Disabled)' : '')) | translate\">WebSocket</option>\n                                <option value=\"wss\" translate>WebSocket (Security)</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\" ng-if=\"setting.protocol === 'http' || setting.protocol === 'https'\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Aria2 RPC Http Request Method</span>\n                            <span class=\"asterisk\">*</span>\n                            <i class=\"icon-primary fa fa-question-circle\" ng-tooltip-container=\"body\" ng-tooltip-placement=\"top\"\n                               ng-tooltip=\"{{'POST method only supports aria2 v1.15.2 and above.' | translate}}\"></i>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <select class=\"form-control\" style=\"width: 100%;\" ng-model=\"setting.httpMethod\" ng-change=\"updateRpcSetting(setting, 'httpMethod')\">\n                                <option value=\"POST\" translate>POST</option>\n                                <option value=\"GET\" translate>GET</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"row\">\n                        <div class=\"setting-key setting-key-without-desc col-sm-4\">\n                            <span translate>Aria2 RPC Secret Token</span>\n                            <span class=\"asterisk\">*</span>\n                        </div>\n                        <div class=\"setting-value col-sm-8\">\n                            <div class=\"input-group\">\n                                <input class=\"form-control\" type=\"{{showRpcSecret ? 'text' : 'password'}}\" ng-model=\"setting.secret\" ng-change=\"updateRpcSetting(setting, 'secret')\"/>\n                                <span class=\"input-group-addon input-group-addon-compact no-vertical-padding\">\n                                    <button class=\"btn btn-xs btn-default\" title=\"{{showRpcSecret ? 'Hide Secret' : 'Show Secret' | translate}}\"\n                                            [ngStyle]=\"{'active': showRpcSecret}\" (click)=\"showRpcSecret = !showRpcSecret\">\n                                        <i class=\"fa fa-eye\"></i>\n                                    </button>\n                                </span>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"row tip no-background no-hover\">\n                        <span class=\"asterisk\">*</span>\n                        <span translate>Changes to the settings take effect after refreshing page.</span>\n                        <button class=\"btn btn-xs btn-default\" ng-disabled=\"setting.isDefault\" (click)=\"setDefaultRpcSetting(setting)\">\n                            <span translate>Activate</span>\n                        </button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div id=\"import-settings-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n        <div class=\"modal-dialog modal-lg\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\">\n                        <span translate>Import Settings</span>\n                        <small>\n                            <a class=\"pointer-cursor\" title=\"{{'Open' | translate}}\" (click)=\"openAriaNgConfigFile()\">\n                                <i class=\"icon-primary fa fa-folder-open-o\"></i>\n                            </a>\n                        </small>\n                    </h4>\n                </div>\n                <div class=\"modal-body no-padding\">\n                    <div class=\"settings-table striped\">\n                        <input id=\"import-file-holder\" type=\"file\" style=\"display: none\"/>\n                        <textarea class=\"form-control\" ng-model=\"importSettings\" rows=\"20\"\n                                  ng-placeholder=\"'AriaNg settings data' | translate\"></textarea>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-primary\" ng-disabled=\"!importSettings || !importSettings.length\"\n                            (click)=\"importSettings(importSettings)\" translate>Import</button>\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" translate>Cancel</button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div id=\"export-settings-modal\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\">\n        <div class=\"modal-dialog modal-lg\" role=\"document\">\n            <div class=\"modal-content\">\n                <div class=\"modal-header\">\n                    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n                    <h4 class=\"modal-title\">\n                        <span translate>Export Settings</span>\n                        <small>\n                            <a class=\"pointer-cursor\" title=\"{{'Save' | translate}}\" ng-if=\"isSupportBlob\"\n                               ng-blob-download=\"exportSettings\" ng-file-name=\"AriaNgConfig.json\" ng-content-type=\"application/json\">\n                                <i class=\"icon-primary fa fa-save\"></i>\n                            </a>\n                            <a class=\"pointer-cursor\" title=\"{{'Copy' | translate}}\" (click)=\"copyExportSettings()\">\n                                <i class=\"icon-primary fa fa-copy\"></i>\n                            </a>\n                            <span class=\"label label-default fade-in\" ng-if=\"exportSettingsCopied\" translate>Data has been copied to clipboard.</span>\n                        </small>\n                    </h4>\n                </div>\n                <div class=\"modal-body no-padding\">\n                    <div class=\"settings-table striped\">\n                        <textarea class=\"form-control\" ng-model=\"exportSettings\" rows=\"20\" readonly=\"readonly\"></textarea>\n                    </div>\n                </div>\n                <div class=\"modal-footer\">\n                    <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" translate>Cancel</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</section>\n\n    "
        }),
        __metadata("design:paramtypes", [ariaNgTitleService_1.AriaNgTitleService, typeof (_a = typeof AriaNgMonitorService !== "undefined" && AriaNgMonitorService) === "function" ? _a : Object, ariaNgNativeElectronService_1.AriaNgNativeElectronService,
            ariaNgCommonService_1.AriaNgCommonService, typeof (_b = typeof AriaNgFileService !== "undefined" && AriaNgFileService) === "function" ? _b : Object, ariaNgSettingService_1.AriaNgSettingService])
    ], AriaNgSettingsController);
    return AriaNgSettingsController;
}());
exports.AriaNgSettingsController = AriaNgSettingsController;
//# sourceMappingURL=AriaNgSettingsController.js.map