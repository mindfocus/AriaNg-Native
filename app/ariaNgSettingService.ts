import {Injectable} from "@angular/core";
import {AriaNgStorageService} from "./ariaNgStorageService";
import {AriaNgLanguages} from "./ariaNgLanguages";
import {AriaNgLogService} from "./ariaNgLogService";
import {AriaNgCommonService} from "./ariaNgCommonService";
import {AriaNgDefaultOptions} from "./ariaNgDefaultOptions";
import {AriaNgConstants} from "./ariaNgConstants";
import {downgradeInjectable} from "@angular/upgrade/static";
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
declare var angular: angular.IAngularStatic;
@Injectable()
export class AriaNgSettingService {
     onAppCacheUpdatedCallbacks = [];
     onFirstVisitCallbacks = [];
     firstVisitCallbackFired = false;
     sessionSettings = {
        debugMode: false
    }
    browserFeatures = {};
    browserSupportStorage = true;

    constructor(private ariaNgStorageService: AriaNgStorageService,
                private ariaNgLogService: AriaNgLogService,
                private ariaNgCommonService: AriaNgCommonService,
                private location: Location) {
        var supportLocalStroage = ariaNgStorageService.isLocalStorageSupported();
        var supportCookies = ariaNgStorageService.isCookiesSupported();
        this.browserSupportStorage = supportLocalStroage || supportCookies
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
            let that = this;
            appCache.addEventListener('updateready', function (e) {
                for (var i = 0; i < that.onAppCacheUpdatedCallbacks.length; i++) {
                    var callback = that.onAppCacheUpdatedCallbacks[i];
                    callback();
                }
            }, false);
        }
    }


     fireFirstVisitEvent  () {
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
    }

     isInsecureProtocolDisabled  () {
        var protocol = location.protocol;

        return protocol === 'https';
    };

     getLanguageNameFromAlias  (alias) {
        // console.log('ariaNgLanguages: ', AriaNgLanguages )
        for (var langName in AriaNgLanguages) {
            if (!AriaNgLanguages.hasOwnProperty(langName)) {
                continue;
            }

            if (langName.toLowerCase() === alias.toLowerCase()) {
                return langName;
            }

            var language = AriaNgLanguages[langName];
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
    }

     getDefaultLanguage  () {
        var browserLang = window.navigator.browserLanguage ? window.navigator.browserLanguage : window.navigator.language;

        if (!browserLang) {
            this.ariaNgLogService.info('[ariaNgSettingService] cannot get browser language, use default language');
            return AriaNgDefaultOptions.language;
        }

        browserLang = browserLang.replace(/\-/g, '_');

        if (!AriaNgLanguages[browserLang]) {
            var languageName = this.getLanguageNameFromAlias(browserLang);

            if (languageName) {
                browserLang = languageName;
            }
        }

        if (!AriaNgLanguages[browserLang] && browserLang.split('-').length > 1) { // maybe language-script-region
            var langParts = browserLang.split('-');
            browserLang = langParts[0] + '-' + langParts[1];

            if (!AriaNgLanguages[browserLang]) {
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

     getLanguageNameFromAliasOrDefaultLanguage  (lang) {
        var languageName = this.getLanguageNameFromAlias(lang);

        if (languageName) {
            return languageName;
        }

        return this.getDefaultLanguage();
    };

     getDefaultRpcHost  () {
        var currentHost = location.host;

        if (currentHost) {
            return currentHost;
        }

        return AriaNgConstants.defaultHost;
    };

     setOptions  (options) {
        return this.ariaNgStorageService.set(AriaNgConstants.optionStorageKey, JSON.stringify(options));
    };

     getOptions  () {
        let options = JSON.parse(this.ariaNgStorageService.get(AriaNgConstants.optionStorageKey)) || {} ;
        if (options && !AriaNgLanguages[options.language]) {
            options.language = this.getLanguageNameFromAliasOrDefaultLanguage(options.language);
        }

        if (!options) {
            options = Object.assign({}, AriaNgDefaultOptions);
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
    }

     clearAll  () {
        return this.ariaNgStorageService.clearAll();
    };

     getOption  (key) {
        var options = this.getOptions();

        if (typeof options[key] == 'undefined' && typeof AriaNgDefaultOptions[key] !== 'undefined') {
            options[key] = AriaNgDefaultOptions[key];
            this.setOptions(options);
        }

        return options[key];
    }

     setOption  (key, value) {
        var options = this.getOptions();
        options[key] = value;

        this.setOptions(options);
    }

     initRpcSettingWithDefaultHostAndProtocol  (setting) {
        setting.rpcHost = this.getDefaultRpcHost();

        if (this.isInsecureProtocolDisabled()) {
            setting.protocol = AriaNgConstants.defaultSecureProtocol;
        }
    }

    cloneRpcSetting  (setting) {
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

     createNewRpcSetting  () {
        var setting = this.cloneRpcSetting(AriaNgDefaultOptions);
        setting.rpcId = this.ariaNgCommonService.generateUniqueId();

        this.initRpcSettingWithDefaultHostAndProtocol(setting);

        return setting;
    }
    isBrowserSupportStorage () {
        return this.browserSupportStorage;
    }
    isBrowserSupportApplicationCache () {
        return this.browserSupportAppCache;
    }
    isBrowserSupportDarkMode () {
        return this.browserSupportDarkMode;
    }
    getBrowserFeatures () {
        return this.browserFeatures;
    }
    getAllOptions () {
        var options = Object.assign({}, AriaNgDefaultOptions, this.getOptions());

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
    }
    getAllRpcSettings () {
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
        } else if (displayOrder === 'rpcAlias') {
            result.sort(function (rpc1, rpc2) {
                return String.naturalCompare(rpc1.rpcAlias, rpc2.rpcAlias);
            });
        }

        return result;
    }
    importAllOptions (options) {
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
    }
    exportAllOptions () {
        var options = Object.assign({}, AriaNgDefaultOptions, this.getOptions());

        return options;
    }
    getAllSessionOptions () {
        return angular.copy(sessionSettings);
    }
    getLanguage () {
        return this.getOption('language');
    }
    setLanguage (value) {
        if (!this.ariaNgLanguages[value]) {
            return false;
        }

        this.setOption('language', value);
        return true;
    }
    getTheme () {
        return this.getOption('theme');
    }
    setTheme (value) {
        this.setOption('theme', value);
        return true;
    }
    isEnableDebugMode () {
        // return sessionSettings.debugMode;
        return true;
    }
    setDebugMode (value) {
        this.sessionSettings.debugMode = value;
        this.ariaNgLogService.setEnableDebugLog(value);
    }
    getTitle () {
        return this.getOption('title');
    }
    setTitle (value) {
        this.setOption('title', value);
    }
    getBrowserNotification () {
        return this.getOption('browserNotification');
    }
    setBrowserNotification (value) {
        this.setOption('browserNotification', value);
    }
    getTitleRefreshInterval () {
        return this.getOption('titleRefreshInterval');
    }
    setTitleRefreshInterval (value) {
        this.setOption('titleRefreshInterval', Math.max(parseInt(value), 0));
    }
    getGlobalStatRefreshInterval () {
        return this.getOption('globalStatRefreshInterval');
    }
    setGlobalStatRefreshInterval (value) {
        this.setOption('globalStatRefreshInterval', Math.max(parseInt(value), 0));
    }
    getDownloadTaskRefreshInterval () {
        return this.getOption('downloadTaskRefreshInterval');
    }
    setDownloadTaskRefreshInterval (value) {
        this.setOption('downloadTaskRefreshInterval', Math.max(parseInt(value), 0));
    }
    getSwipeGesture () {
        return this.getOption('swipeGesture');
    }
    setSwipeGesture (value) {
        this.setOption('swipeGesture', value);
    }
    getDragAndDropTasks () {
        return this.getOption('dragAndDropTasks');
    }
    setDragAndDropTasks (value) {
        this.setOption('dragAndDropTasks', value);
    }
    getRPCListDisplayOrder () {
        return this.getOption('rpcListDisplayOrder');
    }
    setRPCListDisplayOrder (value) {
        this.setOption('rpcListDisplayOrder', value);
    }
    getAfterCreatingNewTask () {
        return this.getOption('afterCreatingNewTask');
    }
    setAfterCreatingNewTask (value) {
        this.setOption('afterCreatingNewTask', value);
    }
    getRemoveOldTaskAfterRetrying () {
        return this.getOption('removeOldTaskAfterRetrying');
    }
    setRemoveOldTaskAfterRetrying (value) {
        this.setOption('removeOldTaskAfterRetrying', value);
    }
    getConfirmTaskRemoval () {
        return this.getOption('confirmTaskRemoval');
    }
    setConfirmTaskRemoval (value) {
        this.setOption('confirmTaskRemoval', value);
    }
    getIncludePrefixWhenCopyingFromTaskDetails () {
        return this.getOption('includePrefixWhenCopyingFromTaskDetails');
    }
    setIncludePrefixWhenCopyingFromTaskDetails (value) {
        this.setOption('includePrefixWhenCopyingFromTaskDetails', value);
    }
    getAfterRetryingTask () {
        return this.getOption('afterRetryingTask');
    }
    setAfterRetryingTask (value) {
        this.setOption('afterRetryingTask', value);
    }
    getCurrentRpcDisplayName () {
        var options = this.getOptions();

        if (options.rpcAlias) {
            return options.rpcAlias;
        }

        return options.rpcHost + ':' + options.rpcPort;
    }
    getCurrentRpcUrl () {
        let options = this.getOptions();
        // console.log('getCurrentRpcUrl: ',options)

        let protocol = options.protocol;
        let rpcHost = options.rpcHost;
        let rpcPort = options.rpcPort;
        let rpcInterface = options.rpcInterface;

        return protocol + '://' + rpcHost + ':' + rpcPort + '/' + rpcInterface;
    }
    getCurrentRpcHttpMethod () {
        return this.getOption('httpMethod');
    }
    isCurrentRpcUseWebSocket (protocol) {
        if (!protocol) {
            var options = this.getOptions();
            protocol = options.protocol;
        }

        return protocol === 'ws' || protocol === 'wss';
    }
    getCurrentRpcSecret () {
        var value = this.getOption('secret');
        return (value ? this.ariaNgCommonService.base64Decode(value) : value);
    }
    addNewRpcSetting () {
        var options = this.getOptions();

        if (!Array.isArray(options.extendRpcServers)) {
            options.extendRpcServers = [];
        }

        var newRpcSetting = this.createNewRpcSetting();
        options.extendRpcServers.push(newRpcSetting);

        this.setOptions(options);

        return newRpcSetting;
    }
    updateRpcSetting (setting, field) {
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
        } else if (field === 'secret') {
            if (value) {
                value = this.ariaNgCommonService.base64Encode(value);
            }
        }

        if (setting.isDefault) {
            this.setOption(field, value);

            return setting;
        } else {
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
    }
    removeRpcSetting (setting) {
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
    }
    setDefaultRpcSetting (setting, params) {
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
    }
    isRpcSettingEqualsDefault (setting) {
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
    }
    getDisplayOrder () {
        var value = this.getOption('displayOrder');

        if (!value) {
            value = 'default:asc';
        }

        return value;
    }
    setDisplayOrder (value) {
        this.setOption('displayOrder', value);
    }
    getFileListDisplayOrder () {
        var value = this.getOption('fileListDisplayOrder');

        if (!value) {
            value = 'default:asc';
        }

        return value;
    }
    setFileListDisplayOrder (value) {
        this.setOption('fileListDisplayOrder', value);
    }
    getPeerListDisplayOrder () {
        var value = this.getOption('peerListDisplayOrder');

        if (!value) {
            value = 'default:asc';
        }

        return value;
    }
    setPeerListDisplayOrder (value) {
        this.setOption('peerListDisplayOrder', value);
    }
    resetSettings () {
        this.clearAll();
    }
    onApplicationCacheUpdated (callback) {
        if (!callback) {
            return;
        }

        this.onAppCacheUpdatedCallbacks.push(callback);
    }
    onFirstAccess (callback) {
        if (!callback) {
            return;
        }

        this.onFirstVisitCallbacks.push(callback);
    }
}
angular.module('ariaNg')
    .factory('ariaNgSettingService', downgradeInjectable(AriaNgSettingService));
