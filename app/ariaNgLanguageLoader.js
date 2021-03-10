"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriaNgLanguageLoader = void 0;
var core_1 = require("@angular/core");
var AriaNgLanguageLoader = /** @class */ (function () {
    function AriaNgLanguageLoader() {
    }
    AriaNgLanguageLoader.prototype.getKeyValuePair = function (line) {
        for (var i = 0; i < line.length; i++) {
            if (i > 0 && line.charAt(i - 1) !== '\\' && line.charAt(i) === '=') {
                return {
                    key: line.substring(0, i).replace('\\=', '='),
                    value: line.substring(i + 1, line.length).replace('\\=', '=')
                };
            }
        }
        return {
            value: line
        };
    };
    AriaNgLanguageLoader.prototype.getCategory = function (langObj, category) {
        var currentCategory = langObj;
        if (!category) {
            return currentCategory;
        }
        if (category[0] === '[' && category[category.length - 1] === ']') {
            category = category.substring(1, category.length - 1);
        }
        if (category === 'global') {
            return currentCategory;
        }
        var categoryNames = category.split('.');
        for (var i = 0; i < categoryNames.length; i++) {
            var categoryName = categoryNames[i];
            if (!currentCategory[categoryName]) {
                currentCategory[categoryName] = {};
            }
            currentCategory = currentCategory[categoryName];
        }
        return currentCategory;
    };
    AriaNgLanguageLoader.prototype.getLanguageObject = function (languageContent) {
        var langObj = {};
        if (!languageContent) {
            return langObj;
        }
        var lines = languageContent.split('\n');
        var currentCatagory = langObj;
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (!line) {
                continue;
            }
            line = line.replace('\r', '');
            if (/^\[.+\]$/.test(line)) {
                currentCatagory = getCategory(langObj, line);
                continue;
            }
            var pair = getKeyValuePair(line);
            if (pair && pair.key) {
                currentCatagory[pair.key] = pair.value;
            }
        }
        return langObj;
    };
    AriaNgLanguageLoader.prototype.isLanguageResourceEquals = function (langObj1, langObj2) {
        if (!angular.isObject(langObj1) || !angular.isObject(langObj2)) {
            return false;
        }
        for (var key in langObj2) {
            if (!langObj2.hasOwnProperty(key)) {
                continue;
            }
            var value = langObj2[key];
            if (angular.isObject(value)) {
                var result = isLanguageResourceEquals(langObj1[key], value);
                if (!result) {
                    return false;
                }
            }
            else {
                if (value !== langObj1[key]) {
                    return false;
                }
            }
        }
        return true;
    };
    AriaNgLanguageLoader = __decorate([
        core_1.Injectable()
    ], AriaNgLanguageLoader);
    return AriaNgLanguageLoader;
}());
exports.AriaNgLanguageLoader = AriaNgLanguageLoader;
//# sourceMappingURL=ariaNgLanguageLoader.js.map