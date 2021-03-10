import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {downgradeInjectable} from "@angular/upgrade/static";
import * as stringCompare from "string-natural-compare";

declare var angular: angular.IAngularStatic;
@Injectable()
export class AriaNgVersionService {
    latestApi = 'https://api.github.com/repos/mayswind/AriaNg-Native/releases/latest';
    getTheLatestVersion() {
        console.log('call getTheLatestVersion');
        return this.http.get(this.latestApi, {
            headers:{
                'Accept': 'application/vnd.github.v3+json'
            }
        });
    }
    compareVersion(version1: string, version2: string) {
        console.log('call compare version');
        var parts1 = version1.split('.');
        var parts2 = version2.split('.');

        for (var i = 0; i < Math.max(parts1.length, parts2.length); i++) {
            if (parts1[i] && parts2[i] === undefined ) { // 1.1.1 > 1.1, 1.1.0 == 1.1
                return 1; // version1 > version2
            }

            if (parts2[i] && parts1[i] === undefined ) {
                return -1; // version1 < version2
            }

            if (parts2[i].indexOf('-') > 0 && parts1[i].indexOf('-') < 0) { // 1.1.0 > 1.1.0-beta1
                return 1; // version1 > version2
            } else if (parts1[i].indexOf('-') > 0 && parts2[i].indexOf('-') < 0) {
                return -1; // version1 < version2
            }

            var subParts1 = parts1[i].split('-');
            var subParts2 = parts2[i].split('-');

            var subPart0CompareResult = stringCompare(subParts1[0], subParts2[0]);

            if (subPart0CompareResult > 0) { // 1.1.1 > 1.1.0
                return 1; // version1 > version2
            } else if (subPart0CompareResult < 0) {
                return -1; // version1 < version2
            }

            if (subParts1[1] !== undefined && subParts2[1] !== undefined) {
                var subPart1CompareResult = stringCompare(subParts1[1], subParts2[1]);

                if (subPart1CompareResult > 0) { // 1.1.0-beta2 > 1.1.0-beta1
                    return 1; // version1 > version2
                } else if (subPart1CompareResult < 0) {
                    return -1; // version1 < version2
                }
            }
        }
        return 0;
    }
    constructor(private http: HttpClient) {
        console.log("init AriaNgVersionService")
    }
}
angular.module('ariaNg')
    .factory('ariaNgVersionService', downgradeInjectable(AriaNgVersionService));
