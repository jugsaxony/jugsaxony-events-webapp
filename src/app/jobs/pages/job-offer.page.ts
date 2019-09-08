import { Component, OnInit } from '@angular/core';
import { RemoteCompanyService } from '../../core/services';
import { NavParams } from 'ionic-angular';
import { JobOfferEntity, CompanyEntity } from '../../core/entities';

@Component({
  selector: 'page-job-offer',
  templateUrl: 'job-offer.page.html'
})
export class JobOfferPage implements OnInit {

  public jobOffer: JobOfferEntity;
  public company: CompanyEntity;

  private companyId: number;
  private jobOfferId: number;

  constructor(
    private companyService: RemoteCompanyService,
    navParams: NavParams
  ) {
    this.companyId = navParams.get('companyId');
    this.jobOfferId = navParams.get('id');
  }

  ngOnInit(): void {
    this.companyService.getCompany(this.companyId).subscribe(c => {
      this.company = c;
      this.jobOffer = c.jobOffers.find(o => o.id == this.jobOfferId);
    });
  }

  onMailClick(emailadress: string, jobtitle: string) {
    window.location.href = "mailto:" + emailadress + "?subject=Stellenanzeige" + " " + jobtitle;
  }

  onPhoneClick(phoneNumber: string) {
    document.location.href = `tel:${phoneNumber}`;
  }
}
