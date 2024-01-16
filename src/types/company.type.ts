import { Dayjs } from 'dayjs';

export type CompanyType = {
    companyname: string;
    registration_date: Dayjs;
    country: string;
    city: string;
    postalcode: number;
    street: string;
    housenumber: string;
    state: string;
    object_of_the_company: string;
    [key: string]: string | number | Dayjs;
};

export type CompanyCreateType = {
    companyname: string;
    registration_date?: Dayjs;
    country?: string;
    city?: string;
    postalcode?: number;
    street?: string;
    housenumber?: string;
    state?: string;
    object_of_the_company?: string;
};

export type getCompanyResType = {
    data: CompanyType[];
    length: number;
};
