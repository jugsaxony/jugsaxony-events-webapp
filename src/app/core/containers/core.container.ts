import { Component, ViewChild } from '@angular/core';
import { ModalController, Nav } from 'ionic-angular';

import { AboutPage } from '../pages';
import { environment } from '../../util/environment';
import { TabsContainer } from '.';

@Component({
  templateUrl: 'core.container.html',
  selector: "core-container"
})
export class CoreContainer {

  @ViewChild(Nav)
  private nav: Nav;

  version: string = environment.version;

  constructor(
    private modal: ModalController
  ) { }

  ngOnInit() {
    this.nav.push(TabsContainer);
  }

  openAboutPage() {
    const dialog = this.modal.create(AboutPage)
    dialog.present();
  }
}
