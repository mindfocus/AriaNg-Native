import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';
// import * as angular from 'angular';
// import {setAngularJSGlobal} from "@angular/upgrade/static";
// setAngularJSGlobal(angular);
platformBrowserDynamic().bootstrapModule(AppModule);
