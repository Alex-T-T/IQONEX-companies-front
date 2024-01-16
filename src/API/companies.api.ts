import axios, { AxiosError } from 'axios';
import { HttpRoutesEnums } from '../enums/enums';
import { CompanyType } from '../types/company.type';
import { Dayjs } from 'dayjs';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;

const instance = axios.create({
    baseURL: `${BASE_URL}/${HttpRoutesEnums.API}`,
});

export const companiesApi = {
    getCompanies: async (page?: number, limit?: number) => {
        if (page === undefined) {
            page = 1;
        }
        if (limit === undefined) {
            limit = 100;
        }
        return instance
            .get(`/${HttpRoutesEnums.COMPANIES}/?page=${page}&limit=${limit}`)
            .then((res) => {
                if (res.statusText !== 'OK') {
                    return;
                }
                return res.data;
            })
            .catch((error: AxiosError) => console.log(error.response?.data));
    },

    createCompany: async (data: CompanyType) => {
        const filteredData: { [key: string]: string | number | Dayjs } = {};

        for (const key in data) {
            if (data[key] !== '') {
                filteredData[key] = data[key];
            }
        }
        return instance
            .post(`/${HttpRoutesEnums.COMPANIES}`, filteredData)
            .then((res) => {
                return res.data;
            })
            .catch((error: AxiosError) => {
                console.log(error.response?.data);
                return error;
            });
    },

    updateCompany: async (name: string, data: CompanyType) => {
        return instance
            .patch(`/${HttpRoutesEnums.COMPANIES}/${name}`, data)
            .then((res) => {
                if (res.statusText !== 'OK') {
                    throw new Error(res.statusText);
                }
                return res.data;
            })
            .catch((error: AxiosError) => console.log(error.response?.data));
    },

    deleteCompany: async (name: string) => {
        return instance
            .delete(`/${HttpRoutesEnums.COMPANIES}/${name}`)
            .then((res) => {
                if (res.statusText !== 'OK') {
                    return;
                }
                return res;
            })
            .catch((error: AxiosError) => console.log(error.response?.data));
    },
};
