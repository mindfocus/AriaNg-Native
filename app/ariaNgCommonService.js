"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriaNgCommonService = void 0;
var core_1 = require("@angular/core");
var ariaNgConstants_1 = require("./ariaNgConstants");
var moment = require("moment");
var static_1 = require("@angular/upgrade/static");
var AriaNgCommonService = /** @class */ (function () {
    function AriaNgCommonService() {
    }
    AriaNgCommonService.prototype.base64Encode = function (value) {
        return btoa(value);
    };
    ;
    AriaNgCommonService.prototype.base64Decode = function (value) {
        return atob(value);
    };
    ;
    AriaNgCommonService.prototype.base64UrlDecode = function (value) {
        return encodeURI(value);
    };
    ;
    AriaNgCommonService.prototype.generateUniqueId = function () {
        var sourceId = ariaNgConstants_1.AriaNgConstants.appPrefix + '_' + Math.round(new Date().getTime() / 1000) + '_' + Math.random();
        var hashedId = this.base64Encode(sourceId);
        return hashedId;
    };
    ;
    AriaNgCommonService.prototype.showDialog = function (title, text, type, callback, options) {
        console.log("dialog: ", text);
        // $timeout(function () {
        //     SweetAlert.swal({
        //         title: title,
        //         text: text,
        //         type: type,
        //         confirmButtonText: options && options.confirmButtonText || null
        //     }, function () {
        //         if (callback) {
        //             callback();
        //         }
        //     });
        // }, 100);
    };
    ;
    AriaNgCommonService.prototype.confirm = function (title, text, type, callback, notClose, extendSettings) {
        var options = {
            title: title,
            text: text,
            type: type,
            showCancelButton: true,
            showLoaderOnConfirm: !!notClose,
            closeOnConfirm: !notClose,
            confirmButtonText: extendSettings && extendSettings.confirmButtonText || null,
            cancelButtonText: extendSettings && extendSettings.cancelButtonText || null
        };
        if (type === 'warning') {
            options.confirmButtonColor = '#F39C12';
        }
        console.log("dialog: ", text);
    };
    ;
    AriaNgCommonService.prototype.closeAllDialogs = function () {
        console.log("dialog: close");
    };
    ;
    AriaNgCommonService.prototype.getFileExtension = function (filePath) {
        if (!filePath || filePath.lastIndexOf('.') < 0) {
            return filePath;
        }
        return filePath.substring(filePath.lastIndexOf('.'));
    };
    ;
    AriaNgCommonService.prototype.parseUrlsFromOriginInput = function (s) {
        if (!s) {
            return [];
        }
        var lines = s.split('\n');
        var result = [];
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (line.match(/^(http|https|ftp|sftp):\/\/.+$/)) {
                result.push(line);
            }
            else if (line.match(/^magnet:\?.+$/)) {
                result.push(line);
            }
        }
        return result;
    };
    ;
    AriaNgCommonService.prototype.decodePercentEncodedString = function (s) {
        if (!s) {
            return s;
        }
        var ret = '';
        for (var i = 0; i < s.length; i++) {
            var ch = s.charAt(i);
            if (ch === '%' && i < s.length - 2) {
                var code = s.substring(i + 1, i + 3);
                ret += String.fromCharCode(parseInt(code, 16));
                i += 2;
            }
            else {
                ret += ch;
            }
        }
        return ret;
    };
    ;
    AriaNgCommonService.prototype.extendArray = function (sourceArray, targetArray, keyProperty) {
        if (!targetArray || !sourceArray || sourceArray.length !== targetArray.length) {
            return false;
        }
        for (var i = 0; i < targetArray.length; i++) {
            if (targetArray[i][keyProperty] === sourceArray[i][keyProperty]) {
                // angular.extend(targetArray[i], sourceArray[i]);
                Object.assign(targetArray[i], sourceArray[i]);
            }
            else {
                return false;
            }
        }
        return true;
    };
    ;
    AriaNgCommonService.prototype.copyObjectTo = function (from1, to) {
        if (!to) {
            return from1;
        }
        for (var name in from1) {
            if (!from1.hasOwnProperty(name)) {
                continue;
            }
            var fromValue = from1[name];
            var toValue = to[name];
            if (typeof fromValue === 'object' || Array.isArray(fromValue)) {
                to[name] = this.copyObjectTo(from1[name], to[name]);
            }
            else {
                if (fromValue !== toValue) {
                    to[name] = fromValue;
                }
            }
        }
        return to;
    };
    ;
    AriaNgCommonService.prototype.pushArrayTo = function (array, items) {
        if (!Array.isArray(array)) {
            array = [];
        }
        if (!Array.isArray(items) || items.length < 1) {
            return array;
        }
        for (var i = 0; i < items.length; i++) {
            array.push(items[i]);
        }
        return array;
    };
    ;
    AriaNgCommonService.prototype.combineArray = function () {
        var result = [];
        for (var i = 0; i < arguments.length; i++) {
            if (Array.isArray(arguments[i])) {
                this.pushArrayTo(result, arguments[i]);
            }
            else {
                result.push(arguments[i]);
            }
        }
        return result;
    };
    ;
    AriaNgCommonService.prototype.countArray = function (array, value) {
        if (!Array.isArray(array) || array.length < 1) {
            return 0;
        }
        var count = 0;
        for (var i = 0; i < array.length; i++) {
            count += (array[i] === value ? 1 : 0);
        }
        return count;
    };
    ;
    AriaNgCommonService.prototype.parseOrderType = function (value) {
        var values = value.split(':');
        var obj = {
            type: values[0],
            order: values[1],
            equals: function (obj) {
                if (typeof obj.order === 'undefined') {
                    return this.type === obj.type;
                }
                else {
                    return this.type === obj.type && this.order === obj.order;
                }
            },
            getValue: function () {
                return this.type + ':' + this.order;
            }
        };
        Object.defineProperty(obj, 'reverse', {
            get: function () {
                return this.order === 'desc';
            },
            set: function (value) {
                this.order = (value ? 'desc' : 'asc');
            }
        });
        return obj;
    };
    ;
    AriaNgCommonService.prototype.getCurrentUnixTime = function () {
        return moment().format('X');
    };
    ;
    AriaNgCommonService.prototype.getLongTimeFromUnixTime = function (unixTime) {
        return moment(unixTime, 'X').format('HH:mm:ss');
    };
    ;
    AriaNgCommonService.prototype.formatDateTime = function (datetime, format) {
        return moment(datetime).format(format);
    };
    ;
    AriaNgCommonService.prototype.getTimeOptions = function (timeList, withDisabled) {
        var options = [];
        if (withDisabled) {
            options.push({
                name: 'Disabled',
                value: 0,
                optionValue: 0
            });
        }
        if (!Array.isArray(timeList) || timeList.length < 1) {
            return options;
        }
        for (var i = 0; i < timeList.length; i++) {
            var time = timeList[i];
            var name = '';
            var value = time;
            if (time < 1000) {
                value = time;
                name = (value === 1 ? 'format.time.millisecond' : 'format.time.milliseconds');
            }
            else if (time < 1000 * 60) {
                value = time / 1000;
                name = (value === 1 ? 'format.time.second' : 'format.time.seconds');
            }
            else if (time < 1000 * 60 * 24) {
                value = time / 1000 / 60;
                name = (value === 1 ? 'format.time.minute' : 'format.time.minutes');
            }
            else {
                value = time / 1000 / 60 / 24;
                name = (value === 1 ? 'format.time.hour' : 'format.time.hours');
            }
            options.push({
                name: name,
                value: value,
                optionValue: time
            });
        }
        return options;
    };
    AriaNgCommonService = __decorate([
        core_1.Injectable()
    ], AriaNgCommonService);
    return AriaNgCommonService;
}());
exports.AriaNgCommonService = AriaNgCommonService;
angular.module('ariaNg')
    .factory('ariaNgCommonService', static_1.downgradeInjectable(AriaNgCommonService));
//# sourceMappingURL=ariaNgCommonService.js.map