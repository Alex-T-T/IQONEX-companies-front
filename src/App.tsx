import { useEffect, useState } from 'react';
import './App.css';
import { CompanyType } from './types/company.type';
import { companiesApi } from './API/companies.api';
import { RotatingLines } from 'react-loader-spinner';
import { AxiosError } from 'axios';

function App() {
    const [companies, setCompanies] = useState<CompanyType[]>([]);
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        companiesApi
            .getCompanies()
            .then((res) => {
                setCompanies(res?.data);
            })
            .catch((error: AxiosError) => console.log(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    return (
        <div className="App">
            Our app
            <ul>
                {companies.length > 0 && !loading
                    ? companies.map((company, index) => (
                          <li key={company.companyname}>
                              {index + 1}
                              {company.companyname}
                          </li>
                      ))
                    : null}
                <RotatingLines
                    visible={loading}
                    // height="96"
                    width="96"
                    // color="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    // wrapperStyle={{}}
                    // wrapperClass=""
                />
            </ul>
        </div>
    );
}

export default App;
