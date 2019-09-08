import { JobOfferEntity } from "./job-offer.entity";

export class CompanyEntity {
    id: number;
    name: string;
    logoUrl: string;
    appImageUrl: string;
    claim: string;
    careerPageUrl: string;
    website: string;
    email: string;
    twitter: string;
    facebook: string;
    xing: string;
    linkedIn: string;
    instagram: string;
    youtube: string;
    statement: string;
    jobOffers: JobOfferEntity[];
    jobLocations: string[];
}