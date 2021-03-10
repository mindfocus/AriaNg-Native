import {AriaNgVersionService} from "./ariaNgVersionService";

declare var angular: angular.IAngularStatic;
import {LOCALE_ID, NgModule, ViewContainerRef} from "@angular/core";
import '@angular/common/locales/global/zh';
import { BrowserModule } from '@angular/platform-browser';
import {downgradeComponent, downgradeInjectable, UpgradeModule} from '@angular/upgrade/static';
import { HelloComponent } from './hello-component'
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AriaNgLogService} from "./ariaNgLogService";
import {MatButtonModule} from '@angular/material/button';
import {AriaNgStorageService} from "./ariaNgStorageService";
import {Aria2SettingService} from "./aria2SettingService";
import {CovalentDialogsModule, TdDialogService} from '@covalent/core/dialogs';
import {AriaNgCommonService} from "./ariaNgCommonService";
import {AriaNgSettingService} from "./ariaNgSettingService";
import { $locationShim } from '@angular/common/upgrade';
import { LocationUpgradeModule } from '@angular/common/upgrade';
import { AriaNgSettingsController } from "./AriaNgSettingsController";
import {AriaNgNativeElectronService} from "./ariaNgNativeElectronService";
@NgModule({
    imports:[
        BrowserModule,
        CommonModule,
        HttpClientModule,
        UpgradeModule,
        MatButtonModule,
        CovalentDialogsModule,
        // LocationUpgradeModule.config({
        //     // useHash: true,
        //     // hashPrefix: '!'
        // })
    ],
    declarations:[
        HelloComponent,
        AriaNgSettingsController
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'zh' },
        AriaNgVersionService,
        AriaNgLogService,
        AriaNgStorageService,
        AriaNgCommonService,
        AriaNgSettingService,
        Aria2SettingService,
        AriaNgNativeElectronService
    ],
    entryComponents:[
        HelloComponent,
        AriaNgSettingsController
    ]
})
export class AppModule {
    constructor(private upgrade: UpgradeModule,
                private _dialogService: TdDialogService) { }
    ngDoBootstrap() {
        console.log('bootstrap')
        this.upgrade.bootstrap(document.documentElement, ['ariaNg'], { strictDi: true });
        console.log('done.')
    }
}
angular.module('ariaNg')
    .directive(
        'helloComponent',
        downgradeComponent({ component: HelloComponent }) as angular.IDirectiveFactory
angular.module('ariaNg')
    .directive(
        'AriaNgSettingsController',
        downgradeComponent({ component: AriaNgSettingsController }) as angular.IDirectiveFactory
    );
// angular.module('ariaNg')
//     .factory('$location', downgradeInjectable($locationShim));

// angular.module('ariaNg')
//     .directive(
//         'HelloComponent',
//         downgradeComponent({ component: HelloComponent }) as angular.IDirectiveFactory
//     );
