/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias
            'npm:': '../node_modules/'
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            'app': '.',

            // angular bundles
            'angular': 'npm:angular/angular.js',
            'angular-route': 'npm:angular-route/angular-route.js',
            'angular-sanitize': 'npm:angular-sanitize/angular-sanitize.js',
            'angular-touch': 'npm:angular-touch/angular-touch.js',
            'angular-messages': 'npm:angular-messages/angular-messages.js',
            'angular-cookies': 'npm:angular-cookies/angular-cookies.js',
            'angular-animate': 'npm:angular-animate/angular-animate.js',
            'angular-translate': 'npm:angular-translate/dist/angular-translate.js',
            'angular-moment': 'npm:angular-moment/angular-moment.js',
            'angular-websocket': 'npm:angular-websocket/dist/angular-websocket.js',
            'angular-utf8-base64': 'npm:angular-utf8-base64/angular-utf8-base64.js',
            'angularjs-dragula': 'npm:angularjs-dragula/dist/angularjs-dragula.js',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/localize': 'npm:@angular/localize/bundles/localize.umd.js',
            '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
            '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/common/http': 'npm:@angular/common/bundles/common-http.umd.js',
            'string-natural-compare': 'npm:string-natural-compare/natural-compare.js',
            '@angular/common/locales/global/zh': 'npm:@angular/common/locales/global/zh.js',
            '@angular/common/upgrade': 'npm:@angular/common/bundles/common-upgrade.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',
            '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
            '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
            '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
            '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
            '@angular/cdk/keycodes': 'npm:@angular/cdk/bundles/cdk-keycodes.umd.js',
            '@angular/cdk/observers': 'npm:@angular/cdk/bundles/cdk-observers.umd.js',
            '@angular/cdk/overlay': 'npm:@angular/cdk/bundles/cdk-overlay.umd.js',
            '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
            '@angular/cdk/layout': 'npm:@angular/cdk/bundles/cdk-layout.umd.js',
            '@angular/cdk/scrolling': 'npm:@angular/cdk/bundles/cdk-scrolling.umd.js',
            '@angular/cdk/collections': 'npm:@angular/cdk/bundles/cdk-collections.umd.js',
            '@angular/cdk/text-field': 'npm:@angular/cdk/bundles/cdk-text-field.umd.js',
            '@angular/cdk/drag-drop': 'npm:@angular/cdk/bundles/cdk-drag-drop.umd.js',
            '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
            '@angular/material/core': 'npm:@angular/material/bundles/material-core.umd.js',
            '@angular/material/button': 'npm:@angular/material/bundles/material-button.umd.js',
            '@angular/material/form-field': 'npm:@angular/material/bundles/material-form-field.umd.js',
            '@angular/material/icon': 'npm:@angular/material/bundles/material-icon.umd.js',
            '@angular/material/toolbar': 'npm:@angular/material/bundles/material-toolbar.umd.js',
            '@angular/material/dialog': 'npm:@angular/material/bundles/material-dialog.umd.js',
            '@angular/material/input': 'npm:@angular/material/bundles/material-input.umd.js',
            '@angular/material/tooltip': 'npm:@angular/material/bundles/material-tooltip.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',
            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            '@covalent/core': 'npm:@covalent/core/bundles/covalent-core.umd.js',
            '@covalent/core/dialogs': 'npm:@covalent/core/bundles/covalent-core-dialogs.umd.js',
            'moment': 'npm:moment/moment.js',

            // other libraries
            // 'rxjs':                      'npm:rxjs/*',
            'rxjs': 'npm:rxjs',
            'traceur':'npm:traceur/bin'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        packages: {
            app: {
                defaultExtension: 'js',
                meta: {
                    './*.js': {
                        loader: './systemjs-angular-loader.js'
                    },
                    './systemjs-angular-loader.js': {
                        loader: false
                    }
                }
            },
            'rxjs': {main: 'index.js', defaultExtension: 'js' },
            'rxjs/ajax': {main: 'index.js', defaultExtension: 'js' },
            'rxjs/fetch': {main: 'index.js', defaultExtension: 'js' },
            'rxjs/operators': {main: 'index.js', defaultExtension: 'js' },
            'rxjs/testing': {main: 'index.js', defaultExtension: 'js' },
            'rxjs/webSocket': {main: 'index.js', defaultExtension: 'js' },
            traceur:{
                main: 'traceur'
            }
        }
    });
    Promise.all([
        System.import('rxjs'),
        System.import('rxjs/ajax'),
        System.import('rxjs/fetch'),
        System.import('rxjs/operators'),
        System.import('rxjs/testing'),
        System.import('rxjs/webSocket'),
    ]).then(
        function () { console.log('Successfully tested all entry-points with SystemJS!'); },
        function (error) {
            console.error('\n\nFailed to load an entry-points via SystemJS: \n\n', error.message);
            process.exit(-1);
        }
    );
})(this);
