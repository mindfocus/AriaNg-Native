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
exports.AriaNgSettingService = void 0;
var core_1 = require("@angular/core");
var ariaNgStorageService_1 = require("./ariaNgStorageService");
var ariaNgLanguages_1 = require("./ariaNgLanguages");
var ariaNgLogService_1 = require("./ariaNgLogService");
var ariaNgCommonService_1 = require("./ariaNgCommonService");
var ariaNgDefaultOptions_1 = require("./ariaNgDefaultOptions");
var ariaNgConstants_1 = require("./ariaNgConstants");
var static_1 = require("@angular/upgrade/static");
var common_1 = require("@angular/common");
var AriaNgSettingService = /** @class */ (function () {
    function AriaNgSettingService(ariaNgStorageService, ariaNgLogService, ariaNgCommonService, location) {
        this.ariaNgStorageService = ariaNgStorageService;
        this.ariaNgLogService = ariaNgLogService;
        this.ariaNgCommonService = ariaNgCommonService;
        this.location = location;
        this.onAppCacheUpdatedCallbacks = [];
        this.onFirstVisitCallbacks = [];
        this.firstVisitCallbackFired = false;
        this.sessionSettings = {
            debugMode: false
        };
        this.browserFeatures = {};
        this.browserSupportStorage = true;
        var supportLocalStroage = ariaNgStorageService.isLocalStorageSupported();
        var supportCookies = ariaNgStorageService.isCookiesSupported();
        this.browserSupportStorage = supportLocalStroage || supportCookies;
        this.browserFeatures = (function () {
            var supportLocalStroage = ariaNgStorageService.isLocalStorageSupported();
            var supportCookies = ariaNgStorageService.isCookiesSupported();
            return {
                localStroage: supportLocalStroage,
                cookies: supportCookies
            };
        })();
        var browserSupportAppCache = !!window.applicationCache;
        var browserSupportMatchMedia = !!window.matchMedia;
        var browserSupportDarkMode = browserSupportMatchMedia
            && window.matchMedia('(prefers-color-scheme: dark)')
            && window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all'
            && typeof window.matchMedia('(prefers-color-scheme: dark)').addEventListener === 'function';
        if (browserSupportAppCache) {
            var appCache = window.applicationCache;
            var that_1 = this;
            appCache.addEventListener('updateready', function (e) {
                for (var i = 0; i < that_1.onAppCacheUpdatedCallbacks.length; i++) {
                    var callback = that_1.onAppCacheUpdatedCallbacks[i];
                    callback();
                }
            }, false);
        }
    }
    AriaNgSettingService.prototype.fireFirstVisitEvent = function () {
        if (!this.browserSupportStorage) {
            return;
        }
        if (this.firstVisitCallbackFired || !Array.isArray(this.onFirstVisitCallbacks) || this.onFirstVisitCallbacks.length < 1) {
            return;
        }
        for (var i = 0; i < this.onFirstVisitCallbacks.length; i++) {
            var callback = this.onFirstVisitCallbacks[i];
            callback();
        }
        this.firstVisitCallbackFired = true;
    };
    AriaNgSettingService.prototype.isInsecureProtocolDisabled = function () {
        var protocol = location.protocol;
        return protocol === 'https';
    };
    ;
    AriaNgSettingService.prototype.getLanguageNameFromAlias = function (alias) {
        // console.log('ariaNgLanguages: ', AriaNgLanguages )
        for (var langName in ariaNgLanguages_1.AriaNgLanguages) {
            if (!ariaNgLanguages_1.AriaNgLanguages.hasOwnProperty(langName)) {
                continue;
            }
            if (langName.toLowerCase() === alias.toLowerCase()) {
                return langName;
            }
            var language = ariaNgLanguages_1.AriaNgLanguages[langName];
            var aliases = language.aliases;
            if (!Array.isArray(aliases) || aliases.length < 1) {
                continue;
            }
            for (var i = 0; i < aliases.length; i++) {
                if (aliases[i].toLowerCase() === alias.toLowerCase()) {
                    return langName;
                }
            }
        }
        return null;
    };
    AriaNgSettingService.prototype.getDefaultLanguage = function () {
        var browserLang = window.navigator.browserLanguage ? window.navigator.browserLanguage : window.navigator.language;
        if (!browserLang) {
            this.ariaNgLogService.info('[ariaNgSettingService] cannot get browser language, use default language');
            return ariaNgDefaultOptions_1.AriaNgDefaultOptions.language;
        }
        browserLang = browserLang.replace(/\-/g, '_');
        if (!ariaNgLanguages_1.AriaNgLanguages[browserLang]) {
            var languageName = this.getLanguageNameFromAlias(browserLang);
            if (languageName) {
                browserLang = languageName;
            }
        }
        if (!ariaNgLanguages_1.AriaNgLanguages[browserLang] && browserLang.split('-').length > 1) { // maybe language-script-region
            var langParts = browserLang.split('-');
            browserLang = langParts[0] + '-' + langParts[1];
            if (!ariaNgLanguages_1.AriaNgLanguages[browserLang]) {
                var languageName = this.getLanguageNameFromAlias(browserLang);
                if (languageName) {
                    browserLang = languageName;
                }
            }
        }
        // if (!AriaNgLanguages[browserLang]) {
        //     this.ariaNgLogService.info('[ariaNgSettingService] browser language \"' + browserLang + '\" not support, use default language');
        //     return AriaNgDefaultOptions.language;
        // }
        this.ariaNgLogService.info('[ariaNgSettingService] use browser language \"' + browserLang + '\" as current language');
        return browserLang;
    };
    ;
    AriaNgSettingService.prototype.getLanguageNameFromAliasOrDefaultLanguage = function (lang) {
        var languageName = this.getLanguageNameFromAlias(lang);
        if (languageName) {
            return languageName;
        }
        return this.getDefaultLanguage();
    };
    ;
    AriaNgSettingService.prototype.getDefaultRpcHost = function () {
        var currentHost = location.host;
        if (currentHost) {
            return currentHost;
        }
        return ariaNgConstants_1.AriaNgConstants.defaultHost;
    };
    ;
    AriaNgSettingService.prototype.setOptions = function (options) {
        return this.ariaNgStorageService.set(ariaNgConstants_1.AriaNgConstants.optionStorageKey, JSON.stringify(options));
    };
    ;
    AriaNgSettingService.prototype.getOptions = function () {
        var options = JSON.parse(this.ariaNgStorageService.get(ariaNgConstants_1.AriaNgConstants.optionStorageKey)) || {};
        if (options && !ariaNgLanguages_1.AriaNgLanguages[options.language]) {
            options.language = this.getLanguageNameFromAliasOrDefaultLanguage(options.language);
        }
        if (!options) {
            options = Object.assign({}, ariaNgDefaultOptions_1.AriaNgDefaultOptions);
            options.language = this.getDefaultLanguage();
            if (!options.rpcHost) {
                this.initRpcSettingWithDefaultHostAndProtocol(options);
            }
            if (Array.isArray(options.extendRpcServers)) {
                for (var i = 0; i < options.extendRpcServers.length; i++) {
                    var rpcSetting = options.extendRpcServers[i];
                    if (!rpcSetting.rpcHost) {
                        this.initRpcSettingWithDefaultHostAndProtocol(rpcSetting);
                    }
                }
            }
            this.setOptions(options);
            this.fireFirstVisitEvent();
        }
        return options;
    };
    AriaNgSettingService.prototype.clearAll = function () {
        return this.ariaNgStorageService.clearAll();
    };
    ;
    AriaNgSettingService.prototype.getOption = function (key) {
        var options = this.getOptions();
        if (typeof options[key] == 'undefined' && typeof ariaNgDefaultOptions_1.AriaNgDefaultOptions[key] !== 'undefined') {
            options[key] = ariaNgDefaultOptions_1.AriaNgDefaultOptions[key];
            this.setOptions(options);
        }
        return options[key];
    };
    AriaNgSettingService.prototype.setOption = function (key, value) {
        var options = this.getOptions();
        options[key] = value;
        this.setOptions(options);
    };
    AriaNgSettingService.prototype.initRpcSettingWithDefaultHostAndProtocol = function (setting) {
        setting.rpcHost = this.getDefaultRpcHost();
        if (this.isInsecureProtocolDisabled()) {
            setting.protocol = ariaNgConstants_1.AriaNgConstants.defaultSecureProtocol;
        }
    };
    AriaNgSettingService.prototype.cloneRpcSetting = function (setting) {
        return {
            rpcAlias: setting.rpcAlias,
            rpcHost: setting.rpcHost,
            rpcPort: setting.rpcPort,
            rpcInterface: setting.rpcInterface,
            protocol: setting.protocol,
            httpMethod: setting.httpMethod,
            secret: setting.secret
        };
    };
    ;
    AriaNgSettingService.prototype.createNewRpcSetting = function () {
        var setting = this.cloneRpcSetting(ariaNgDefaultOptions_1.AriaNgDefaultOptions);
        setting.rpcId = this.ariaNgCommonService.generateUniqueId();
        this.initRpcSettingWithDefaultHostAndProtocol(setting);
        return setting;
    };
    AriaNgSettingService.prototype.isBrowserSupportStorage = function () {
        return this.browserSupportStorage;
    };
    AriaNgSettingService.prototype.isBrowserSupportApplicationCache = function () {
        return this.browserSupportAppCache;
    };
    AriaNgSettingService.prototype.isBrowserSupportDarkMode = function () {
        return this.browserSupportDarkMode;
    };
    AriaNgSettingService.prototype.getBrowserFeatures = function () {
        return this.browserFeatures;
    };
    AriaNgSettingService.prototype.getAllOptions = function () {
        var options = Object.assign({}, ariaNgDefaultOptions_1.AriaNgDefaultOptions, this.getOptions());
        if (options.secret) {
            options.secret = this.ariaNgCommonService.base64Decode(options.secret);
        }
        if (Array.isArray(options.extendRpcServers)) {
            for (var i = 0; i < options.extendRpcServers.length; i++) {
                var rpcSetting = options.extendRpcServers[i];
                if (rpcSetting.secret) {
                    rpcSetting.secret = this.ariaNgCommonService.base64Decode(rpcSetting.secret);
                }
            }
        }
        return options;
    };
    AriaNgSettingService.prototype.getAllRpcSettings = function () {
        var result = [];
        var options = this.getAllOptions();
        var defaultRpcSetting = this.cloneRpcSetting(options);
        defaultRpcSetting.isDefault = true;
        result.push(defaultRpcSetting);
        if (Array.isArray(options.extendRpcServers)) {
            for (var i = 0; i < options.extendRpcServers.length; i++) {
                var rpcSetting = this.cloneRpcSetting(options.extendRpcServers[i]);
                rpcSetting.rpcId = options.extendRpcServers[i].rpcId;
                rpcSetting.isDefault = false;
                result.push(rpcSetting);
            }
        }
        var displayOrder = this.getRPCListDisplayOrder();
        if (displayOrder === 'recentlyUsed') {
            // Do Nothing
        }
        else if (displayOrder === 'rpcAlias') {
            result.sort(function (rpc1, rpc2) {
                return String.naturalCompare(rpc1.rpcAlias, rpc2.rpcAlias);
            });
        }
        return result;
    };
    AriaNgSettingService.prototype.importAllOptions = function (options) {
        var finalOptions = angular.copy(ariaNgDefaultOptions);
        for (var key in options) {
            if (!options.hasOwnProperty(key) || !finalOptions.hasOwnProperty(key)) {
                continue;
            }
            if (angular.isObject(options[key]) || Array.isArray(options[key])) {
                continue;
            }
            finalOptions[key] = options[key];
        }
        if (Array.isArray(options.extendRpcServers)) {
            for (var i = 0; i < options.extendRpcServers.length; i++) {
                var rpcSetting = options.extendRpcServers[i];
                var finalRpcSetting = this.createNewRpcSetting();
                for (var key in rpcSetting) {
                    if (!rpcSetting.hasOwnProperty(key) || !finalRpcSetting.hasOwnProperty(key)) {
                        continue;
                    }
                    if (angular.isObject(rpcSetting[key]) || angular.isArray(rpcSetting[key])) {
                        continue;
                    }
                    finalRpcSetting[key] = rpcSetting[key];
                }
                finalOptions.extendRpcServers.push(finalRpcSetting);
            }
        }
        this.setOptions(finalOptions);
    };
    AriaNgSettingService.prototype.exportAllOptions = function () {
        var options = Object.assign({}, ariaNgDefaultOptions_1.AriaNgDefaultOptions, this.getOptions());
        return options;
    };
    AriaNgSettingService.prototype.getAllSessionOptions = function () {
        return angular.copy(sessionSettings);
    };
    AriaNgSettingService.prototype.getLanguage = function () {
        return this.getOption('language');
    };
    AriaNgSettingService.prototype.setLanguage = function (value) {
        if (!this.ariaNgLanguages[value]) {
            return false;
        }
        this.setOption('language', value);
        return true;
    };
    AriaNgSettingService.prototype.getTheme = function () {
        return this.getOption('theme');
    };
    AriaNgSettingService.prototype.setTheme = function (value) {
        this.setOption('theme', value);
        return true;
    };
    AriaNgSettingService.prototype.isEnableDebugMode = function () {
        // return sessionSettings.debugMode;
        return true;
    };
    AriaNgSettingService.prototype.setDebugMode = function (value) {
        this.sessionSettings.debugMode = value;
        this.ariaNgLogService.setEnableDebugLog(value);
    };
    AriaNgSettingService.prototype.getTitle = function () {
        return this.getOption('title');
    };
    AriaNgSettingService.prototype.setTitle = function (value) {
        this.setOption('title', value);
    };
    AriaNgSettingService.prototype.getBrowserNotification = function () {
        return this.getOption('browserNotification');
    };
    AriaNgSettingService.prototype.setBrowserNotification = function (value) {
        this.setOption('browserNotification', value);
    };
    AriaNgSettingService.prototype.getTitleRefreshInterval = function () {
        return this.getOption('titleRefreshInterval');
    };
    AriaNgSettingService.prototype.setTitleRefreshInterval = function (value) {
        this.setOption('titleRefreshInterval', Math.max(parseInt(value), 0));
    };
    AriaNgSettingService.prototype.getGlobalStatRefreshInterval = function () {
        return this.getOption('globalStatRefreshInterval');
    };
    AriaNgSettingService.prototype.setGlobalStatRefreshInterval = function (value) {
        this.setOption('globalStatRefreshInterval', Math.max(parseInt(value), 0));
    };
    AriaNgSettingService.prototype.getDownloadTaskRefreshInterval = function () {
        return this.getOption('downloadTaskRefreshInterval');
    };
    AriaNgSettingService.prototype.setDownloadTaskRefreshInterval = function (value) {
        this.setOption('downloadTaskRefreshInterval', Math.max(parseInt(value), 0));
    };
    AriaNgSettingService.prototype.getSwipeGesture = function () {
        return this.getOption('swipeGesture');
    };
    AriaNgSettingService.prototype.setSwipeGesture = function (value) {
        this.setOption('swipeGesture', value);
    };
    AriaNgSettingService.prototype.getDragAndDropTasks = function () {
        return this.getOption('dragAndDropTasks');
    };
    AriaNgSettingService.prototype.setDragAndDropTasks = function (value) {
        this.setOption('dragAndDropTasks', value);
    };
    AriaNgSettingService.prototype.getRPCListDisplayOrder = function () {
        return this.getOption('rpcListDisplayOrder');
    };
    AriaNgSettingService.prototype.setRPCListDisplayOrder = function (value) {
        this.setOption('rpcListDisplayOrder', value);
    };
    AriaNgSettingService.prototype.getAfterCreatingNewTask = function () {
        return this.getOption('afterCreatingNewTask');
    };
    AriaNgSettingService.prototype.setAfterCreatingNewTask = function (value) {
        this.setOption('afterCreatingNewTask', value);
    };
    AriaNgSettingService.prototype.getRemoveOldTaskAfterRetrying = function () {
        return this.getOption('removeOldTaskAfterRetrying');
    };
    AriaNgSettingService.prototype.setRemoveOldTaskAfterRetrying = function (value) {
        this.setOption('removeOldTaskAfterRetrying', value);
    };
    AriaNgSettingService.prototype.getConfirmTaskRemoval = function () {
        return this.getOption('confirmTaskRemoval');
    };
    AriaNgSettingService.prototype.setConfirmTaskRemoval = function (value) {
        this.setOption('confirmTaskRemoval', value);
    };
    AriaNgSettingService.prototype.getIncludePrefixWhenCopyingFromTaskDetails = function () {
        return this.getOption('includePrefixWhenCopyingFromTaskDetails');
    };
    AriaNgSettingService.prototype.setIncludePrefixWhenCopyingFromTaskDetails = function (value) {
        this.setOption('includePrefixWhenCopyingFromTaskDetails', value);
    };
    AriaNgSettingService.prototype.getAfterRetryingTask = function () {
        return this.getOption('afterRetryingTask');
    };
    AriaNgSettingService.prototype.setAfterRetryingTask = function (value) {
        this.setOption('afterRetryingTask', value);
    };
    AriaNgSettingService.prototype.getCurrentRpcDisplayName = function () {
        var options = this.getOptions();
        if (options.rpcAlias) {
            return options.rpcAlias;
        }
        return options.rpcHost + ':' + options.rpcPort;
    };
    AriaNgSettingService.prototype.getCurrentRpcUrl = function () {
        var options = this.getOptions();
        // console.log('getCurrentRpcUrl: ',options)
        var protocol = options.protocol;
        var rpcHost = options.rpcHost;
        var rpcPort = options.rpcPort;
        var rpcInterface = options.rpcInterface;
        return protocol + '://' + rpcHost + ':' + rpcPort + '/' + rpcInterface;
    };
    AriaNgSettingService.prototype.getCurrentRpcHttpMethod = function () {
        return this.getOption('httpMethod');
    };
    AriaNgSettingService.prototype.isCurrentRpcUseWebSocket = function (protocol) {
        if (!protocol) {
            var options = this.getOptions();
            protocol = options.protocol;
        }
        return protocol === 'ws' || protocol === 'wss';
    };
    AriaNgSettingService.prototype.getCurrentRpcSecret = function () {
        var value = this.getOption('secret');
        return (value ? this.ariaNgCommonService.base64Decode(value) : value);
    };
    AriaNgSettingService.prototype.addNewRpcSetting = function () {
        var options = this.getOptions();
        if (!Array.isArray(options.extendRpcServers)) {
            options.extendRpcServers = [];
        }
        var newRpcSetting = this.createNewRpcSetting();
        options.extendRpcServers.push(newRpcSetting);
        this.setOptions(options);
        return newRpcSetting;
    };
    AriaNgSettingService.prototype.updateRpcSetting = function (setting, field) {
        if (!setting) {
            return setting;
        }
        var updatedSetting = this.cloneRpcSetting(setting);
        if (angular.isUndefined(updatedSetting[field])) {
            return setting;
        }
        var value = updatedSetting[field];
        if (field === 'rpcPort') {
            value = Math.max(parseInt(value), 0);
        }
        else if (field === 'secret') {
            if (value) {
                value = this.ariaNgCommonService.base64Encode(value);
            }
        }
        if (setting.isDefault) {
            this.setOption(field, value);
            return setting;
        }
        else {
            var options = this.getOptions();
            if (!Array.isArray(options.extendRpcServers)) {
                return setting;
            }
            for (var i = 0; i < options.extendRpcServers.length; i++) {
                if (options.extendRpcServers[i].rpcId === setting.rpcId) {
                    options.extendRpcServers[i][field] = value;
                    break;
                }
            }
            this.setOptions(options);
            return setting;
        }
    };
    AriaNgSettingService.prototype.removeRpcSetting = function (setting) {
        var options = this.getOptions();
        if (!Array.isArray(options.extendRpcServers)) {
            return setting;
        }
        for (var i = 0; i < options.extendRpcServers.length; i++) {
            if (options.extendRpcServers[i].rpcId === setting.rpcId) {
                options.extendRpcServers.splice(i, 1);
                break;
            }
        }
        this.setOptions(options);
        return setting;
    };
    AriaNgSettingService.prototype.setDefaultRpcSetting = function (setting, params) {
        params = Object.assign({
            keepCurrent: true,
            forceSet: false
        }, params);
        var options = this.getOptions();
        var currentSetting = this.cloneRpcSetting(options);
        currentSetting.rpcId = this.ariaNgCommonService.generateUniqueId();
        if (!Array.isArray(options.extendRpcServers)) {
            options.extendRpcServers = [];
        }
        var newDefaultSetting = null;
        for (var i = 0; i < options.extendRpcServers.length; i++) {
            if (options.extendRpcServers[i].rpcId === setting.rpcId) {
                newDefaultSetting = this.cloneRpcSetting(options.extendRpcServers[i]);
                options.extendRpcServers.splice(i, 1);
                break;
            }
        }
        if (params.forceSet) {
            newDefaultSetting = this.cloneRpcSetting(setting);
            if (newDefaultSetting.secret) {
                newDefaultSetting.secret = this.ariaNgCommonService.base64Encode(newDefaultSetting.secret);
            }
        }
        if (newDefaultSetting) {
            if (params.keepCurrent) {
                options.extendRpcServers.splice(0, 0, currentSetting);
            }
            options = Object.assign(options, newDefaultSetting);
        }
        this.setOptions(options);
        return setting;
    };
    AriaNgSettingService.prototype.isRpcSettingEqualsDefault = function (setting) {
        if (!setting) {
            return false;
        }
        var options = this.getAllOptions();
        if (options.rpcHost !== setting.rpcHost) {
            return false;
        }
        if (options.rpcPort !== setting.rpcPort) {
            return false;
        }
        if (options.rpcInterface !== setting.rpcInterface) {
            return false;
        }
        if (options.protocol !== setting.protocol) {
            return false;
        }
        if (options.httpMethod !== setting.httpMethod) {
            return false;
        }
        if (options.secret !== setting.secret) {
            return false;
        }
        return true;
    };
    AriaNgSettingService.prototype.getDisplayOrder = function () {
        var value = this.getOption('displayOrder');
        if (!value) {
            value = 'default:asc';
        }
        return value;
    };
    AriaNgSettingService.prototype.setDisplayOrder = function (value) {
        this.setOption('displayOrder', value);
    };
    AriaNgSettingService.prototype.getFileListDisplayOrder = function () {
        var value = this.getOption('fileListDisplayOrder');
        if (!value) {
            value = 'default:asc';
        }
        return value;
    };
    AriaNgSettingService.prototype.setFileListDisplayOrder = function (value) {
        this.setOption('fileListDisplayOrder', value);
    };
    AriaNgSettingService.prototype.getPeerListDisplayOrder = function () {
        var value = this.getOption('peerListDisplayOrder');
        if (!value) {
            value = 'default:asc';
        }
        return value;
    };
    AriaNgSettingService.prototype.setPeerListDisplayOrder = function (value) {
        this.setOption('peerListDisplayOrder', value);
    };
    AriaNgSettingService.prototype.resetSettings = function () {
        this.clearAll();
    };
    AriaNgSettingService.prototype.onApplicationCacheUpdated = function (callback) {
        if (!callback) {
            return;
        }
        this.onAppCacheUpdatedCallbacks.push(callback);
    };
    AriaNgSettingService.prototype.onFirstAccess = function (callback) {
        if (!callback) {
            return;
        }
        this.onFirstVisitCallbacks.push(callback);
    };
    AriaNgSettingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ariaNgStorageService_1.AriaNgStorageService,
            ariaNgLogService_1.AriaNgLogService,
            ariaNgCommonService_1.AriaNgCommonService,
            common_1.Location])
    ], AriaNgSettingService);
    return AriaNgSettingService;
}());
exports.AriaNgSettingService = AriaNgSettingService;
angular.module('ariaNg')
    .factory('ariaNgSettingService', static_1.downgradeInjectable(AriaNgSettingService));
//# sourceMappingURL=ariaNgSettingService.js.map