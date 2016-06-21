// Import Angular bootstrap function
import {bootstrap} from '@angular/platform-browser-dynamic';
import {DataProvider} from '../data-access/data-provider';

// Import our main app component
import {App} from './app';

// We are bootstrapping Angular using our main application component
bootstrap(App, [
  DataProvider
]);
