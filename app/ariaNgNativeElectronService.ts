import {Injectable} from "@angular/core";
import {downgradeInjectable} from "@angular/upgrade/static";
import {AriaNgLogService} from "./ariaNgLogService";
declare var angular: angular.IAngularStatic;

@Injectable()
export class AriaNgNativeElectronService {
    electron = typeof window.nodeRequire === 'function'  ? nodeRequire('electron') : {}
    remote = electron.remote || {
        require() {
            return {}
        }
    }
    ipcRenderer = electron.ipcRenderer || {}
    shell = electron.shell || {}
    config = remote.require('./config') || {}
    menu = remote.require('./menu') || {}
    tray = remote.require('./tray') || {}
    localfs = remote.require('./localfs') || {}

    getSetting(item) {
        if (!remote || !remote.getGlobal) {
            return null;
        }

        settings = remote.getGlobal('settings');

        if (!settings) {
            return null;
        }

        return settings[item];
    }

    getCurrentWindow() {
        if (!remote || !remote.getCurrentWindow) {
            return {}
        }

        return remote.getCurrentWindow();
    }

    onMainWindowEvent(event, callback) {
        getCurrentWindow().on && getCurrentWindow().on(event, callback);
    }

    onMainProcessMessage(channel, callback) {
        ipcRenderer.on && ipcRenderer.on(channel, callback);
    }

    removeMainProcessCallback(channel, callback) {
        ipcRenderer.removeListener && ipcRenderer.removeListener(channel, callback);
    }

    sendMessageToMainProcess(channel, message) {
        ipcRenderer.send && ipcRenderer.send(channel, message);
    }
    getRuntimeEnvironment() {
        if (!remote.process || !remote.process.versions) {
            return null;
        }

        var versions = remote.process.versions;
        var items = [];

        items.push({name: 'Electron', value: versions.electron});
        items.push({name: 'Node.js', value: versions.node});
        items.push({name: 'Chrome', value: versions.chrome});
        items.push({name: 'V8', value: versions.v8});

        return items;
    }
    getVersion() {
        return this.getSetting('version');
    }
    getAriaNgVersion() {
        return this.getSetting('ariaNgVersion');
    }
    isDevMode() {
        return !!this.getSetting('isDevMode');
    }
    useCustomAppTitle() {
        return !!this.getSetting('useCustomAppTitle');
    }
    getNativeConfig() {
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
    }
    setDefaultPosition(value) {
        this.config.defaultPosition = value;
        this.config.save('defaultPosition');
    }
    setMinimizedToTray(value) {
        this.config.minimizedToTray = !!value;
        this.config.save('minimizedToTray');
    }
    setMainWindowLanguage() {
        this.setApplicationMenu();
        this.setTrayMenu();
    }
    isLocalFSExists(fullpath) {
        return localfs.isExists(fullpath);
    }
    readPackageFile(path) {
        return localfs.readPackageFile(path);
    }
    openProjectLink() {
        return shell.openExternal && shell.openExternal('https://github.com/mayswind/AriaNg-Native');
    }
    openProjectReleaseLink() {
        return shell.openExternal && shell.openExternal('https://github.com/mayswind/AriaNg-Native/releases');
    }
    openFileInDirectory(dir, filename) {
        var fullpath = localfs.getFullPath(dir, filename);

        if (localfs.isExists(fullpath)) {
            return shell.showItemInFolder && shell.showItemInFolder(fullpath);
        } else {
            return shell.openItem && shell.openItem(dir);
        }
    }
    onMainWindowMaximize(callback) {
        this.onMainWindowEvent('maximize', callback);
    }
    onMainWindowUnmaximize(callback) {
        this.onMainWindowEvent('unmaximize', callback);
    }
    onMainProcessNavigateTo(callback) {
        this.onMainProcessMessage('navigate-to', callback);
    }
    onMainProcessShowError(callback) {
        this.onMainProcessMessage('show-error', callback);
    }
    onMainProcessNewTaskFromFile(callback) {
        this.onMainProcessMessage('new-task-from-file', callback);
    }
    onMainProcessNewTaskFromText(callback) {
        this.onMainProcessMessage('new-task-from-text', callback);
    }
    removeMainProcessNewTaskFromFileCallback(callback) {
        this.removeMainProcessCallback('new-task-from-file', callback);
    }
    removeMainProcessNewTaskFromTextCallback(callback) {
        this.removeMainProcessCallback('new-task-from-text',  callback);
    }
    sendViewLoadedMessageToMainProcess(message) {
        this.sendMessageToMainProcess('view-content-loaded', message);
    }
    sendNewDropFileMessageToMainProcess(message) {
        this.sendMessageToMainProcess('new-drop-file', message);
    }
    sendNewDropTextMessageToMainProcess(message) {
        this.sendMessageToMainProcess('new-drop-text', message);
    }
    setApplicationMenu() {
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
    }
    setTrayMenu() {
        if (this.tray.setContextMenu) {
            this.tray.setContextMenu({
                labels: {
                    ShowAriaNgNative: this.ariaNgLocalizationService.getLocalizedText('tray.ShowAriaNgNative'),
                    Exit: this.ariaNgLocalizationService.getLocalizedText('tray.Exit')
                }
            });
        }
    }
    setTrayToolTip(value) {
        if (this.tray.setToolTip) {
            this.tray.setToolTip(value);
        }
    }
    reload() {
        this.getCurrentWindow().reload && this.getCurrentWindow().reload();
    }
    isMaximized() {
        return this.getCurrentWindow().isMaximized && this.getCurrentWindow().isMaximized();
    }
    minimizeWindow() {
        this.getCurrentWindow().minimize && this.getCurrentWindow().minimize();
    }
    maximizeOrRestoreWindow() {
        if (!this.isMaximized()) {
            this.getCurrentWindow().maximize && this.getCurrentWindow().maximize();
        } else {
            this.getCurrentWindow().unmaximize && this.getCurrentWindow().unmaximize();
        }
    }
    exitApp() {
        this.getCurrentWindow().close && this.getCurrentWindow().close();
    }
}
angular.module('ariaNg')
    .factory('ariaNgNativeElectronService', downgradeInjectable(AriaNgNativeElectronService));
