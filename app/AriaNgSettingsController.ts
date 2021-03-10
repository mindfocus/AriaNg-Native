import {Component} from "@angular/core";
import {AriaNgTitleService} from "./ariaNgTitleService";
import {AriaNgNativeElectronService} from "./ariaNgNativeElectronService";
import {AriaNgLanguages} from "./ariaNgLanguages";
import {AriaNgCommonService} from "./ariaNgCommonService";
import {AriaNgSettingService} from "./ariaNgSettingService";

@Component({
    selector: 'AriaNg-SettingsController',
    template: `
        <section class="content no-padding">
    <div class="nav-tabs-custom">
        <ul class="nav nav-tabs">
            <li [ngStyle]="{'active': isCurrentGlobalTab()}">
                <a class="pointer-cursor" (click)="changeGlobalTab()" translate>Global</a>
            </li>
            <li class="nav-tab-title-rpcname" *ngFor="let setting of rpcSettings; index as i" [ngStyle]="{'active': isCurrentRpcTab(i)}">
                <a class="pointer-cursor" (click)="changeRpcTab(i)">
                    <span class="nav-tab-rpcname" [(ngModel)]="'RPC' + (setting.rpcAlias || setting.rpcHost ? ' (' + (setting.rpcAlias ? setting.rpcAlias : setting.rpcHost + ':' + setting.rpcPort) + ')' : '')" title="{{(setting.rpcAlias ? setting.rpcAlias : setting.rpcHost + ':' + setting.rpcPort)}}">RPC</span>
                </a>
                <a class="pointer-cursor nav-tab-close" ng-if="!setting.isDefault" title="{{'Delete RPC Setting' | translate}}">
                    <i class="fa fa-times" (click)="removeRpcSetting(setting)"></i>
                </a>
            </li>
            <li class="slim">
                <a class="pointer-cursor" (click)="addNewRpcSetting()" title="{{'Add New RPC Setting' | translate}}">
                    <i class="fa fa-plus"></i>
                </a>
            </li>
        </ul>
        <div class="tab-content no-padding">
            <div class="tab-pane" [ngStyle]="{'active': isCurrentGlobalTab()}">
                <div class="settings-table striped hoverable">
                    <div class="row" ng-if="ariaNgVersion">
                        <div class="setting-key col-sm-4">
                            <span translate>AriaNg Version</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <span ng-bind="'AriaNg Native ' + ariaNgNativeVersion + ' (AriaNg ' + ariaNgVersion + ')'"></span>
                            <button class="btn btn-xs btn-default" (click)="checkUpdate()" [disabled]="isCurrentLatestVersion" promise-btn>
                                <span ng-bind="(isCurrentLatestVersion ? 'Latest Version' : 'Check Update') | translate" translate>Check Update</span>
                            </button>
                        </div>
                    </div>
                    <div class="row" ng-if="runtimeEnvironment">
                        <div class="setting-key col-sm-4">
                            <span translate>Runtime Environment</span>
                            <i class="icon-expand pointer-cursor fa" ng-if="runtimeEnvironment.length > 1"
                               [ngStyle]="{'fa-plus': runtimeEnvironmentCollapsed, 'fa-minus': !runtimeEnvironmentCollapsed}"
                               (click)="runtimeEnvironmentCollapsed = !runtimeEnvironmentCollapsed"
                               title="{{(runtimeEnvironmentCollapsed ? 'Expand' : 'Collapse') | translate}}"></i>
                        </div>
                        <div class="setting-value col-sm-8">
                            <span class="multi-line auto-ellipsis" ng-bind="item.name + ': ' + item.value"
                                  ng-repeat="item in runtimeEnvironment | limitTo: (runtimeEnvironmentCollapsed ? 1 : task.runtimeEnvironment.length)"></span>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Language</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.language"
                                    ng-options="type as (((('languages.' + language.name) | translate) !== ('languages.' + language.name) ? (('languages.' + language.name) | translate) : language.name) + ' (' + language.displayName + ')') for (type, language) in languages"
                                    ng-change="setLanguage(settings.language)">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Theme</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.theme"
                                    ng-change="setTheme(settings.theme)">
                                <option value="light" translate>Light</option>
                                <option value="dark" translate>Dark</option>
                                <option ng-if="isSupportDarkMode" value="system" translate>Follow system settings</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Page Title</span>
                            <i class="icon-primary fa fa-question-circle" data-toggle="popover"
                               data-trigger="hover" data-placement="auto right" data-container="body" data-html="true"
                               data-content="{{('Supported Placeholder' | translate) + ':<br/>' +
                               ('AriaNg Title' | translate) + ': ${title}<br/>' +
                               ('Current RPC Alias' | translate) + ': ${rpcprofile}<br/>' +
                               ('Downloading Count' | translate) + ': ${downloading}<br/>' +
                                ('Waiting Count' | translate) + ': ${waiting}<br/>' +
                                ('Stopped Count' | translate) + ': ${stopped}<br/>' +
                                ('Download Speed' | translate) + ': ${downspeed}<br/>' +
                                ('Upload Speed' | translate) + ': ${upspeed}<br/><br/>' +
                                ('Tips: You can use the &quot;noprefix&quot; tag to ignore the prefix, &quot;nosuffix&quot; tag to ignore the suffix, and &quot;scale=n&quot; tag to set the decimal precision.' | translate) + '<br/>' +
                                ('Example: \${downspeed:noprefix:nosuffix:scale=1}' | translate)}}"></i>
                        </div>
                        <div class="setting-value col-sm-8">
                            <input class="form-control" type="text" ng-model="settings.title"
                                   ng-change="setTitle(settings.title); updateTitlePreview()"/>
                            <em>[<span translate>Preview</span>] <span ng-bind="titlePreview"></span></em>
                        </div>
                    </div>
                    <div class="row" ng-if="isSupportNotification()">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Enable Browser Notification</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;"
                                    ng-model="settings.browserNotification"
                                    ng-change="setEnableBrowserNotification(settings.browserNotification)"
                                    ng-options="option.value as (option.name | translate) for option in trueFalseOptions">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Updating Page Title Interval</span>
                            <span class="asterisk">*</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;"
                                    ng-model="settings.titleRefreshInterval"
                                    ng-change="setTitleRefreshInterval(settings.titleRefreshInterval)"
                                    ng-options="time.optionValue as (time.name | translate: {value: time.value}) for time in availableTime">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Updating Global Stat Interval</span>
                            <span class="asterisk">*</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;"
                                    ng-model="settings.globalStatRefreshInterval"
                                    ng-change="setGlobalStatRefreshInterval(settings.globalStatRefreshInterval)"
                                    ng-options="time.optionValue as (time.name | translate: {value: time.value}) for time in availableTime">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Updating Task Information Interval</span>
                            <span class="asterisk">*</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;"
                                    ng-model="settings.downloadTaskRefreshInterval"
                                    ng-change="setDownloadTaskRefreshInterval(settings.downloadTaskRefreshInterval)"
                                    ng-options="time.optionValue as (time.name | translate: {value: time.value}) for time in availableTime">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Swipe Gesture</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.swipeGesture"
                                    ng-change="setSwipeGesture(settings.swipeGesture)"
                                    ng-options="option.value as (option.name | translate) for option in trueFalseOptions">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Change Tasks Order by Drag-and-drop</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.dragAndDropTasks"
                                    ng-change="setDragAndDropTasks(settings.dragAndDropTasks)"
                                    ng-options="option.value as (option.name | translate) for option in trueFalseOptions">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>RPC List Display Order</span>
                            <span class="asterisk">*</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.rpcListDisplayOrder"
                                    ng-change="setRPCListDisplayOrder(settings.rpcListDisplayOrder)">
                                <option value="recentlyUsed" translate>Recently Used</option>
                                <option value="rpcAlias" translate>RPC Alias</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Action After Creating New Tasks</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.afterCreatingNewTask"
                                    ng-change="setAfterCreatingNewTask(settings.afterCreatingNewTask)">
                                <option value="task-list" translate>Navigate to Task List Page</option>
                                <option value="task-detail" translate>Navigate to Task Detail Page</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Action After Retrying Task</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.afterRetryingTask"
                                    ng-change="setAfterRetryingTask(settings.afterRetryingTask)">
                                <option value="task-list-downloading" translate>Navigate to Downloading Tasks Page</option>
                                <option value="task-detail" translate>Navigate to Task Detail Page</option>
                                <option value="stay-on-current" translate>Stay on Current Page</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Remove Old Tasks After Retrying</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.removeOldTaskAfterRetrying"
                                    ng-change="setRemoveOldTaskAfterRetrying(settings.removeOldTaskAfterRetrying)"
                                    ng-options="option.value as (option.name | translate) for option in trueFalseOptions">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Confirm Task Removal</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.confirmTaskRemoval"
                                    ng-change="setConfirmTaskRemoval(settings.confirmTaskRemoval)"
                                    ng-options="option.value as (option.name | translate) for option in trueFalseOptions">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Include Prefix When Copying From Task Details</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="settings.includePrefixWhenCopyingFromTaskDetails"
                                    ng-change="setIncludePrefixWhenCopyingFromTaskDetails(settings.includePrefixWhenCopyingFromTaskDetails)"
                                    ng-options="option.value as (option.name | translate) for option in trueFalseOptions">
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Default Window Position</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="nativeSettings.defaultPosition"
                                    ng-change="setDefaultPosition(nativeSettings.defaultPosition)">
                                <option value="last-position" translate>Last Position</option>
                                <option value="screen-center" translate>Screen Center</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Action After Main Window Closed</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="nativeSettings.afterMainWindowClosed"
                                    ng-change="setAfterMainWindowClosed(nativeSettings.afterMainWindowClosed)">
                                <option value="minimize-to-tray" translate>Minimize to Tray</option>
                                <option value="exit-application" translate>Exit Application</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Import / Export AriaNg Settings</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <button class="btn btn-sm btn-default" (click)="showImportSettingsModal()">
                                <span translate>Import Settings</span>
                            </button>
                            <button class="btn btn-sm btn-default" (click)="showExportSettingsModal()">
                                <span translate>Export Settings</span>
                            </button>
                        </div>
                    </div>
                    <div class="row tip no-background no-hover">
                        <span class="asterisk">*</span>
                        <span translate>Changes to the settings take effect after refreshing page.</span>
                        <button class="btn btn-xs btn-default" (click)="resetSettings()">
                            <span translate>Reset Settings</span>
                        </button>
                        <button class="btn btn-xs btn-default" (click)="clearHistory()">
                            <span translate>Clear Settings History</span>
                        </button>
                        <button class="btn btn-xs btn-default" (click)="reloadApp()">
                            <span translate>Reload AriaNg Native</span>
                        </button>
                    </div>
                </div>
            </div>
            <div class="tab-pane" ng-repeat="setting in rpcSettings" [ngStyle]="{'active': isCurrentRpcTab($index)}">
                <div class="settings-table striped hoverable">
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Alias</span>
                            <span class="asterisk">*</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <input class="form-control" type="text" ng-placeholder="(setting.rpcHost ? setting.rpcHost + ':' + setting.rpcPort : '')" ng-model="setting.rpcAlias" ng-change="updateRpcSetting(setting, 'rpcAlias')"/>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Address</span>
                            <span class="asterisk">*</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <div class="input-group input-group-multiple">
                                <span class="input-group-addon" ng-bind="setting.protocol + '://'"></span>
                                <input class="form-control" type="text" ng-model="setting.rpcHost" ng-change="updateRpcSetting(setting, 'rpcHost')"/>
                                <span class="input-group-addon">:</span>
                                <div class="input-group-addon-container">
                                    <input class="form-control form-control-rpcport" type="text" ng-model="setting.rpcPort" ng-change="updateRpcSetting(setting, 'rpcPort')"/>
                                </div>
                                <span class="input-group-addon">/</span>
                                <div class="input-group-addon-container">
                                    <input class="form-control form-control-rpcinterface" type="text" ng-model="setting.rpcInterface" ng-change="updateRpcSetting(setting, 'rpcInterface')"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Protocol</span>
                            <span class="asterisk">*</span>
                            <i class="icon-primary fa fa-question-circle" ng-tooltip-container="body" ng-tooltip-placement="top"
                               ng-tooltip="{{'Http and WebSocket would be disabled when accessing AriaNg via Https.' | translate}}"></i>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="setting.protocol" ng-change="updateRpcSetting(setting, 'protocol')">
                                <option value="http" ng-disabled="::(isInsecureProtocolDisabled)" ng-bind="('Http' + (isInsecureProtocolDisabled ? ' (Disabled)' : '')) | translate">Http</option>
                                <option value="https" translate>Https</option>
                                <option value="ws" ng-disabled="::(isInsecureProtocolDisabled)" ng-bind="('WebSocket' + (isInsecureProtocolDisabled ? ' (Disabled)' : '')) | translate">WebSocket</option>
                                <option value="wss" translate>WebSocket (Security)</option>
                            </select>
                        </div>
                    </div>
                    <div class="row" ng-if="setting.protocol === 'http' || setting.protocol === 'https'">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Http Request Method</span>
                            <span class="asterisk">*</span>
                            <i class="icon-primary fa fa-question-circle" ng-tooltip-container="body" ng-tooltip-placement="top"
                               ng-tooltip="{{'POST method only supports aria2 v1.15.2 and above.' | translate}}"></i>
                        </div>
                        <div class="setting-value col-sm-8">
                            <select class="form-control" style="width: 100%;" ng-model="setting.httpMethod" ng-change="updateRpcSetting(setting, 'httpMethod')">
                                <option value="POST" translate>POST</option>
                                <option value="GET" translate>GET</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="setting-key setting-key-without-desc col-sm-4">
                            <span translate>Aria2 RPC Secret Token</span>
                            <span class="asterisk">*</span>
                        </div>
                        <div class="setting-value col-sm-8">
                            <div class="input-group">
                                <input class="form-control" type="{{showRpcSecret ? 'text' : 'password'}}" ng-model="setting.secret" ng-change="updateRpcSetting(setting, 'secret')"/>
                                <span class="input-group-addon input-group-addon-compact no-vertical-padding">
                                    <button class="btn btn-xs btn-default" title="{{showRpcSecret ? 'Hide Secret' : 'Show Secret' | translate}}"
                                            [ngStyle]="{'active': showRpcSecret}" (click)="showRpcSecret = !showRpcSecret">
                                        <i class="fa fa-eye"></i>
                                    </button>
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="row tip no-background no-hover">
                        <span class="asterisk">*</span>
                        <span translate>Changes to the settings take effect after refreshing page.</span>
                        <button class="btn btn-xs btn-default" ng-disabled="setting.isDefault" (click)="setDefaultRpcSetting(setting)">
                            <span translate>Activate</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="import-settings-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">
                        <span translate>Import Settings</span>
                        <small>
                            <a class="pointer-cursor" title="{{'Open' | translate}}" (click)="openAriaNgConfigFile()">
                                <i class="icon-primary fa fa-folder-open-o"></i>
                            </a>
                        </small>
                    </h4>
                </div>
                <div class="modal-body no-padding">
                    <div class="settings-table striped">
                        <input id="import-file-holder" type="file" style="display: none"/>
                        <textarea class="form-control" ng-model="importSettings" rows="20"
                                  ng-placeholder="'AriaNg settings data' | translate"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" ng-disabled="!importSettings || !importSettings.length"
                            (click)="importSettings(importSettings)" translate>Import</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" translate>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div id="export-settings-modal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">
                        <span translate>Export Settings</span>
                        <small>
                            <a class="pointer-cursor" title="{{'Save' | translate}}" ng-if="isSupportBlob"
                               ng-blob-download="exportSettings" ng-file-name="AriaNgConfig.json" ng-content-type="application/json">
                                <i class="icon-primary fa fa-save"></i>
                            </a>
                            <a class="pointer-cursor" title="{{'Copy' | translate}}" (click)="copyExportSettings()">
                                <i class="icon-primary fa fa-copy"></i>
                            </a>
                            <span class="label label-default fade-in" ng-if="exportSettingsCopied" translate>Data has been copied to clipboard.</span>
                        </small>
                    </h4>
                </div>
                <div class="modal-body no-padding">
                    <div class="settings-table striped">
                        <textarea class="form-control" ng-model="exportSettings" rows="20" readonly="readonly"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal" translate>Cancel</button>
                </div>
            </div>
        </div>
    </div>
</section>

    `
})
export class AriaNgSettingsController {
    currentTab = 'global'
    ariaNgNativeVersion; //= this.ariaNgNativeElectronService.getVersion()
    ariaNgVersion; //= this.ariaNgNativeElectronService.getAriaNgVersion()
    isCurrentLatestVersion= false
    runtimeEnvironment;//= ariaNgNativeElectronService.getRuntimeEnvironment()
    runtimeEnvironmentCollapsed: boolean
    languages= AriaNgLanguages
    titlePreview; //getFinalTitle()
    availableTime; //: ariaNgCommonService.getTimeOptions([1000, 2000, 3000, 5000, 10000, 30000, 60000], true)
    trueFalseOptions= [{name: 'Enabled', value: true}, {name: 'Disabled', value: false}]
    showRpcSecret= false
    isInsecureProtocolDisabled;//= ariaNgSettingService.isInsecureProtocolDisabled()
    settings; //ariaNgSettingService.getAllOptions()
    nativeSettings; //: getNativeSettings()
    sessionSettings; // ariaNgSettingService.getAllSessionOptions()
    rpcSettings; // ariaNgSettingService.getAllRpcSettings()
    isSupportBlob; // ariaNgFileService.isSupportBlob()
    isSupportDarkMode; //: ariaNgSettingService.isBrowserSupportDarkMode()
    exportSettingsCopied= false
    showDebugMode; // = sessionSettings.debugMode || extendType === 'debug';

    constructor(private ariaNgTitleService: AriaNgTitleService,
                private ariaNgMonitorService: AriaNgMonitorService,
                private ariaNgNativeElectronService: AriaNgNativeElectronService,
                private ariaNgCommonService: AriaNgCommonService,
                private ariaNgFileService: AriaNgFileService,
                private ariaNgSettingService: AriaNgSettingService) {
        this.ariaNgNativeVersion = this.ariaNgNativeElectronService.getVersion();
        this.ariaNgVersion = this.ariaNgNativeElectronService.getAriaNgVersion()
        this.runtimeEnvironment = this.ariaNgNativeElectronService.getRuntimeEnvironment()
        this.availableTime = this.ariaNgCommonService.getTimeOptions([1000, 2000, 3000, 5000, 10000, 30000, 60000], true)
        this.isInsecureProtocolDisabled = this.ariaNgSettingService.isInsecureProtocolDisabled()
        this.settings = this.ariaNgSettingService.getAllOptions()
        this.sessionSettings = this.ariaNgSettingService.getAllSessionOptions()
        this.rpcSettings = this.ariaNgSettingService.getAllRpcSettings()
        this.isSupportBlob = this.ariaNgFileService.isSupportBlob()
        this.isSupportDarkMode = this.ariaNgSettingService.isBrowserSupportDarkMode()
        this.showDebugMode = this.sessionSettings.debugMode || extendType === 'debug';
        this.nativeSettings = this.getNativeSettings();
        this.titlePreview = this.getFinalTitle();
    }
    // var extendType = $routeParams.extendType;
    // var lastRefreshPageNotification = null;

     getFinalTitle() {
        return this.ariaNgTitleService.getFinalTitleByGlobalStat({
            globalStat: this.ariaNgMonitorService.getCurrentGlobalStat(),
            currentRpcProfile: this.getCurrentRPCProfile()
        });
    }

     getCurrentRPCProfile() {
        if (!context || !rpcSettings || rpcSettings.length < 1) {
            return null;
        }

        for (var i = 0; i < rpcSettings.length; i++) {
            var rpcSetting = rpcSettings[i];
            if (rpcSetting.isDefault) {
                return rpcSetting;
            }
        }

        return null;
    }

     getNativeSettings() {
        var originalConfig = ariaNgNativeElectronService.getNativeConfig();
        var config = {};

        config.defaultPosition = originalConfig.defaultPosition || 'last-position';

        if (!originalConfig.minimizedToTray) {
            config.afterMainWindowClosed = 'exit-application';
        } else {
            config.afterMainWindowClosed = 'minimize-to-tray';
        }

        return config;
    }

     setNeedRefreshPage() {
        if (this.lastRefreshPageNotification) {
            return;
        }

         this.lastRefreshPageNotification = this.ariaNgLocalizationService.notifyInPage('', 'Configuration has been modified, please reload the page for the changes to take effect.', {
            delay: false,
            type: 'info',
            templateUrl: 'views/notification-reloadable.html',
            onClose: function () {
                this.lastRefreshPageNotification = null;
            }
        });
    };




    changeGlobalTab() {
        this.currentTab = 'global';
    };

    isCurrentGlobalTab() {
        return this.currentTab === 'global';
    };

    changeRpcTab(rpcIndex) {
        currentTab = 'rpc' + rpcIndex;
    };

    isCurrentRpcTab(rpcIndex) {
        return currentTab === 'rpc' + rpcIndex;
    };

    getCurrentRpcTabIndex() {
        if (isCurrentGlobalTab()) {
            return -1;
        }

        return parseInt(currentTab.substring(3));
    };

    checkUpdate() {
        return this.ariaNgVersionService.getTheLatestVersion()
            .then(function onSuccess(response) {
                if (!response || !response.data || !response.data.tag_name) {
                    this.ariaNgLogService.warn('[AriaNgSettingsController.checkUpdate] data format of latest version is invalid', response);
                    this.ariaNgLocalizationService.showError('Failed to get latest version!');
                    return;
                }

                var latestVersion = response.data.tag_name;

                if (this.ariaNgVersionService.compareVersion(this.ariaNgNativeVersion, latestVersion) >= 0) {
                    this.ariaNgLocalizationService.showInfo('Check Update', 'You have installed the latest version!');
                    this.isCurrentLatestVersion = true;
                } else {
                    this.ariaNgNativeElectronService.openProjectReleaseLink();
                }
            }).catch(function onError(response) {
                this.ariaNgLogService.error('[AriaNgSettingsController.checkUpdate] failed to get latest version', response);
                this.ariaNgLocalizationService.showError('Failed to get latest version!');
            });
    };

    updateTitlePreview() {
        this.titlePreview = this.getFinalTitle();
    };

    // $rootScope.swipeActions.extendLeftSwipe() {
    //     var tabIndex = -1;
    //
    //     if (!isCurrentGlobalTab()) {
    //         tabIndex = parseInt(getCurrentRpcTabIndex());
    //     }
    //
    //     if (tabIndex < rpcSettings.length - 1) {
    //         changeRpcTab(tabIndex + 1);
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    // $rootScope.swipeActions.extendRightSwipe() {
    //     var tabIndex = -1;
    //
    //     if (!isCurrentGlobalTab()) {
    //         tabIndex = parseInt(getCurrentRpcTabIndex());
    //     }
    //
    //     if (tabIndex > 0) {
    //         changeRpcTab(tabIndex - 1);
    //         return true;
    //     } else if (tabIndex === 0) {
    //         changeGlobalTab();
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    isSupportNotification() {
        return this.ariaNgNotificationService.isSupportBrowserNotification() &&
            ariaNgSettingService.isCurrentRpcUseWebSocket(settings.protocol);
    };

    setLanguage(value) {
        if (this.ariaNgSettingService.setLanguage(value)) {
            this.ariaNgLocalizationService.applyLanguage(value);
        }

        this.updateTitlePreview();
    };

    setTheme(value) {
        this.ariaNgSettingService.setTheme(value);
        // $rootScope.setTheme(value);
    };

    setDebugMode(value) {
        this.ariaNgSettingService.setDebugMode(value);
    };

    setTitle(value) {
        this.ariaNgSettingService.setTitle(value);
    };

    setEnableBrowserNotification(value) {
        this.ariaNgSettingService.setBrowserNotification(value);

        if (value && !this.ariaNgNotificationService.hasBrowserPermission()) {
            this.ariaNgNotificationService.requestBrowserPermission(function (result) {
                if (!result.granted) {
                    this.settings.browserNotification = false;
                    this.ariaNgLocalizationService.showError('You have disabled notification in your browser. You should change your browser\'s settings before you enable this function.');
                }
            });
        }
    };

    setTitleRefreshInterval(value) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.setTitleRefreshInterval(value);
    };

    setGlobalStatRefreshInterval(value) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.setGlobalStatRefreshInterval(value);
    };

    setDownloadTaskRefreshInterval(value) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.setDownloadTaskRefreshInterval(value);
    };

    setRPCListDisplayOrder(value) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.setRPCListDisplayOrder(value);
    };

    setSwipeGesture(value) {
        this.ariaNgSettingService.setSwipeGesture(value);
    };

    setDragAndDropTasks(value) {
        this.ariaNgSettingService.setDragAndDropTasks(value);
    };

    setAfterCreatingNewTask(value) {
        this.ariaNgSettingService.setAfterCreatingNewTask(value);
    };

    setRemoveOldTaskAfterRetrying(value) {
        this.ariaNgSettingService.setRemoveOldTaskAfterRetrying(value);
    };

    setConfirmTaskRemoval(value) {
        this.ariaNgSettingService.setConfirmTaskRemoval(value);
    };

    setIncludePrefixWhenCopyingFromTaskDetails(value) {
        this.ariaNgSettingService.setIncludePrefixWhenCopyingFromTaskDetails(value);
    };

    setAfterRetryingTask(value) {
        this.ariaNgSettingService.setAfterRetryingTask(value);
    };

    setDefaultPosition(value) {
        this.ariaNgNativeElectronService.setDefaultPosition(value);
    }

    setAfterMainWindowClosed(value) {
        if (value === 'minimize-to-tray') {
            this.ariaNgNativeElectronService.setMinimizedToTray(true);
        } else if (value === 'exit-application') {
            this.ariaNgNativeElectronService.setMinimizedToTray(false);
        }
    };

    showImportSettingsModal() {
        this.importSettings = null;
        angular.element('#import-settings-modal').modal();
    };

    // $('#import-settings-modal').on('hide.bs.modal', function (e) {
    //     importSettings = null;
    // });

    openAriaNgConfigFile() {
        this.ariaNgFileService.openFileContent({
            scope: $scope,
            fileFilter: '.json',
            fileType: 'text'
        }, function (result) {
            this.importSettings = result.content;
        }, function (error) {
            this.ariaNgLocalizationService.showError(error);
        }, angular.element('#import-file-holder'));
    };

    importSettings(settings) {
        var settingsObj = null;

        try {
            settingsObj = JSON.parse(settings);
        } catch (e) {
            this.ariaNgLogService.error('[AriaNgSettingsController.importSettings] parse settings json error', e);
            this.ariaNgLocalizationService.showError('Invalid settings data format!');
            return;
        }

        if (!angular.isObject(settingsObj) || angular.isArray(settingsObj)) {
            this.ariaNgLogService.error('[AriaNgSettingsController.importSettings] settings json is not object');
            this.ariaNgLocalizationService.showError('Invalid settings data format!');
            return;
        }

        if (settingsObj) {
            ariaNgLocalizationService.confirm('Confirm Import', 'Are you sure you want to import all settings?', 'warning', function () {
                ariaNgSettingService.importAllOptions(settingsObj);
                window.location.reload();
            });
        }
    };

    showExportSettingsModal() {
        this.exportSettings = $filter('json')(this.ariaNgSettingService.exportAllOptions());
        this.exportSettingsCopied = false;
        angular.element('#export-settings-modal').modal();
    };

    // $('#export-settings-modal').on('hide.bs.modal', function (e) {
    //     exportSettings = null;
    //     exportSettingsCopied = false;
    // });

    copyExportSettings() {
        this.clipboard.copyText(this.exportSettings, {
            container: angular.element('#export-settings-modal')[0]
        });
        this.exportSettingsCopied = true;
    };

    addNewRpcSetting() {
        this.setNeedRefreshPage();

        var newRpcSetting = this.ariaNgSettingService.addNewRpcSetting();
        this.rpcSettings.push(newRpcSetting);

        this.changeRpcTab(this.rpcSettings.length - 1);
    };

    updateRpcSetting(setting, field) {
        this.setNeedRefreshPage();
        this.ariaNgSettingService.updateRpcSetting(setting, field);
    };

    removeRpcSetting(setting) {
        var rpcName = (setting.rpcAlias ? setting.rpcAlias : setting.rpcHost + ':' + setting.rpcPort);

        this.ariaNgLocalizationService.confirm('Confirm Remove', 'Are you sure you want to remove rpc setting "{{rpcName}}"?', 'warning', function () {
            this.setNeedRefreshPage();

            var currentIndex = this.getCurrentRpcTabIndex();
            var index = this.rpcSettings.indexOf(setting);
            this.ariaNgSettingService.removeRpcSetting(setting);
            this.rpcSettings.splice(index, 1);

            if (currentIndex >= this.rpcSettings.length) {
                this.changeRpcTab(rpcSettings.length - 1);
            } else if (currentIndex <= 0 || currentIndex <= index) {
                ; // Do Nothing
            } else { // currentIndex > index
                this.changeRpcTab(currentIndex - 1);
            }
        }, false, {
            textParams: {
                rpcName: rpcName
            }
        });
    };

    setDefaultRpcSetting(setting) {
        if (setting.isDefault) {
            return;
        }

        this.ariaNgSettingService.setDefaultRpcSetting(setting);
        window.location.reload();
    };

    resetSettings() {
        this.ariaNgLocalizationService.confirm('Confirm Reset', 'Are you sure you want to reset all settings?', 'warning', function () {
            this.ariaNgSettingService.resetSettings();
            window.location.reload();
        });
    };

    clearHistory() {
        this.ariaNgLocalizationService.confirm('Confirm Clear', 'Are you sure you want to clear all settings history?', 'warning', function () {
            this.aria2SettingService.clearSettingsHistorys();
            window.location.reload();
        });
    };

    reloadApp () {
        this.ariaNgNativeElectronService.reload();
    }

    // angular.element('[data-toggle="popover"]').popover();

    // $rootScope.loadPromise = $timeout(function () {}, 100);
}
