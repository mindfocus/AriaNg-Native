import {Injectable} from "@angular/core";
import {downgradeInjectable} from "@angular/upgrade/static";
declare var angular: angular.IAngularStatic;

@Injectable()
export class AriaNgStorageService {
    constructor() {
        console.log("init AriaNgStorageService");
    }
    isLocalStorageSupported() {

        return localStorage != undefined;
    }
    isCookiesSupported() {
        return true;
    }
    get (key: string) {
        return localStorage.getItem(key);
    }
    set (key: string, value: string) {
        return localStorage.setItem(key, value);
    }
    remove (key: string) {
        return localStorage.removeItem(key);
    }
    clearAll() {
        return localStorage.clear();
    }
    keys (prefix: any) {
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
    }
}
angular.module('ariaNg')
    .factory('ariaNgStorageService', downgradeInjectable(AriaNgStorageService));
