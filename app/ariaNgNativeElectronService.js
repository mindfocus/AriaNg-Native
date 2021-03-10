"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriaNgNativeElectronService = void 0;
var core_1 = require("@angular/core");
var static_1 = require("@angular/upgrade/static");
var AriaNgNativeElectronService = /** @class */ (function () {
    function AriaNgNativeElectronService() {
        this.electron = typeof window.nodeRequire === 'function' ? nodeRequire('electron') : {};
        this.remote = electron.remote || {
            require: function () {
                return {};
            }
        };
        this.ipcRenderer = electron.ipcRenderer || {};
        this.shell = electron.shell || {};
        this.config = remote.require('./config') || {};
        this.menu = remote.require('./menu') || {};
        this.tray = remote.require('./tray') || {};
        this.localfs = remote.require('./localfs') || {};
    }
    AriaNgNativeElectronService.prototype.getSetting = function (item) {
        if (!remote || !remote.getGlobal) {
            return null;
        }
        settings = remote.getGlobal('settings');
        if (!settings) {
            return null;
        }
        return settings[item];
    };
    AriaNgNativeElectronService.prototype.getCurrentWindow = function () {
        if (!remote || !remote.getCurrentWindow) {
            return {};
        }
        return remote.getCurrentWindow();
    };
    AriaNgNativeElectronService.prototype.onMainWindowEvent = function (event, callback) {
        getCurrentWindow().on && getCurrentWindow().on(event, callback);
    };
    AriaNgNativeElectronService.prototype.onMainProcessMessage = function (channel, callback) {
        ipcRenderer.on && ipcRenderer.on(channel, callback);
    };
    AriaNgNativeElectronService.prototype.removeMainProcessCallback = function (channel, callback) {
        ipcRenderer.removeListener && ipcRenderer.removeListener(channel, callback);
    };
    AriaNgNativeElectronService.prototype.sendMessageToMainProcess = function (channel, message) {
        ipcRenderer.send && ipcRenderer.send(channel, message);
    };
    AriaNgNativeElectronService.prototype.getRuntimeEnvironment = function () {
        if (!remote.process || !remote.process.versions) {
            return null;
        }
        var versions = remote.process.versions;
        var items = [];
        items.push({ name: 'Electron', value: versions.electron });
        items.push({ name: 'Node.js', value: versions.node });
        items.push({ name: 'Chrome', value: versions.chrome });
        items.push({ name: 'V8', value: versions.v8 });
        return items;
    };
    AriaNgNativeElectronService.prototype.getVersion = function () {
        return this.getSetting('version');
    };
    AriaNgNativeElectronService.prototype.getAriaNgVersion = function () {
        return this.getSetting('ariaNgVersion');
    };
    AriaNgNativeElectronService.prototype.isDevMode = function () {
        return !!this.getSetting('isDevMode');
    };
    AriaNgNativeElectronService.prototype.useCustomAppTitle = function () {
        return !!this.getSetting('useCustomAppTitle');
    };
    AriaNgNativeElectronService.prototype.getNativeConfig = function () {
        var cfg = {};
        for (var key in config) {
            if (!config.hasOwnProperty(key)) {
                continue;
            }
            if (angular.isFunction(config[key])) {
                continue;
            }
            cfg[key] = angular.copy(config[key]);
        }
        return cfg;
    };
    AriaNgNativeElectronService.prototype.setDefaultPosition = function (value) {
        this.config.defaultPosition = value;
        this.config.save('defaultPosition');
    };
    AriaNgNativeElectronService.prototype.setMinimizedToTray = function (value) {
        this.config.minimizedToTray = !!value;
        this.config.save('minimizedToTray');
    };
    AriaNgNativeElectronService.prototype.setMainWindowLanguage = function () {
        this.setApplicationMenu();
        this.setTrayMenu();
    };
    AriaNgNativeElectronService.prototype.isLocalFSExists = function (fullpath) {
        return localfs.isExists(fullpath);
    };
    AriaNgNativeElectronService.prototype.readPackageFile = function (path) {
        return localfs.readPackageFile(path);
    };
    AriaNgNativeElectronService.prototype.openProjectLink = function () {
        return shell.openExternal && shell.openExternal('https://github.com/mayswind/AriaNg-Native');
    };
    AriaNgNativeElectronService.prototype.openProjectReleaseLink = function () {
        return shell.openExternal && shell.openExternal('https://github.com/mayswind/AriaNg-Native/releases');
    };
    AriaNgNativeElectronService.prototype.openFileInDirectory = function (dir, filename) {
        var fullpath = localfs.getFullPath(dir, filename);
        if (localfs.isExists(fullpath)) {
            return shell.showItemInFolder && shell.showItemInFolder(fullpath);
        }
        else {
            return shell.openItem && shell.openItem(dir);
        }
    };
    AriaNgNativeElectronService.prototype.onMainWindowMaximize = function (callback) {
        this.onMainWindowEvent('maximize', callback);
    };
    AriaNgNativeElectronService.prototype.onMainWindowUnmaximize = function (callback) {
        this.onMainWindowEvent('unmaximize', callback);
    };
    AriaNgNativeElectronService.prototype.onMainProcessNavigateTo = function (callback) {
        this.onMainProcessMessage('navigate-to', callback);
    };
    AriaNgNativeElectronService.prototype.onMainProcessShowError = function (callback) {
        this.onMainProcessMessage('show-error', callback);
    };
    AriaNgNativeElectronService.prototype.onMainProcessNewTaskFromFile = function (callback) {
        this.onMainProcessMessage('new-task-from-file', callback);
    };
    AriaNgNativeElectronService.prototype.onMainProcessNewTaskFromText = function (callback) {
        this.onMainProcessMessage('new-task-from-text', callback);
    };
    AriaNgNativeElectronService.prototype.removeMainProcessNewTaskFromFileCallback = function (callback) {
        this.removeMainProcessCallback('new-task-from-file', callback);
    };
    AriaNgNativeElectronService.prototype.removeMainProcessNewTaskFromTextCallback = function (callback) {
        this.removeMainProcessCallback('new-task-from-text', callback);
    };
    AriaNgNativeElectronService.prototype.sendViewLoadedMessageToMainProcess = function (message) {
        this.sendMessageToMainProcess('view-content-loaded', message);
    };
    AriaNgNativeElectronService.prototype.sendNewDropFileMessageToMainProcess = function (message) {
        this.sendMessageToMainProcess('new-drop-file', message);
    };
    AriaNgNativeElectronService.prototype.sendNewDropTextMessageToMainProcess = function (message) {
        this.sendMessageToMainProcess('new-drop-text', message);
    };
    AriaNgNativeElectronService.prototype.setApplicationMenu = function () {
        if (this.menu.setApplicationMenu) {
            this.menu.setApplicationMenu({
                labels: {
                    AboutAriaNgNative: this.ariaNgLocalizationService.getLocalizedText('menu.AboutAriaNgNative'),
                    Services: this.ariaNgLocalizationService.getLocalizedText('menu.Services'),
                    HideAriaNgNative: this.ariaNgLocalizationService.getLocalizedText('menu.HideAriaNgNative'),
                    HideOthers: this.ariaNgLocalizationService.getLocalizedText('menu.HideOthers'),
                    ShowAll: this.ariaNgLocalizationService.getLocalizedText('menu.ShowAll'),
                    QuitAriaNgNative: this.ariaNgLocalizationService.getLocalizedText('menu.QuitAriaNgNative'),
                    Edit: this.ariaNgLocalizationService.getLocalizedText('menu.Edit'),
                    Undo: this.ariaNgLocalizationService.getLocalizedText('menu.Undo'),
                    Redo: this.ariaNgLocalizationService.getLocalizedText('menu.Redo'),
                    Cut: this.ariaNgLocalizationService.getLocalizedText('menu.Cut'),
                    Copy: this.ariaNgLocalizationService.getLocalizedText('menu.Copy'),
                    Paste: this.ariaNgLocalizationService.getLocalizedText('menu.Paste'),
                    Delete: this.ariaNgLocalizationService.getLocalizedText('menu.Delete'),
                    SelectAll: this.ariaNgLocalizationService.getLocalizedText('menu.SelectAll'),
                    Window: this.ariaNgLocalizationService.getLocalizedText('menu.Window'),
                    Minimize: this.ariaNgLocalizationService.getLocalizedText('menu.Minimize'),
                    Zoom: this.ariaNgLocalizationService.getLocalizedText('menu.Zoom'),
                    BringAllToFront: this.ariaNgLocalizationService.getLocalizedText('menu.BringAllToFront')
                }
            });
        }
    };
    AriaNgNativeElectronService.prototype.setTrayMenu = function () {
        if (this.tray.setContextMenu) {
            this.tray.setContextMenu({
                labels: {
                    ShowAriaNgNative: this.ariaNgLocalizationService.getLocalizedText('tray.ShowAriaNgNative'),
                    Exit: this.ariaNgLocalizationService.getLocalizedText('tray.Exit')
                }
            });
        }
    };
    AriaNgNativeElectronService.prototype.setTrayToolTip = function (value) {
        if (this.tray.setToolTip) {
            this.tray.setToolTip(value);
        }
    };
    AriaNgNativeElectronService.prototype.reload = function () {
        this.getCurrentWindow().reload && this.getCurrentWindow().reload();
    };
    AriaNgNativeElectronService.prototype.isMaximized = function () {
        return this.getCurrentWindow().isMaximized && this.getCurrentWindow().isMaximized();
    };
    AriaNgNativeElectronService.prototype.minimizeWindow = function () {
        this.getCurrentWindow().minimize && this.getCurrentWindow().minimize();
    };
    AriaNgNativeElectronService.prototype.maximizeOrRestoreWindow = function () {
        if (!this.isMaximized()) {
            this.getCurrentWindow().maximize && this.getCurrentWindow().maximize();
        }
        else {
            this.getCurrentWindow().unmaximize && this.getCurrentWindow().unmaximize();
        }
    };
    AriaNgNativeElectronService.prototype.exitApp = function () {
        this.getCurrentWindow().close && this.getCurrentWindow().close();
    };
    AriaNgNativeElectronService = __decorate([
        core_1.Injectable()
    ], AriaNgNativeElectronService);
    return AriaNgNativeElectronService;
}());
exports.AriaNgNativeElectronService = AriaNgNativeElectronService;
angular.module('ariaNg')
    .factory('ariaNgNativeElectronService', static_1.downgradeInjectable(AriaNgNativeElectronService));
//# sourceMappingURL=ariaNgNativeElectronService.js.map