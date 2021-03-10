"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriaNgDefaultOptions = void 0;
var AriaNgDefaultOptions = /** @class */ (function () {
    function AriaNgDefaultOptions() {
    }
    AriaNgDefaultOptions.language = 'en';
    AriaNgDefaultOptions.theme = 'light';
    AriaNgDefaultOptions.title = '${downspeed}; ${upspeed} - ${title}';
    AriaNgDefaultOptions.titleRefreshInterval = 5000;
    AriaNgDefaultOptions.browserNotification = false;
    AriaNgDefaultOptions.rpcAlias = '';
    AriaNgDefaultOptions.rpcHost = '';
    AriaNgDefaultOptions.rpcPort = '6800';
    AriaNgDefaultOptions.rpcInterface = 'jsonrpc';
    AriaNgDefaultOptions.protocol = 'http';
    AriaNgDefaultOptions.httpMethod = 'POST';
    AriaNgDefaultOptions.secret = '';
    AriaNgDefaultOptions.extendRpcServers = [];
    AriaNgDefaultOptions.globalStatRefreshInterval = 1000;
    AriaNgDefaultOptions.downloadTaskRefreshInterval = 1000;
    AriaNgDefaultOptions.swipeGesture = true;
    AriaNgDefaultOptions.dragAndDropTasks = true;
    AriaNgDefaultOptions.rpcListDisplayOrder = 'recentlyUsed';
    AriaNgDefaultOptions.afterCreatingNewTask = 'task-list';
    AriaNgDefaultOptions.removeOldTaskAfterRetrying = false;
    AriaNgDefaultOptions.confirmTaskRemoval = true;
    AriaNgDefaultOptions.includePrefixWhenCopyingFromTaskDetails = true;
    AriaNgDefaultOptions.afterRetryingTask = 'task-list-downloading';
    AriaNgDefaultOptions.displayOrder = 'default:asc';
    AriaNgDefaultOptions.fileListDisplayOrder = 'default:asc';
    AriaNgDefaultOptions.peerListDisplayOrder = 'default:asc';
    return AriaNgDefaultOptions;
}());
exports.AriaNgDefaultOptions = AriaNgDefaultOptions;
//# sourceMappingURL=ariaNgDefaultOptions.js.map