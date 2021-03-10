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
exports.AriaNgVersionService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var static_1 = require("@angular/upgrade/static");
var stringCompare = require("string-natural-compare");
var AriaNgVersionService = /** @class */ (function () {
    function AriaNgVersionService(http) {
        this.http = http;
        this.latestApi = 'https://api.github.com/repos/mayswind/AriaNg-Native/releases/latest';
        console.log("init AriaNgVersionService");
    }
    AriaNgVersionService.prototype.getTheLatestVersion = function () {
        console.log('call getTheLatestVersion');
        return this.http.get(this.latestApi, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });
    };
    AriaNgVersionService.prototype.compareVersion = function (version1, version2) {
        console.log('call compare version');
        var parts1 = version1.split('.');
        var parts2 = version2.split('.');
        for (var i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            if (parts1[i] && parts2[i] === undefined) { // 1.1.1 > 1.1, 1.1.0 == 1.1
                return 1; // version1 > version2
            }
            if (parts2[i] && parts1[i] === undefined) {
                return -1; // version1 < version2
            }
            if (parts2[i].indexOf('-') > 0 && parts1[i].indexOf('-') < 0) { // 1.1.0 > 1.1.0-beta1
                return 1; // version1 > version2
            }
            else if (parts1[i].indexOf('-') > 0 && parts2[i].indexOf('-') < 0) {
                return -1; // version1 < version2
            }
            var subParts1 = parts1[i].split('-');
            var subParts2 = parts2[i].split('-');
            var subPart0CompareResult = stringCompare(subParts1[0], subParts2[0]);
            if (subPart0CompareResult > 0) { // 1.1.1 > 1.1.0
                return 1; // version1 > version2
            }
            else if (subPart0CompareResult < 0) {
                return -1; // version1 < version2
            }
            if (subParts1[1] !== undefined && subParts2[1] !== undefined) {
                var subPart1CompareResult = stringCompare(subParts1[1], subParts2[1]);
                if (subPart1CompareResult > 0) { // 1.1.0-beta2 > 1.1.0-beta1
                    return 1; // version1 > version2
                }
                else if (subPart1CompareResult < 0) {
                    return -1; // version1 < version2
                }
            }
        }
        return 0;
    };
    AriaNgVersionService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], AriaNgVersionService);
    return AriaNgVersionService;
}());
exports.AriaNgVersionService = AriaNgVersionService;
angular.module('ariaNg')
    .factory('ariaNgVersionService', static_1.downgradeInjectable(AriaNgVersionService));
//# sourceMappingURL=ariaNgVersionService.js.map