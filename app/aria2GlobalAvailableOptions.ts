export class Aria2GlobalAvailableOptions {
    static basicOptions: [
        'dir', 'log', 'max-concurrent-downloads', 'check-integrity', 'continue'
    ];
    static httpFtpSFtpOptions: [
        'all-proxy', 'all-proxy-user', 'all-proxy-passwd', 'connect-timeout', 'dry-run', 'lowest-speed-limit',
        'max-connection-per-server', 'max-file-not-found', 'max-tries', 'min-split-size', 'netrc-path', 'no-netrc',
        'no-proxy', 'proxy-method', 'remote-time', 'reuse-uri', 'retry-wait', 'server-stat-of',
        'server-stat-timeout', 'split', 'stream-piece-selector', 'timeout', 'uri-selector'
    ];
    static httpOptions: [
        'check-certificate', 'http-accept-gzip', 'http-auth-challenge', 'http-no-cache', 'http-user',
        'http-passwd', 'http-proxy', 'http-proxy-user', 'http-proxy-passwd', 'https-proxy', 'https-proxy-user',
        'https-proxy-passwd', 'referer', 'enable-http-keep-alive', 'enable-http-pipelining', 'header',
        'save-cookies', 'use-head', 'user-agent'
    ];
    static ftpSFtpOptions: [
        'ftp-user', 'ftp-passwd', 'ftp-pasv', 'ftp-proxy', 'ftp-proxy-user', 'ftp-proxy-passwd',
        'ftp-type', 'ftp-reuse-connection', 'ssh-host-key-md'
    ];
    static btOptions: [
        'bt-detach-seed-only', 'bt-enable-hook-after-hash-check', 'bt-enable-lpd', 'bt-exclude-tracker',
        'bt-external-ip', 'bt-force-encryption', 'bt-hash-check-seed', 'bt-load-saved-metadata', 'bt-max-open-files', 'bt-max-peers',
        'bt-metadata-only', 'bt-min-crypto-level', 'bt-prioritize-piece', 'bt-remove-unselected-file',
        'bt-require-crypto', 'bt-request-peer-speed-limit', 'bt-save-metadata', 'bt-seed-unverified',
        'bt-stop-timeout', 'bt-tracker', 'bt-tracker-connect-timeout', 'bt-tracker-interval', 'bt-tracker-timeout',
        'dht-file-path', 'dht-file-path6', 'dht-listen-port', 'dht-message-timeout', 'enable-dht', 'enable-dht6',
        'enable-peer-exchange', 'follow-torrent', 'listen-port', 'max-overall-upload-limit', 'max-upload-limit',
        'peer-id-prefix', 'peer-agent', 'seed-ratio', 'seed-time'
    ];
    static metalinkOptions: [
        'follow-metalink', 'metalink-base-uri', 'metalink-language', 'metalink-location', 'metalink-os',
        'metalink-version', 'metalink-preferred-protocol', 'metalink-enable-unique-protocol'
    ];
    static rpcOptions: [
        'enable-rpc', 'pause-metadata', 'rpc-allow-origin-all', 'rpc-listen-all', 'rpc-listen-port',
        'rpc-max-request-size', 'rpc-save-upload-metadata', 'rpc-secure'
    ];
    static advancedOptions: [
        'allow-overwrite', 'allow-piece-length-change', 'always-resume', 'async-dns', 'auto-file-renaming',
        'auto-save-interval', 'conditional-get', 'conf-path', 'console-log-level', 'content-disposition-default-utf8', 'daemon',
        'deferred-input', 'disable-ipv6', 'disk-cache', 'download-result', 'dscp', 'rlimit-nofile', 'enable-color', 'enable-mmap',
        'event-poll', 'file-allocation', 'force-save', 'save-not-found', 'hash-check-only', 'human-readable',
        'keep-unfinished-download-result', 'max-download-result', 'max-mmap-limit', 'max-resume-failure-tries',
        'min-tls-version', 'log-level', 'optimize-concurrent-downloads', 'piece-length', 'show-console-readout',
        'summary-interval', 'max-overall-download-limit', 'max-download-limit', 'no-conf',
        'no-file-allocation-limit', 'parameterized-uri', 'quiet', 'realtime-chunk-checksum', 'remove-control-file',
        'save-session', 'save-session-interval', 'socket-recv-buffer-size', 'stop', 'truncate-console-readout'
    ];
}
