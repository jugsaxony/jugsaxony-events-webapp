import { Component, ViewChild } from '@angular/core';
import { Content, ViewController } from 'ionic-angular';

import { RemoteWpPagesService, RemoteAboutService } from "../services";

@Component({
  selector: 'page-about',
  templateUrl: 'about.page.html'
})
export class AboutPage {

  public page: string;
  public imprintPage: string;
  public aboutUsPage: string;
  public dataProtectionPage: string;
  public faqPage: string;

  @ViewChild(Content)
  private content: Content;

  constructor(
    private viewCtrl: ViewController,
    private aboutService: RemoteAboutService,
    private wpPagesService: RemoteWpPagesService) {
    this.page = "aboutUsPage";
  }

  ionViewWillEnter() {
    // alle Buttons entfernen und die Links in Text umwandeln
    this.wpPagesService.getAboutDocument().subscribe((result) =>
      this.aboutUsPage = result.content.rendered
        .replace(/<h4>Wir über uns<\/h4>/, "<h1>Wir über uns</h1>")
        .replace(/<a class="btn\b[^>]*>.*?<\/a>/ig, "")
        .replace(/<a\b[^>]*>(.*?)<\/a>/ig, "$1"));
    // alle Links in Text umwandeln
    this.wpPagesService.getImprintDocument().subscribe((result) =>
      this.imprintPage = result.content.rendered
        .replace(/^/, "<h1>Impressum</h1>")
        .replace(/<a\b[^>]*>(.*?)<\/a>/ig, "$1"));
    this.wpPagesService.getDataProtectionDocument().subscribe((result) =>
      this.dataProtectionPage = result.content.rendered
        .replace(/^/, "<h1>Datenschutzerklärung</h1>")
        .replace(/<h2>(.*?)<\/h2>/ig, "<h4>$1</h4>")
        .replace(/<a\b[^>]*>(.*?)<\/a>/ig, "$1"));
    this.aboutService.getFaq().subscribe((result) =>
      this.faqPage = result.faq);
    setTimeout(() => this.content.scrollToTop());
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
