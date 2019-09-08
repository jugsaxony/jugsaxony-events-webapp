import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';
import './polyfills';

platformBrowserDynamic().bootstrapModule(AppModule);
