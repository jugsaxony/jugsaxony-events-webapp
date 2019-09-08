import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, Platform } from 'ionic-angular';

import { CompanyEntity } from '../../core/entities';
import { RemoteCompanyService } from '../../core/services';

import { JobOfferPage } from '.';

@Component({
  templateUrl: 'company.page.html',
  selector: 'page-company'
})
export class CompanyPage implements OnInit {

  public company: CompanyEntity;

  public showContactOptionSlider: boolean = true;

  private companyId: number;

  constructor(
    public navCtrl: NavController,
    private companyService: RemoteCompanyService,
    private platform: Platform,
    navParams: NavParams,
  ) {
    this.companyId = navParams.get('id');
  }

  ngOnInit(): void {
    this.companyService.getCompany(this.companyId).subscribe(result => {
      this.company = result
      this.showContactOptionSlider = !this.platform.is('core') && this.contactOptionCount(result) > 6;
    });
  }

  onCardClick(jobOfferId: number) {
    this.navCtrl.push(JobOfferPage, { companyId: this.company.id, id: jobOfferId });
  }

  private contactOptionCount(c: CompanyEntity): number {
    return (0 +
      (!!c.careerPageUrl ? 1 : 0) +
      (!!c.email ? 1 : 0) +
      (!!c.twitter ? 1 : 0) +
      (!!c.facebook ? 1 : 0) +
      (!!c.xing ? 1 : 0) +
      (!!c.linkedIn ? 1 : 0) +
      (!!c.instagram ? 1 : 0) +
      (!!c.youtube ? 1 : 0));
  }
}
