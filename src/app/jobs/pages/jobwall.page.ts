import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CompanyEntity } from '../../core/entities';
import { RemoteCompanyService } from '../../core/services';

import { CompanyPage } from '.';

@Component({
  selector: 'page-jobwall',
  templateUrl: 'jobwall.page.html'
})
export class JobWallPage implements OnInit {

  public spotlightCompanies: CompanyEntity[];

  constructor(
    private companyService: RemoteCompanyService,
    private navController: NavController
  ) {
  }
  
  ngOnInit(): void {
    this.companyService.getSpotlight().subscribe(result => this.spotlightCompanies = result);
  }

  onCardClick(companyId: number) {
    this.navController.push(CompanyPage, { id: companyId });
  }
}
