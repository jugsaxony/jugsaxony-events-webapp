import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from "../shared/shared.module";
import { throwIfAlreadyLoaded } from "./functions/core-functions";
import { CoreContainer, TabsContainer } from './containers';
import { AboutPage } from "./pages";
import {
  RemoteEventsService,
  RemoteRegistrationsService,
  RemoteWpPagesService,
  PWAService,
  EventDataService,
  EventRegistrationService,
  RemoteAboutService,
  RemoteClientService,
  RemoteCompanyService
} from './services';

export const COMPONENTS = [
  CoreContainer,
  TabsContainer,
  AboutPage
];

export const SERVICES = [
  RemoteEventsService,
  RemoteRegistrationsService,
  RemoteWpPagesService,
  RemoteAboutService,
  RemoteClientService,
  EventDataService,
  EventRegistrationService,
  PWAService,
  RemoteCompanyService
]

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: COMPONENTS,
  entryComponents: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: SERVICES,
    };
  }
}
