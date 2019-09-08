import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicApp, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import localeDE from '@angular/common/locales/de';

import { SharedModule } from "./shared/shared.module";
import { CoreModule } from "./core/core.module";
import { EventsModule } from "./events/events.module";
import { JobsModule } from "./jobs/jobs.module";
import { NewsModule } from "./news/news.module";

import { AppComponent } from "./app.component";
import { DEEP_LINK_CONFIG } from "./app.routes";
import { reducers, metaReducers } from './app.reducers';
import { AppEffects } from './app.effects';

const IONIC_CONFIG = { locationStrategy: 'hash' };

registerLocaleData(localeDE);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(AppComponent, IONIC_CONFIG, DEEP_LINK_CONFIG),
    IonicStorageModule.forRoot(),
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([AppEffects]),
    CoreModule.forRoot(),
    SharedModule,
    EventsModule,
    JobsModule,
    NewsModule
  ],
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  bootstrap: [IonicApp],
  providers: [
    { provide: LOCALE_ID, useValue: "de" },
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
