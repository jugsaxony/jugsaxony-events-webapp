import { NgModule } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FabActivityIndicatorComponent, NavbarActivityIndicatorComponent, AppStateComponent } from "./components";
import { ToFirstUpperPipe, EnumerationPipe } from "./pipes";

const COMPONENTS = [
  FabActivityIndicatorComponent,
  NavbarActivityIndicatorComponent,
  AppStateComponent
];

const PIPES = [
  EnumerationPipe,
  ToFirstUpperPipe
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES
  ],
  exports: [
    ...COMPONENTS,
    ...PIPES,
    CommonModule,
    FormsModule,
    IonicModule
  ],
})
export class SharedModule { }
