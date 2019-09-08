import { NgModule } from '@angular/core';

import { SharedModule } from "../shared/shared.module";
import { NewsPage } from './pages';

export const COMPONENTS = [
  NewsPage
];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: COMPONENTS,
  entryComponents: COMPONENTS
})
export class NewsModule {}
