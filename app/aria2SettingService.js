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
exports.Aria2SettingService = void 0;
var core_1 = require("@angular/core");
var ariaNgConstants_1 = require("./ariaNgConstants");
var aria2AllOptions_1 = require("./aria2AllOptions");
var aria2GlobalAvailableOptions_1 = require("./aria2GlobalAvailableOptions");
var aria2QuickSettingsAvailableOptions_1 = require("./aria2QuickSettingsAvailableOptions");
var aria2TaskAvailableOptions_1 = require("./aria2TaskAvailableOptions");
var ariaNgStorageService_1 = require("./ariaNgStorageService");
var ariaNgLogService_1 = require("./ariaNgLogService");
var Aria2SettingService = /** @class */ (function () {
    function Aria2SettingService(ariaNgStorageService, ariaNgLogService) {
        this.ariaNgStorageService = ariaNgStorageService;
        this.ariaNgLogService = ariaNgLogService;
    }
    Aria2SettingService.prototype.isOptionKeyValid = function (key) {
        var option = aria2AllOptions_1.Aria2AllOptions[key];
        return !!option;
    };
    ;
    Aria2SettingService.prototype.getAvailableGlobalOptionsKeys = function (type) {
        if (type === 'basic') {
            return aria2GlobalAvailableOptions_1.Aria2GlobalAvailableOptions.basicOptions;
        }
        else if (type === 'http-ftp-sftp') {
            return aria2GlobalAvailableOptions_1.Aria2GlobalAvailableOptions.httpFtpSFtpOptions;
        }
        else if (type === 'http') {
            return aria2GlobalAvailableOptions_1.Aria2GlobalAvailableOptions.httpOptions;
        }
        else if (type === 'ftp-sftp') {
            return aria2GlobalAvailableOptions_1.Aria2GlobalAvailableOptions.ftpSFtpOptions;
        }
        else if (type === 'bt') {
            return aria2GlobalAvailableOptions_1.Aria2GlobalAvailableOptions.btOptions;
        }
        else if (type === 'metalink') {
            return aria2GlobalAvailableOptions_1.Aria2GlobalAvailableOptions.metalinkOptions;
        }
        else if (type === 'rpc') {
            return aria2GlobalAvailableOptions_1.Aria2GlobalAvailableOptions.rpcOptions;
        }
        else if (type === 'advanced') {
            return aria2GlobalAvailableOptions_1.Aria2GlobalAvailableOptions.advancedOptions;
        }
        else {
            return false;
        }
    };
    ;
    Aria2SettingService.prototype.getAria2QuickSettingsAvailableOptions = function (type) {
        if (type === 'globalSpeedLimit') {
            return aria2QuickSettingsAvailableOptions_1.Aria2QuickSettingsAvailableOptions.globalSpeedLimitOptions;
        }
        else {
            return false;
        }
    };
    ;
    Aria2SettingService.prototype.getAvailableTaskOptionKeys = function (status, isBittorrent) {
        var allOptions = aria2TaskAvailableOptions_1.Aria2TaskAvailableOptions.taskOptions;
        var availableOptions = [];
        for (var i = 0; i < allOptions.length; i++) {
            var option = allOptions[i];
            var optionKey = {
                key: option.key,
                category: option.category
            };
            if (option.canShow && option.canShow.indexOf(status) < 0) {
                continue;
            }
            if (option.category === 'http' && isBittorrent) {
                continue;
            }
            else if (option.category === 'bittorrent' && !isBittorrent) {
                continue;
            }
            if (option.canUpdate && option.canUpdate.indexOf(status) < 0) {
                optionKey.readonly = true;
            }
            availableOptions.push(optionKey);
        }
        return availableOptions;
    };
    ;
    Aria2SettingService.prototype.getNewTaskOptionKeys = function () {
        var allOptions = aria2TaskAvailableOptions_1.Aria2TaskAvailableOptions.taskOptions;
        var availableOptions = [];
        for (var i = 0; i < allOptions.length; i++) {
            var option = allOptions[i];
            var optionKey = {
                key: option.key,
                category: option.category,
                showHistory: option.showHistory
            };
            if (option.canShow && option.canShow.indexOf('new') < 0) {
                continue;
            }
            if (option.canUpdate && option.canUpdate.indexOf('new') < 0) {
                optionKey.readonly = true;
            }
            availableOptions.push(optionKey);
        }
        return availableOptions;
    };
    ;
    Aria2SettingService.prototype.getSpecifiedOptions = function (keys, extendSettings) {
        var options = [];
        if (!keys) {
            return options;
        }
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var readonly1 = false;
            var category = null;
            var showHistory = false;
            if (key instanceof Object) {
                var optionKey = key;
                key = optionKey.key;
                readonly1 = !!optionKey.readonly;
                category = optionKey.category;
                showHistory = !!optionKey.showHistory;
            }
            var option = aria2AllOptions_1.Aria2AllOptions[key];
            if (!option) {
                continue;
            }
            option = angular.extend({
                key: key,
                nameKey: 'options.' + key + '.name',
                descriptionKey: 'options.' + key + '.description'
            }, option);
            if (category) {
                option.category = category;
            }
            if (option.type === 'boolean') {
                option.options = ['true', 'false'];
            }
            if (readonly1) {
                option.readonly = true;
            }
            if (showHistory) {
                option.showHistory = true;
            }
            if (extendSettings && extendSettings.disableRequired) {
                option.required = false;
            }
            if (option.options) {
                var availableOptions = [];
                for (var j = 0; j < option.options.length; j++) {
                    availableOptions.push({
                        name: 'option.' + option.options[j],
                        value: option.options[j]
                    });
                }
                option.options = availableOptions;
            }
            options.push(option);
        }
        return options;
    };
    ;
    Aria2SettingService.prototype.getSettingHistory = function (key) {
        if (!this.isOptionKeyValid(key)) {
            return [];
        }
        var storageKey = this.getSettingHistoryKey(key);
        var history = this.ariaNgStorageService.get(storageKey) || [];
        var newHistory = [];
        for (var i = 0; i < Math.min(history.length, ariaNgConstants_1.AriaNgConstants.historyMaxStoreCount); i++) {
            newHistory.push(history[i]);
        }
        return newHistory;
    };
    ;
    Aria2SettingService.prototype.addSettingHistory = function (key, value) {
        if (!this.isOptionKeyValid(key)) {
            return [];
        }
        var storageKey = this.getSettingHistoryKey(key);
        var history = this.ariaNgStorageService.get(storageKey) || [];
        var newHistory = [];
        newHistory.push(value);
        for (var i = 0; i < Math.min(history.length, ariaNgConstants_1.AriaNgConstants.historyMaxStoreCount - 1); i++) {
            if (history[i] !== value) {
                newHistory.push(history[i]);
            }
        }
        this.ariaNgStorageService.set(storageKey, JSON.stringify(newHistory));
        return newHistory;
    };
    ;
    Aria2SettingService.prototype.clearSettingsHistorys = function () {
        var keys = this.ariaNgStorageService.keys(ariaNgConstants_1.AriaNgConstants.settingHistoryKeyPrefix + '.');
        for (var i = 0; i < keys.length; i++) {
            this.ariaNgStorageService.remove(keys[i]);
        }
    };
    ;
    Aria2SettingService.prototype.getGlobalOption = function (callback, silent) {
        return this.aria2RpcService.getGlobalOption({
            silent: !!silent,
            callback: callback
        });
    };
    ;
    Aria2SettingService.prototype.setGlobalOption = function (key, value, callback, silent) {
        var data = {};
        data[key] = value;
        return this.aria2RpcService.changeGlobalOption({
            options: data,
            silent: !!silent,
            callback: callback
        });
    };
    ;
    Aria2SettingService.prototype.getAria2Status = function (callback, silent) {
        return this.aria2RpcService.getVersion({
            silent: !!silent,
            callback: callback
        });
    };
    ;
    Aria2SettingService.prototype.getGlobalStat = function (callback, silent) {
        return this.aria2RpcService.getGlobalStat({
            silent: !!silent,
            callback: function (response) {
                if (!callback) {
                    this.ariaNgLogService.warn('[aria2SettingService.getGlobalStat] callback is null');
                    return;
                }
                var stat = this.processStatResult(response);
                callback(stat);
            }
        });
    };
    ;
    Aria2SettingService.prototype.saveSession = function (callback, silent) {
        return this.aria2RpcService.saveSession({
            silent: !!silent,
            callback: callback
        });
    };
    ;
    Aria2SettingService.prototype.shutdown = function (callback, silent) {
        return this.aria2RpcService.shutdown({
            silent: !!silent,
            callback: callback
        });
    };
    ;
    Aria2SettingService.prototype.processStatResult = function (stat) {
        if (!stat) {
            return stat;
        }
        var activeCount = parseInt(stat.numActive);
        var waitingCount = parseInt(stat.numWaiting);
        var totalRunningCount = activeCount + waitingCount;
        stat.totalRunningCount = totalRunningCount;
        return stat;
    };
    ;
    Aria2SettingService.prototype.getSettingHistoryKey = function (key) {
        return ariaNgConstants_1.AriaNgConstants.settingHistoryKeyPrefix + '.' + key;
    };
    ;
    Aria2SettingService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ariaNgStorageService_1.AriaNgStorageService,
            ariaNgLogService_1.AriaNgLogService])
    ], Aria2SettingService);
    return Aria2SettingService;
}());
exports.Aria2SettingService = Aria2SettingService;
// angular.module('ariaNg')
//     .factory('aria2SettingService', downgradeInjectable(Aria2SettingService));
//# sourceMappingURL=aria2SettingService.js.map