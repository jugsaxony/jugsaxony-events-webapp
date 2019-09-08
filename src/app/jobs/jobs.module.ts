import { NgModule } from '@angular/core';

import { SharedModule } from "../shared/shared.module";
import { JobWallPage, CompanyPage, JobOfferPage } from './pages';

import { SocialButtonComponent, JobOfferCardComponent } from './components';

export const COMPONENTS = [
  JobWallPage,
  CompanyPage,
  JobOfferPage,
  JobOfferCardComponent,
  SocialButtonComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: COMPONENTS,
  entryComponents: COMPONENTS
})
export class JobsModule { }
