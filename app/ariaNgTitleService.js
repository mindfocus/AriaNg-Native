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
exports.AriaNgTitleService = void 0;
var core_1 = require("@angular/core");
var ariaNgConstants_1 = require("./ariaNgConstants");
var ariaNgSettingService_1 = require("./ariaNgSettingService");
var AriaNgTitleService = /** @class */ (function () {
    function AriaNgTitleService(ariaNgSettingService) {
        this.ariaNgSettingService = ariaNgSettingService;
    }
    AriaNgTitleService.prototype.getFinalTitle = function (context) {
        var title = this.ariaNgSettingService.getTitle();
        if (!title) {
            return ariaNgConstants_1.AriaNgConstants.title;
        }
        context = Object.assign({
            downloadingCount: 0,
            waitingCount: 0,
            stoppedCount: 0,
            downloadSpeed: 0,
            uploadSpeed: 0
        }, context);
        title = this.replaceCurrentRPCAlias(title, context.currentRPCAlias);
        title = this.replaceDownloadingCount(title, context.downloadingCount);
        title = this.replaceWaitingCount(title, context.waitingCount);
        title = this.replaceStoppedCount(title, context.stoppedCount);
        title = this.replaceDownloadSpeed(title, context.downloadSpeed);
        title = this.replaceUploadSpeed(title, context.uploadSpeed);
        title = this.replaceAgiaNgTitle(title);
        return title;
    };
    AriaNgTitleService.prototype.getFinalTitleByGlobalStat = function (params) {
        var context = {
            currentRPCAlias: (params && params.currentRpcProfile ? (params.currentRpcProfile.rpcAlias || (params.currentRpcProfile.rpcHost + ':' + params.currentRpcProfile.rpcPort)) : ''),
            downloadingCount: (params && params.globalStat ? params.globalStat.numActive : 0),
            waitingCount: (params && params.globalStat ? params.globalStat.numWaiting : 0),
            stoppedCount: (params && params.globalStat ? params.globalStat.numStopped : 0),
            downloadSpeed: (params && params.globalStat ? params.globalStat.downloadSpeed : 0),
            uploadSpeed: (params && params.globalStat ? params.globalStat.uploadSpeed : 0)
        };
        return this.getFinalTitle(context);
    };
    AriaNgTitleService.prototype.parseSettings = function (placeholder) {
        if (!placeholder) {
            return {};
        }
        var innerText = placeholder.substring(2, placeholder.length - 1); // remove ${ and }
        var items = innerText.split(':');
        var settings = {
            oldValue: placeholder
        };
        for (var i = 1; i < items.length; i++) {
            var pairs = items[i].split('=');
            if (pairs.length === 1) {
                settings[pairs[0]] = true;
            }
            else if (pairs.length === 2) {
                settings[pairs[0]] = pairs[1];
            }
        }
        return settings;
    };
    AriaNgTitleService.prototype.replacePlaceholder = function (title, context) {
        var value = context.value;
        if (context.type === 'volume') {
            value = $filter('readableVolume')(value, context.scale);
        }
        if (context.prefix && !context.noprefix) {
            value = context.prefix + value;
        }
        if (context.suffix && !context.nosuffix) {
            value = value + context.suffix;
        }
        return title.replace(context.oldValue, value);
    };
    ;
    AriaNgTitleService.prototype.replacePlaceholders = function (title, condition, context) {
        regex = new RegExp('\\$\\{' + condition + '(:[a-zA-Z0-9]+(=[a-zA-Z0-9]+)?)*\\}', 'g');
        results = title.match(regex);
        if (results && results.length > 0) {
            for (i = 0; i < results.length; i++) {
                innerContext = parseSettings(results[i]);
                angular.extend(innerContext, context);
                title = this.replacePlaceholder(title, innerContext);
            }
        }
        return title;
    };
    ;
    AriaNgTitleService.prototype.replaceCurrentRPCAlias = function (title, value) {
        return this.replacePlaceholders(title, 'rpcprofile', {
            value: value
        });
    };
    ;
    AriaNgTitleService.prototype.replaceDownloadingCount = function (title, value) {
        return replacePlaceholders(title, 'downloading', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Downloading') + ': ',
            value: value
        });
    };
    ;
    AriaNgTitleService.prototype.replaceWaitingCount = function (title, value) {
        return replacePlaceholders(title, 'waiting', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Waiting') + ': ',
            value: value
        });
    };
    ;
    AriaNgTitleService.prototype.replaceStoppedCount = function (title, value) {
        return this.replacePlaceholders(title, 'stopped', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Finished / Stopped') + ': ',
            value: value
        });
    };
    ;
    AriaNgTitleService.prototype.replaceDownloadSpeed = function (title, value) {
        return this.replacePlaceholders(title, 'downspeed', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Download') + ': ',
            value: value,
            type: 'volume',
            suffix: '/s'
        });
    };
    ;
    AriaNgTitleService.prototype.replaceUploadSpeed = function (title, value) {
        return this.replacePlaceholders(title, 'upspeed', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Upload') + ': ',
            value: value,
            type: 'volume',
            suffix: '/s'
        });
    };
    ;
    AriaNgTitleService.prototype.replaceAgiaNgTitle = function (title) {
        return this.replacePlaceholders(title, 'title', {
            value: ariaNgConstants_1.AriaNgConstants.title
        });
    };
    ;
    AriaNgTitleService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [ariaNgSettingService_1.AriaNgSettingService])
    ], AriaNgTitleService);
    return AriaNgTitleService;
}());
exports.AriaNgTitleService = AriaNgTitleService;
//# sourceMappingURL=ariaNgTitleService.js.map