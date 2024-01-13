import axios, { AxiosError } from 'axios';
import { HttpRoutesEnums } from '../enums/enums';

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
            .catch((error: AxiosError) => console.log(error.message));
    },
};
