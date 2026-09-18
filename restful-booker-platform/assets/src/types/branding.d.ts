export interface Branding {
    name: string;
    description: string;
    logoUrl: string;
    directions: string;
    map: {
        latitude: number;
        longitude: number;
    };
    contact: {
        name: string;
        phone: string;
        email: string;
    };
    address: {
        line1: string;
        line2: string;
        postTown: string;
        county: string;
        postCode: string;
    };
}