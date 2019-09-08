export type RegistrationToken = string;

export class RegistrationEntity {
    eventId: string;
    fistName: string;
    lastName: string;
    emailAddress: string;
    company: string;
    token: RegistrationToken;
}
