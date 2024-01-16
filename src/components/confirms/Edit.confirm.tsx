import { Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { companiesApi } from '../../API/companies.api';
import { CompanyType } from '../../types/company.type';
import CompanyForm from '../CompanyForm';
import { DataType } from '../CompaniesList';

export const ShowEditConfirm = (
    record: DataType,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setCompanies: React.Dispatch<React.SetStateAction<CompanyType[]>>,
    successMessage: (notification: string) => void,
    errorMessage: (notification: string) => void
) => {
    const { confirm } = Modal;

    const handleOk = (values: CompanyType) => {
        setIsLoading(true);
        companiesApi
            .updateCompany(record.companyname, values)
            .then((res) => {
                setCompanies((prev) => {
                    const companyIndexToUpdate = prev.findIndex(
                        (company) => company.companyname === record.companyname
                    );

                    if (companyIndexToUpdate === -1) {
                        return prev;
                    }

                    const updatedCompany = {
                        ...prev[companyIndexToUpdate],
                        ...values,
                    };

                    const updatedCompanies = [...prev];
                    updatedCompanies[companyIndexToUpdate] = updatedCompany;

                    return updatedCompanies;
                });
                successMessage(
                    `Company "${record.companyname}" was successfully updated!`
                );
                Modal.destroyAll();
            })
            .catch((error) =>
                errorMessage(
                    `Something went wrong! Try again! ${error.message}`
                )
            )
            .finally(() => setIsLoading(false));
    };

    confirm({
        title: (
            <Title type="success" level={4}>
                Company editing form
            </Title>
        ),
        content: (
            <CompanyForm
                formId="Edit company form"
                variant="update"
                data={record}
                onSubmit={handleOk}
            />
        ),
        icon: <ExclamationCircleFilled />,
        okText: 'Save',
        okType: 'primary',
        okButtonProps: { htmlType: 'submit', form: 'Edit company form' },

        cancelText: 'Cancel',
        onOk: handleOk,
        centered: true,
        width: 1000,
    });
};
