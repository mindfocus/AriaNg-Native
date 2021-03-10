import {Injectable} from "@angular/core";
import {downgradeInjectable} from "@angular/upgrade/static";
import {AriaNgConstants} from "./ariaNgConstants";
declare var angular: angular.IAngularStatic;

@Injectable()
export class AriaNgLogService {
    constructor() {
        console.log('init AriaNgLogService');
    }
    enableDebugLog = false;
    cachedDebugLogs: { time: Date; level: string; content: string; attachment: any; }[] = [];
    createNewCacheLogItem(msg: string, level: string, obj: any) {
        return {
            time: new Date(),
            level: level,
            content: msg,
            attachment: obj
        };
    }

    pushLogToCache(msg: string, level: string, obj: any) {
        if (!this.enableDebugLog) {
            return;
        }

        if (this.cachedDebugLogs.length >= AriaNgConstants.cachedDebugLogsLimit) {
            this.cachedDebugLogs.shift();
        }

        this.cachedDebugLogs.push(this.createNewCacheLogItem(msg, level, obj));
    }
    setEnableDebugLog (value: boolean) {
        this.enableDebugLog = value;
    }
    debug (msg: string, obj: any) {
        if (this.enableDebugLog) {
            if (obj) {
                console.debug('[AriaNg Debug]' + msg, obj);
            } else {
                console.debug('[AriaNg Debug]' + msg);
            }

            this.pushLogToCache(msg, 'DEBUG', obj);
        }
    }
    info (msg: string, obj?: any) {
        if (obj) {
            console.info('[AriaNg Info]' + msg, obj);
        } else {
            console.info('[AriaNg Info]' + msg);
        }

        this.pushLogToCache(msg, 'INFO', obj);
    }
    warn (msg: string, obj: any) {
        if (obj) {
            console.warn('[AriaNg Warn]' + msg, obj);
        } else {
            console.warn('[AriaNg Warn]' + msg);
        }

        this.pushLogToCache(msg, 'WARN', obj);
    }
    error (msg: string, obj: any) {
        if (obj) {
            console.error('[AriaNg Error]' + msg, obj);
        } else {
            console.error('[AriaNg Error]' + msg);
        }

        this.pushLogToCache(msg, 'ERROR', obj);
    }
    getDebugLogs () {
        if (this.enableDebugLog) {
            return this.cachedDebugLogs;
        } else {
            return [];
        }
    }

}
angular.module('ariaNg')
    .factory('ariaNgLogService', downgradeInjectable(AriaNgLogService));
