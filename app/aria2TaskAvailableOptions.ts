export class Aria2TaskAvailableOptions {
    // Aria2 Task Option Defination EXAMPLE:
    // {
    //     key: 'option key',
    //     category: 'global|http|bittorrent',
    //     [canShow: 'new|active|waiting|paused',] // possible to show in specific status, supporting multiple choice. if not set, always show
    //     [canUpdate: 'new|active|waiting|paused',] // possible to write in specific status, supporting multiple choice. if not set, always writable
    //     [showHistory: true|false,] // show history under the input box, only supporting "string" type. if not set, this is set to false
    // }
    static taskOptions: [
        {
            key: 'dir',
            category: 'global',
            canUpdate: 'new',
            showHistory: true
        },
        {
            key: 'out',
            category: 'http',
            canUpdate: 'new'
        },
        {
            key: 'allow-overwrite',
            category: 'global',
            canShow: 'new'
        },
        {
            key: 'max-download-limit',
            category: 'global'
        },
        {
            key: 'max-upload-limit',
            category: 'bittorrent'
        },
        {
            key: 'split',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'min-split-size',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'max-connection-per-server',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'lowest-speed-limit',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'stream-piece-selector',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'http-user',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'http-passwd',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'all-proxy',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'all-proxy-user',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'all-proxy-passwd',
            category: 'http',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'referer',
            category: 'http',
            canUpdate: 'new'
        },
        {
            key: 'header',
            category: 'http',
            canUpdate: 'new'
        },
        {
            key: 'bt-max-peers',
            category: 'bittorrent'
        },
        {
            key: 'bt-request-peer-speed-limit',
            category: 'bittorrent'
        },
        {
            key: 'bt-remove-unselected-file',
            category: 'bittorrent'
        },
        {
            key: 'bt-stop-timeout',
            category: 'bittorrent',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'bt-tracker',
            category: 'bittorrent',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'seed-ratio',
            category: 'bittorrent',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'seed-time',
            category: 'bittorrent',
            canUpdate: 'new|waiting|paused'
        },
        {
            key: 'conditional-get',
            category: 'global',
            canShow: 'new'
        },
        {
            key: 'file-allocation',
            category: 'global',
            canShow: 'new'
        },
        {
            key: 'parameterized-uri',
            category: 'global',
            canShow: 'new'
        },
        {
            key: 'force-save',
            category: 'global'
        }
    ];
}
