import { Component } from '@angular/core';

import { EventListPage } from "../../events/pages";
import { JobWallPage } from "../../jobs/pages";
import { NewsPage } from "../../news/pages";

@Component({
  templateUrl: 'tabs.container.html',
  selector: "tabs-container"
})
export class TabsContainer {

  public eventsRoot = EventListPage;
  public jobsRoot = JobWallPage;
  public newsRoot = NewsPage;

  constructor() {
  }
}
