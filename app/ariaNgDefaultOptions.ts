export class AriaNgDefaultOptions {
    static language = 'en';
    static theme = 'light';
    static title = '${downspeed}; ${upspeed} - ${title}';
    static titleRefreshInterval = 5000;
    static browserNotification = false;
    static rpcAlias = '';
    static rpcHost = '';
    static rpcPort = '6800';
    static rpcInterface = 'jsonrpc';
    static protocol = 'http';
    static httpMethod = 'POST';
    static secret = '';
    static extendRpcServers: any = [];
    static globalStatRefreshInterval = 1000;
    static downloadTaskRefreshInterval = 1000;
    static swipeGesture = true;
    static dragAndDropTasks = true;
    static rpcListDisplayOrder = 'recentlyUsed';
    static afterCreatingNewTask = 'task-list';
    static removeOldTaskAfterRetrying = false;
    static confirmTaskRemoval = true;
    static includePrefixWhenCopyingFromTaskDetails = true;
    static afterRetryingTask = 'task-list-downloading';
    static displayOrder = 'default:asc';
    static fileListDisplayOrder = 'default:asc';
    static peerListDisplayOrder = 'default:asc';
}
