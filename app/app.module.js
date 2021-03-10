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
exports.AppModule = void 0;
var ariaNgVersionService_1 = require("./ariaNgVersionService");
var core_1 = require("@angular/core");
require("@angular/common/locales/global/zh");
var platform_browser_1 = require("@angular/platform-browser");
var static_1 = require("@angular/upgrade/static");
var hello_component_1 = require("./hello-component");
var common_1 = require("@angular/common");
var http_1 = require("@angular/common/http");
var ariaNgLogService_1 = require("./ariaNgLogService");
var button_1 = require("@angular/material/button");
var ariaNgStorageService_1 = require("./ariaNgStorageService");
var aria2SettingService_1 = require("./aria2SettingService");
var dialogs_1 = require("@covalent/core/dialogs");
var ariaNgCommonService_1 = require("./ariaNgCommonService");
var ariaNgSettingService_1 = require("./ariaNgSettingService");
var AriaNgSettingsController_1 = require("./AriaNgSettingsController");
var ariaNgNativeElectronService_1 = require("./ariaNgNativeElectronService");
var AppModule = /** @class */ (function () {
    function AppModule(upgrade, _dialogService) {
        this.upgrade = upgrade;
        this._dialogService = _dialogService;
    }
    AppModule.prototype.ngDoBootstrap = function () {
        console.log('bootstrap');
        this.upgrade.bootstrap(document.documentElement, ['ariaNg'], { strictDi: true });
        console.log('done.');
    };
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                common_1.CommonModule,
                http_1.HttpClientModule,
                static_1.UpgradeModule,
                button_1.MatButtonModule,
                dialogs_1.CovalentDialogsModule,
            ],
            declarations: [
                hello_component_1.HelloComponent,
                AriaNgSettingsController_1.AriaNgSettingsController
            ],
            providers: [
                { provide: core_1.LOCALE_ID, useValue: 'zh' },
                ariaNgVersionService_1.AriaNgVersionService,
                ariaNgLogService_1.AriaNgLogService,
                ariaNgStorageService_1.AriaNgStorageService,
                ariaNgCommonService_1.AriaNgCommonService,
                ariaNgSettingService_1.AriaNgSettingService,
                aria2SettingService_1.Aria2SettingService,
                ariaNgNativeElectronService_1.AriaNgNativeElectronService
            ],
            entryComponents: [
                hello_component_1.HelloComponent,
                AriaNgSettingsController_1.AriaNgSettingsController
            ]
        }),
        __metadata("design:paramtypes", [static_1.UpgradeModule,
            dialogs_1.TdDialogService])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
angular.module('ariaNg')
    .directive('helloComponent', static_1.downgradeComponent({ component: hello_component_1.HelloComponent }), angular.module('ariaNg')
    .directive('AriaNgSettingsController', static_1.downgradeComponent({ component: AriaNgSettingsController_1.AriaNgSettingsController })));
// angular.module('ariaNg')
//     .factory('$location', downgradeInjectable($locationShim));
// angular.module('ariaNg')
//     .directive(
//         'HelloComponent',
//         downgradeComponent({ component: HelloComponent }) as angular.IDirectiveFactory
//     );
//# sourceMappingURL=app.module.js.map