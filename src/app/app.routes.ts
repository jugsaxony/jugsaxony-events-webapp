import { DeepLinkConfig } from 'ionic-angular';

import { TabsContainer } from './core/containers';
import { AboutPage } from './core/pages';
import { EventListPage, EventDetailsPage } from "./events/pages";
import { JobWallPage, CompanyPage, JobOfferPage } from "./jobs/pages";
import { NewsPage } from "./news/pages";

export const DEEP_LINK_CONFIG: DeepLinkConfig = {
    links: [
        { component: TabsContainer, name: 'Tabs', segment: 'app' },
        { component: AboutPage, name: 'About', segment: 'imprint' },
        { component: EventListPage, name: 'Events', segment: 'events' },
        { component: NewsPage, name: 'News', segment: 'news' },
        { component: EventDetailsPage, name: 'Event', segment: 'event/:id', defaultHistory: [EventListPage] },
        { component: JobWallPage, name: 'Job Wall', segment: 'jobwall' },
        { component: CompanyPage, name: 'Company', segment: 'company/:id', defaultHistory: [JobWallPage] },
        { component: JobOfferPage, name: 'Job Offer', segment: 'company/:companyId/job-offer/:id', defaultHistory: [JobWallPage, CompanyPage] },
    ]
};
