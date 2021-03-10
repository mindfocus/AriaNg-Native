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
exports.AriaNgLogService = void 0;
var core_1 = require("@angular/core");
var static_1 = require("@angular/upgrade/static");
var ariaNgConstants_1 = require("./ariaNgConstants");
var AriaNgLogService = /** @class */ (function () {
    function AriaNgLogService() {
        this.enableDebugLog = false;
        this.cachedDebugLogs = [];
        console.log('init AriaNgLogService');
    }
    AriaNgLogService.prototype.createNewCacheLogItem = function (msg, level, obj) {
        return {
            time: new Date(),
            level: level,
            content: msg,
            attachment: obj
        };
    };
    AriaNgLogService.prototype.pushLogToCache = function (msg, level, obj) {
        if (!this.enableDebugLog) {
            return;
        }
        if (this.cachedDebugLogs.length >= ariaNgConstants_1.AriaNgConstants.cachedDebugLogsLimit) {
            this.cachedDebugLogs.shift();
        }
        this.cachedDebugLogs.push(this.createNewCacheLogItem(msg, level, obj));
    };
    AriaNgLogService.prototype.setEnableDebugLog = function (value) {
        this.enableDebugLog = value;
    };
    AriaNgLogService.prototype.debug = function (msg, obj) {
        if (this.enableDebugLog) {
            if (obj) {
                console.debug('[AriaNg Debug]' + msg, obj);
            }
            else {
                console.debug('[AriaNg Debug]' + msg);
            }
            this.pushLogToCache(msg, 'DEBUG', obj);
        }
    };
    AriaNgLogService.prototype.info = function (msg, obj) {
        if (obj) {
            console.info('[AriaNg Info]' + msg, obj);
        }
        else {
            console.info('[AriaNg Info]' + msg);
        }
        this.pushLogToCache(msg, 'INFO', obj);
    };
    AriaNgLogService.prototype.warn = function (msg, obj) {
        if (obj) {
            console.warn('[AriaNg Warn]' + msg, obj);
        }
        else {
            console.warn('[AriaNg Warn]' + msg);
        }
        this.pushLogToCache(msg, 'WARN', obj);
    };
    AriaNgLogService.prototype.error = function (msg, obj) {
        if (obj) {
            console.error('[AriaNg Error]' + msg, obj);
        }
        else {
            console.error('[AriaNg Error]' + msg);
        }
        this.pushLogToCache(msg, 'ERROR', obj);
    };
    AriaNgLogService.prototype.getDebugLogs = function () {
        if (this.enableDebugLog) {
            return this.cachedDebugLogs;
        }
        else {
            return [];
        }
    };
    AriaNgLogService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AriaNgLogService);
    return AriaNgLogService;
}());
exports.AriaNgLogService = AriaNgLogService;
angular.module('ariaNg')
    .factory('ariaNgLogService', static_1.downgradeInjectable(AriaNgLogService));
//# sourceMappingURL=ariaNgLogService.js.map