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
exports.AriaNgStorageService = void 0;
var core_1 = require("@angular/core");
var static_1 = require("@angular/upgrade/static");
var AriaNgStorageService = /** @class */ (function () {
    function AriaNgStorageService() {
        console.log("init AriaNgStorageService");
    }
    AriaNgStorageService.prototype.isLocalStorageSupported = function () {
        return localStorage != undefined;
    };
    AriaNgStorageService.prototype.isCookiesSupported = function () {
        return true;
    };
    AriaNgStorageService.prototype.get = function (key) {
        return localStorage.getItem(key);
    };
    AriaNgStorageService.prototype.set = function (key, value) {
        return localStorage.setItem(key, value);
    };
    AriaNgStorageService.prototype.remove = function (key) {
        return localStorage.removeItem(key);
    };
    AriaNgStorageService.prototype.clearAll = function () {
        return localStorage.clear();
    };
    AriaNgStorageService.prototype.keys = function (prefix) {
        var allKeys = Object.entries(localStorage);
        if (!allKeys || !allKeys.length || !prefix) {
            return allKeys;
        }
        var result = [];
        for (var i = 0; i < allKeys.length; i++) {
            if (allKeys[i].indexOf(prefix) >= 0) {
                result.push(allKeys[i]);
            }
        }
        return result;
    };
    AriaNgStorageService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [])
    ], AriaNgStorageService);
    return AriaNgStorageService;
}());
exports.AriaNgStorageService = AriaNgStorageService;
angular.module('ariaNg')
    .factory('ariaNgStorageService', static_1.downgradeInjectable(AriaNgStorageService));
//# sourceMappingURL=ariaNgStorageService.js.map