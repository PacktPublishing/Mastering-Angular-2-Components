// Import Angular bootstrap function
import {bootstrap} from '@angular/platform-browser-dynamic';
import {provide} from '@angular/core';
// Import router dependencies
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS} from '@angular/router';
import {DataProvider} from '../data-access/data-provider';
import {PluginService} from './plugin/plugin-service';
// Import our main app component
import {App} from './app';

// We are bootstrapping Angular using our main application component
bootstrap(App, [
  DataProvider,
  PluginService,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {
    useClass: HashLocationStrategy
  })
]);
