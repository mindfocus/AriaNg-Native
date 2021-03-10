import {Injectable} from "@angular/core";
import {AriaNgConstants} from "./ariaNgConstants";
import {AriaNgSettingService} from "./ariaNgSettingService";

@Injectable()
export class AriaNgTitleService {
    constructor(private ariaNgSettingService: AriaNgSettingService) {
    }
    getFinalTitle (context) {
        var title = this.ariaNgSettingService.getTitle();

        if (!title) {
            return AriaNgConstants.title;
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
    }
    getFinalTitleByGlobalStat (params) {
        var context = {
            currentRPCAlias: (params && params.currentRpcProfile ? (params.currentRpcProfile.rpcAlias || (params.currentRpcProfile.rpcHost + ':' + params.currentRpcProfile.rpcPort)) : ''),
            downloadingCount: (params && params.globalStat ? params.globalStat.numActive : 0),
            waitingCount: (params && params.globalStat ? params.globalStat.numWaiting : 0),
            stoppedCount: (params && params.globalStat ? params.globalStat.numStopped : 0),
            downloadSpeed: (params && params.globalStat ? params.globalStat.downloadSpeed : 0),
            uploadSpeed: (params && params.globalStat ? params.globalStat.uploadSpeed : 0)
        };

        return this.getFinalTitle(context);
    }
    parseSettings(placeholder) {
        if (!placeholder) {
            return {};
        }

        let innerText = placeholder.substring(2, placeholder.length - 1); // remove ${ and }
        let items = innerText.split(':');

        let settings = {
            oldValue: placeholder
        };

        for (let i = 1; i < items.length; i++) {
            let pairs = items[i].split('=');

            if (pairs.length === 1) {
                settings[pairs[0]] = true;
            } else if (pairs.length === 2) {
                settings[pairs[0]] = pairs[1];
            }
        }

        return settings;
    }

    replacePlaceholder(title: string, context: { value: any; type: string; scale: any; prefix: any; noprefix: any; suffix: any; nosuffix: any; oldValue: any; }) {
        let value = context.value;

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

    replacePlaceholders(title, condition, context) {
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

    replaceCurrentRPCAlias(title, value) {
        return this.replacePlaceholders(title, 'rpcprofile', {
            value: value
        });
    };

    replaceDownloadingCount(title, value) {
        return replacePlaceholders(title, 'downloading', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Downloading') + ': ',
            value: value
        });
    };

    replaceWaitingCount(title, value) {
        return replacePlaceholders(title, 'waiting', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Waiting') + ': ',
            value: value
        });
    };

    replaceStoppedCount(title, value) {
        return this.replacePlaceholders(title, 'stopped', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Finished / Stopped') + ': ',
            value: value
        });
    };

    replaceDownloadSpeed(title, value) {
        return this.replacePlaceholders(title, 'downspeed', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Download') + ': ',
            value: value,
            type: 'volume',
            suffix: '/s'
        });
    };

    replaceUploadSpeed(title, value) {
        return this.replacePlaceholders(title, 'upspeed', {
            prefix: this.ariaNgLocalizationService.getLocalizedText('Upload') + ': ',
            value: value,
            type: 'volume',
            suffix: '/s'
        });
    };

    replaceAgiaNgTitle(title) {
        return this.replacePlaceholders(title, 'title', {
            value: AriaNgConstants.title
        });
    };
}
