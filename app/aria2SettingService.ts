import {Injectable} from "@angular/core";
import {downgradeInjectable} from "@angular/upgrade/static";
import {AriaNgConstants} from "./ariaNgConstants";
import {Aria2AllOptions} from "./aria2AllOptions";
import {Aria2GlobalAvailableOptions} from "./aria2GlobalAvailableOptions";
import {Aria2QuickSettingsAvailableOptions} from "./aria2QuickSettingsAvailableOptions";
import {Aria2TaskAvailableOptions} from "./aria2TaskAvailableOptions";
import {AriaNgStorageService} from "./ariaNgStorageService";
import {AriaNgLogService} from "./ariaNgLogService";
declare var angular: angular.IAngularStatic;

@Injectable()
export class Aria2SettingService {
    constructor(private ariaNgStorageService: AriaNgStorageService,
                private ariaNgLogService: AriaNgLogService,
                // private aria2RpcService: Aria2RpcService
    ) {
    }
    isOptionKeyValid (key: string | number) {
        var option = Aria2AllOptions[key];

        return !!option;
    };
    getAvailableGlobalOptionsKeys (type: string) {
        if (type === 'basic') {
            return Aria2GlobalAvailableOptions.basicOptions;
        } else if (type === 'http-ftp-sftp') {
            return Aria2GlobalAvailableOptions.httpFtpSFtpOptions;
        } else if (type === 'http') {
            return Aria2GlobalAvailableOptions.httpOptions;
        } else if (type === 'ftp-sftp') {
            return Aria2GlobalAvailableOptions.ftpSFtpOptions;
        } else if (type === 'bt') {
            return Aria2GlobalAvailableOptions.btOptions;
        } else if (type === 'metalink') {
            return Aria2GlobalAvailableOptions.metalinkOptions;
        } else if (type === 'rpc') {
            return Aria2GlobalAvailableOptions.rpcOptions;
        } else if (type === 'advanced') {
            return Aria2GlobalAvailableOptions.advancedOptions;
        } else {
            return false;
        }
    };
    getAria2QuickSettingsAvailableOptions (type: string) {
        if (type === 'globalSpeedLimit') {
            return Aria2QuickSettingsAvailableOptions.globalSpeedLimitOptions;
        } else {
            return false;
        }
    };
    getAvailableTaskOptionKeys (status: any, isBittorrent: any) {
        var allOptions = Aria2TaskAvailableOptions.taskOptions;
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
            } else if (option.category === 'bittorrent' && !isBittorrent) {
                continue;
            }

            if (option.canUpdate && option.canUpdate.indexOf(status) < 0) {
                optionKey.readonly = true;
            }

            availableOptions.push(optionKey);
        }

        return availableOptions;
    };
    getNewTaskOptionKeys () {
        var allOptions = Aria2TaskAvailableOptions.taskOptions;
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
    getSpecifiedOptions (keys: string | any[], extendSettings: { disableRequired: any; }) {
        var options: any[] = [];

        if (!keys) {
            return options;
        }

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            let readonly1 = false;
            var category = null;
            var showHistory = false;

            if ( key instanceof Object) {
                var optionKey = key;

                key = optionKey.key;
                readonly1 = !!optionKey.readonly;
                category = optionKey.category;
                showHistory = !!optionKey.showHistory;
            }

            var option = Aria2AllOptions[key];

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
    getSettingHistory (key: string | number) {
        if (!this.isOptionKeyValid(key)) {
            return [];
        }

        var storageKey = this.getSettingHistoryKey(key);
        var history: string | any[] = this.ariaNgStorageService.get(storageKey) || [];
        var newHistory = [];

        for (var i = 0; i < Math.min(history.length, AriaNgConstants.historyMaxStoreCount); i++) {
            newHistory.push(history[i]);
        }

        return newHistory;
    };
    addSettingHistory (key: string, value: any) {
        if (!this.isOptionKeyValid(key)) {
            return [];
        }

        var storageKey = this.getSettingHistoryKey(key);
        var history = this.ariaNgStorageService.get(storageKey) || [];
        var newHistory = [];
        newHistory.push(value);

        for (var i = 0; i < Math.min(history.length, AriaNgConstants.historyMaxStoreCount - 1); i++) {
            if (history[i] !== value) {
                newHistory.push(history[i]);
            }
        }

        this.ariaNgStorageService.set(storageKey, JSON.stringify(newHistory));

        return newHistory;
    };
    clearSettingsHistorys () {
        var keys = this.ariaNgStorageService.keys(AriaNgConstants.settingHistoryKeyPrefix + '.');

        for (var i = 0; i < keys.length; i++) {
            this.ariaNgStorageService.remove(keys[i]);
        }
    };
    getGlobalOption (callback: any, silent: any) {
        return this.aria2RpcService.getGlobalOption({
            silent: !!silent,
            callback: callback
        });
    };
    setGlobalOption (key: string | number, value: any, callback: any, silent: any) {
        var data = {};
        data[key] = value;

        return this.aria2RpcService.changeGlobalOption({
            options: data,
            silent: !!silent,
            callback: callback
        });
    };
    getAria2Status (callback, silent) {
        return this.aria2RpcService.getVersion({
            silent: !!silent,
            callback: callback
        });
    };
    getGlobalStat (callback: (arg0: any) => void, silent: any) {
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
    saveSession (callback: any, silent: any) {
        return this.aria2RpcService.saveSession({
            silent: !!silent,
            callback: callback
        });
    };
    shutdown (callback: any, silent: any) {
        return this.aria2RpcService.shutdown({
            silent: !!silent,
            callback: callback
        });
    };
    private processStatResult  (stat: { numActive: string; numWaiting: string; totalRunningCount: number; }) {
        if (!stat) {
            return stat;
        }

        let activeCount = parseInt(stat.numActive);
        let waitingCount = parseInt(stat.numWaiting);
        let totalRunningCount = activeCount + waitingCount;

        stat.totalRunningCount = totalRunningCount;

        return stat;
    };

    private getSettingHistoryKey(key: string) {
        return AriaNgConstants.settingHistoryKeyPrefix + '.' + key;
    };
}
// angular.module('ariaNg')
//     .factory('aria2SettingService', downgradeInjectable(Aria2SettingService));
