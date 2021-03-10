import {Injectable} from "@angular/core";

export class Aria2AllOptions {
    static 'gid': {
        type: 'string',
        readonly: true,
        required: true
    };
    static 'dir': {
        type: 'string',
        required: true
    };
    static 'log': {
        type: 'string',
        required: true
    };
    static 'max-concurrent-downloads': {
        type: 'integer',
        defaultValue: '5',
        required: true,
        min: 1
    };
    static 'check-integrity': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    static 'continue': {
        type: 'boolean',
        required: true
    };
    static 'all-proxy': {
        type: 'string'
    };
    static 'all-proxy-user': {
        type: 'string'
    };
    static 'all-proxy-passwd': {
        type: 'string'
    };
    static 'connect-timeout': {
        type: 'integer',
        suffix: 'Seconds',
        defaultValue: '60',
        required: true,
        min: 1,
        max: 600
    };
    static 'dry-run': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    static 'lowest-speed-limit': {
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '0',
        required: true,
        pattern: '^(0|[1-9]\\d*(K|k|M|m)?)$'
    };
    static 'max-connection-per-server': {
        type: 'integer',
        defaultValue: '1',
        required: true,
        min: 1,
        max: 16
    };
    static 'max-file-not-found': {
        type: 'integer',
        defaultValue: '0',
        required: true,
        min: 0
    };
    static 'max-tries': {
        type: 'integer',
        defaultValue: '5',
        required: true,
        min: 0
    };
    static 'min-split-size': {
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '20M',
        required: true,
        pattern: '^(0|[1-9]\\d*(K|k|M|m)?)$'
    };
    static 'netrc-path': {
        type: 'string',
        readonly: true,
        defaultValue: '$(HOME)/.netrc'
    };
    static 'no-netrc': {
        type: 'boolean',
        required: true
    };
    static 'no-proxy': {
        type: 'text',
        split: ',',
        showCount: true
    };
    static 'out': {
        type: 'string'
    };
    static 'proxy-method': {
        type: 'option',
        options: ['get', 'tunnel'],
        defaultValue: 'get',
        required: true
    };
    static 'remote-time': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    static 'reuse-uri': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    static 'retry-wait': {
        type: 'integer',
        suffix: 'Seconds',
        defaultValue: '0',
        required: true,
        min: 0,
        max: 600
    };
    static 'server-stat-of': {
        type: 'string'
    };
    static 'server-stat-timeout': {
        type: 'integer',
        suffix: 'Seconds',
        readonly: true,
        defaultValue: '86400'
    };
    static 'split': {
        type: 'integer',
        defaultValue: '5',
        required: true,
        min: 1
    };
    static 'stream-piece-selector': {
        type: 'option',
        options: ['default', 'inorder', 'random', 'geom'],
        defaultValue: 'default',
        required: true
    };
    static 'timeout': {
        type: 'integer',
        suffix: 'Seconds',
        defaultValue: '60',
        required: true,
        min: 1,
        max: 600
    };
    static 'uri-selector': {
        type: 'option',
        options: ['inorder', 'feedback', 'adaptive'],
        defaultValue: 'feedback',
        required: true
    };
    static 'check-certificate': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'true'
    };
    static 'http-accept-gzip': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    static 'http-auth-challenge': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    static 'http-no-cache': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    static 'http-user': {
        type: 'string'
    };
    static 'http-passwd': {
        type: 'string'
    };
    static 'http-proxy': {
        type: 'string'
    };
    'http-proxy-user': {
        type: 'string'
    };
    'http-proxy-passwd': {
        type: 'string'
    };
    'https-proxy': {
        type: 'string'
    };
    'https-proxy-user': {
        type: 'string'
    };
    'https-proxy-passwd': {
        type: 'string'
    };
    'referer': {
        type: 'string'
    };
    'enable-http-keep-alive': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'enable-http-pipelining': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'header': {
        type: 'text',
        split: '\n',
        submitFormat: 'array',
        showCount: true
    };
    'save-cookies': {
        type: 'string'
    };
    'use-head': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'user-agent': {
        type: 'string',
        defaultValue: 'aria2/$VERSION'
    };
    'ftp-user': {
        type: 'string',
        defaultValue: 'anonymous'
    };
    'ftp-passwd': {
        type: 'string',
        defaultValue: 'ARIA2USER@'
    };
    'ftp-pasv': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'ftp-proxy': {
        type: 'string'
    };
    'ftp-proxy-user': {
        type: 'string'
    };
    'ftp-proxy-passwd': {
        type: 'string'
    };
    'ftp-type': {
        type: 'option',
        options: ['binary', 'ascii'],
        defaultValue: 'binary',
        required: true
    };
    'ftp-reuse-connection': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'ssh-host-key-md': {
        type: 'string'
    };
    'show-files': {
        type: 'boolean',
        readonly: true
    };
    'bt-detach-seed-only': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'false'
    };
    'bt-enable-hook-after-hash-check': {
        since: '1.19.3',
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'bt-enable-lpd': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'bt-exclude-tracker': {
        type: 'text',
        split: ',',
        showCount: true
    };
    'bt-external-ip': {
        type: 'string'
    };
    'bt-force-encryption': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'bt-hash-check-seed': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'bt-load-saved-metadata': {
        since: '1.33.0',
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'bt-max-open-files': {
        type: 'integer',
        defaultValue: '100',
        required: true,
        min: 1
    };
    'bt-max-peers': {
        type: 'integer',
        defaultValue: '55',
        required: true,
        min: 0
    };
    'bt-metadata-only': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'bt-min-crypto-level': {
        type: 'option',
        options: ['plain', 'arc4'],
        defaultValue: 'plain',
        required: true
    };
    'bt-prioritize-piece': {
        type: 'string'
    };
    'bt-remove-unselected-file': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'bt-require-crypto': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'bt-request-peer-speed-limit': {
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '50K',
        required: true,
        pattern: '^(0|[1-9]\\d*(K|k|M|m)?)$'
    };
    'bt-save-metadata': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'bt-seed-unverified': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'bt-stop-timeout': {
        type: 'integer',
        suffix: 'Seconds',
        defaultValue: '0',
        required: true,
        min: 0
    };
    'bt-tracker': {
        type: 'text',
        split: ',',
        showCount: true
    };
    'bt-tracker-connect-timeout': {
        type: 'integer',
        suffix: 'Seconds',
        defaultValue: '60',
        required: true,
        min: 1,
        max: 600
    };
    'bt-tracker-interval': {
        type: 'integer',
        suffix: 'Seconds',
        defaultValue: '0',
        required: true,
        min: 0
    };
    'bt-tracker-timeout': {
        type: 'integer',
        suffix: 'Seconds',
        defaultValue: '60',
        required: true,
        min: 1,
        max: 600
    };
    'dht-file-path': {
        type: 'string',
        readonly: true,
        defaultValue: '$HOME/.aria2/dht.dat'
    };
    'dht-file-path6': {
        type: 'string',
        readonly: true,
        defaultValue: '$HOME/.aria2/dht6.dat'
    };
    'dht-listen-port': {
        type: 'string',
        readonly: true,
        defaultValue: '6881-6999'
    };
    'dht-message-timeout': {
        type: 'integer',
        suffix: 'Seconds',
        readonly: true,
        defaultValue: '10'
    };
    'enable-dht': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'true'
    };
    'enable-dht6': {
        type: 'boolean',
        readonly: true
    };
    'enable-peer-exchange': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'follow-torrent': {
        type: 'option',
        options: ['true', 'false', 'mem'],
        defaultValue: 'true',
        required: true
    };
    'listen-port': {
        type: 'integer',
        readonly: true,
        defaultValue: '6881-6999'
    };
    'max-overall-upload-limit': {
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '0',
        required: true,
        pattern: '^(0|[1-9]\\d*(K|k|M|m)?)$'
    };
    'max-upload-limit': {
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '0',
        required: true,
        pattern: '^(0|[1-9]\\d*(K|k|M|m)?)$'
    };
    'peer-id-prefix': {
        type: 'string',
        readonly: true,
        defaultValue: 'A2-$MAJOR-$MINOR-$PATCH-'
    };
    'peer-agent': {
        since: '1.33.0',
        type: 'string',
        defaultValue: 'aria2/$MAJOR.$MINOR.$PATCH',
        readonly: true
    };
    'seed-ratio': {
        type: 'float',
        defaultValue: '1.0',
        required: true,
        min: 0
    };
    'seed-time': {
        type: 'float',
        suffix: 'Minutes',
        required: true,
        min: 0
    };
    'follow-metalink': {
        type: 'option',
        options: ['true', 'false', 'mem'],
        defaultValue: 'true',
        required: true
    };
    'metalink-base-uri': {
        type: 'string'
    };
    'metalink-language': {
        type: 'string'
    };
    'metalink-location': {
        type: 'string'
    };
    'metalink-os': {
        type: 'string'
    };
    'metalink-version': {
        type: 'string'
    };
    'metalink-preferred-protocol': {
        type: 'option',
        options: ['http', 'https', 'ftp', 'none'],
        defaultValue: 'none',
        required: true
    };
    'metalink-enable-unique-protocol': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'enable-rpc': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'false'
    };
    'pause-metadata': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'rpc-allow-origin-all': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'false'
    };
    'rpc-listen-all': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'false'
    };
    'rpc-listen-port': {
        type: 'integer',
        readonly: true,
        defaultValue: '6800'
    };
    'rpc-max-request-size': {
        type: 'string',
        suffix: 'Bytes',
        readonly: true,
        defaultValue: '2M'
    };
    'rpc-save-upload-metadata': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'rpc-secure': {
        type: 'boolean',
        readonly: true
    };
    'allow-overwrite': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'allow-piece-length-change': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'always-resume': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'async-dns': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'auto-file-renaming': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'auto-save-interval': {
        type: 'integer',
        suffix: 'Seconds',
        readonly: true,
        defaultValue: '60'
    };
    'conditional-get': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'conf-path': {
        type: 'string',
        readonly: true,
        defaultValue: '$HOME/.aria2/aria2.conf'
    };
    'console-log-level': {
        type: 'option',
        options: ['debug', 'info', 'notice', 'warn', 'error'],
        readonly: true,
        defaultValue: 'notice'
    };
    'content-disposition-default-utf8': {
        since: '1.31.0',
        type: 'boolean',
        defaultValue: 'false'
    };
    'daemon': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'false'
    };
    'deferred-input': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'false'
    };
    'disable-ipv6': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'false'
    };
    'disk-cache': {
        type: 'string',
        suffix: 'Bytes',
        readonly: true,
        defaultValue: '16M'
    };
    'download-result': {
        type: 'option',
        options: ['default', 'full', 'hide'],
        defaultValue: 'default',
        required: true
    };
    'dscp': {
        type: 'string',
        readonly: true
    };
    'rlimit-nofile': {
        type: 'string',
        readonly: true
    };
    'enable-color': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'true'
    };
    'enable-mmap': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'event-poll': {
        type: 'option',
        options: ['epoll', 'kqueue', 'port', 'poll', 'select'],
        readonly: true
    };
    'file-allocation': {
        type: 'option',
        options: ['none', 'prealloc', 'trunc', 'falloc'],
        defaultValue: 'prealloc',
        required: true
    };
    'force-save': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'save-not-found': {
        since: '1.27.0',
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'hash-check-only': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    'human-readable': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'true'
    };
    'keep-unfinished-download-result': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    'max-download-result': {
        type: 'integer',
        defaultValue: '1000',
        required: true,
        min: 0
    };
    'max-mmap-limit': {
        since: '1.20.0',
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '9223372036854775807',
        required: true,
        pattern: '^(0|[1-9]\\d*(K|k|M|m)?)$'
    };
    'max-resume-failure-tries': {
        type: 'integer',
        defaultValue: '0',
        required: true,
        min: 0
    };
    'min-tls-version': {
        type: 'option',
        options: ['SSLv3', 'TLSv1', 'TLSv1.1', 'TLSv1.2'],
        readonly: true,
        defaultValue: 'TLSv1'
    };
    'log-level': {
        type: 'option',
        options: ['debug', 'info', 'notice', 'warn', 'error'],
        defaultValue: 'debug',
        required: true
    };
    'optimize-concurrent-downloads': {
        since: '1.22.0',
        type: 'string',
        defaultValue: 'false'
    };
    'piece-length': {
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '1M',
        required: true,
        pattern: '^(0|[1-9]\\d*(M|m)?)$'
    };
    'show-console-readout': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'true'
    };
    static 'summary-interval': {
        type: 'integer',
        suffix: 'Seconds',
        readonly: true,
        defaultValue: '60'
    };
    static 'max-overall-download-limit': {
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '0',
        required: true,
        pattern: '^(0|[1-9]\\d*(K|k|M|m)?)$'
    };
    static 'max-download-limit': {
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '0',
        required: true,
        pattern: '^(0|[1-9]\\d*(K|k|M|m)?)$'
    };
    static 'no-conf': {
        type: 'boolean',
        readonly: true
    };
    static 'no-file-allocation-limit': {
        type: 'string',
        suffix: 'Bytes',
        defaultValue: '5M',
        required: true,
        pattern: '^(0|[1-9]\\d*(K|k|M|m)?)$'
    };
    static 'parameterized-uri': {
        type: 'boolean',
        defaultValue: 'false',
        required: true
    };
    static 'quiet': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'false'
    };
    static 'realtime-chunk-checksum': {
        type: 'boolean',
        defaultValue: 'true',
        required: true
    };
    static 'remove-control-file': {
        type: 'boolean',
        required: true
    };
    static 'save-session': {
        type: 'string'
    };
    static 'save-session-interval': {
        type: 'integer',
        suffix: 'Seconds',
        readonly: true,
        defaultValue: '0'
    };
    static 'socket-recv-buffer-size': {
        since: '1.19.3',
        type: 'string',
        suffix: 'Bytes',
        readonly: true,
        defaultValue: '0'
    };
    static 'stop': {
        type: 'integer',
        suffix: 'Seconds',
        readonly: true,
        defaultValue: '0'
    };
    static 'truncate-console-readout': {
        type: 'boolean',
        readonly: true,
        defaultValue: 'true'
    };
}

