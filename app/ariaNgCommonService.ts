import {Injectable} from "@angular/core";
import {AriaNgConstants} from "./ariaNgConstants";
import * as moment from "moment";
import {downgradeInjectable} from "@angular/upgrade/static";
declare var angular: angular.IAngularStatic;
@Injectable()
export class AriaNgCommonService {
    base64Encode (value: string) {
        return btoa(value);
    };
    base64Decode (value: string) {
        return atob(value);
    };
    base64UrlDecode (value: string) {
        return encodeURI(value);
    };
    generateUniqueId () {
        var sourceId = AriaNgConstants.appPrefix + '_' + Math.round(new Date().getTime() / 1000) + '_' + Math.random();
        var hashedId = this.base64Encode(sourceId);

        return hashedId;
    };
    showDialog (title, text, type, callback, options) {
        console.log("dialog: ", text)
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
    confirm (title, text, type, callback, notClose, extendSettings) {
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

        console.log("dialog: ", text)

    };
    closeAllDialogs () {
        console.log("dialog: close")
    };
    getFileExtension (filePath: string) {
        if (!filePath || filePath.lastIndexOf('.') < 0) {
            return filePath;
        }

        return filePath.substring(filePath.lastIndexOf('.'));
    };
    parseUrlsFromOriginInput (s: string) {
        if (!s) {
            return [];
        }

        var lines = s.split('\n');
        var result = [];

        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];

            if (line.match(/^(http|https|ftp|sftp):\/\/.+$/)) {
                result.push(line);
            } else if (line.match(/^magnet:\?.+$/)) {
                result.push(line);
            }
        }

        return result;
    };
    decodePercentEncodedString (s) {
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
            } else {
                ret += ch;
            }
        }

        return ret;
    };
    extendArray (sourceArray: string | any[], targetArray: string | any[], keyProperty: string | number) {
        if (!targetArray || !sourceArray || sourceArray.length !== targetArray.length) {
            return false;
        }

        for (var i = 0; i < targetArray.length; i++) {
            if (targetArray[i][keyProperty] === sourceArray[i][keyProperty]) {
                // angular.extend(targetArray[i], sourceArray[i]);
                Object.assign(targetArray[i], sourceArray[i]);
            } else {
                return false;
            }
        }

        return true;
    };
    copyObjectTo (from1, to) {
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
            } else {
                if (fromValue !== toValue) {
                    to[name] = fromValue;
                }
            }
        }

        return to;
    };
    pushArrayTo (array, items) {
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
    combineArray () {
        var result = [];

        for (var i = 0; i < arguments.length; i++) {
            if (Array.isArray(arguments[i])) {
                this.pushArrayTo(result, arguments[i]);
            } else {
                result.push(arguments[i]);
            }
        }

        return result;
    };
    countArray (array, value) {
        if (!Array.isArray(array) || array.length < 1) {
            return 0;
        }

        var count = 0;

        for (var i = 0; i < array.length; i++) {
            count += (array[i] === value ? 1 : 0);
        }

        return count;
    };
    parseOrderType (value) {
        var values = value.split(':');

        var obj = {
            type: values[0],
            order: values[1],
            equals: function (obj) {
                if (typeof obj.order === 'undefined') {
                    return this.type === obj.type;
                } else {
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
    getCurrentUnixTime () {
        return moment().format('X');
    };
    getLongTimeFromUnixTime (unixTime) {
        return moment(unixTime, 'X').format('HH:mm:ss');
    };
    formatDateTime (datetime, format) {
        return moment(datetime).format(format);
    };
    getTimeOptions (timeList, withDisabled) {
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
            } else if (time < 1000 * 60) {
                value = time / 1000;
                name = (value === 1 ? 'format.time.second' : 'format.time.seconds');
            } else if (time < 1000 * 60 * 24) {
                value = time / 1000 / 60;
                name = (value === 1 ? 'format.time.minute' : 'format.time.minutes');
            } else {
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
    }
}
angular.module('ariaNg')
    .factory('ariaNgCommonService', downgradeInjectable(AriaNgCommonService));
