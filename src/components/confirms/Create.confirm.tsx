import { Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { companiesApi } from '../../API/companies.api';
import { CompanyType } from '../../types/company.type';
import CompanyForm from '../CompanyForm';

export const ShowCreateConfirm = (
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setCompanies: React.Dispatch<React.SetStateAction<CompanyType[]>>,
    successMessage: (notification: string) => void,
    errorMessage: (notification: string) => void
) => {
    const { confirm } = Modal;

    const handleOk = async (values: any) => {
        console.log('values: ', values);
        if (values.companyname === '' || values.companyname.length < 3) {
            errorMessage('Input Company name field and try again.');
            return;
        }

        setIsLoading(true);
        companiesApi
            .createCompany(values)
            .then(() => {
                // console.log('res: ', res);
                successMessage(
                    `Company "${values.companyname}" successfully created!`
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
                Company creating form
            </Title>
        ),
        content: (
            <CompanyForm
                formId="Create new company form"
                variant="create"
                onSubmit={handleOk}
            />
        ),
        icon: <ExclamationCircleFilled />,
        okText: 'Create',
        okType: 'primary',
        okButtonProps: { htmlType: 'submit', form: 'Create new company form' },

        cancelText: 'Cancel',
        // onOk: handleOk,
        width: 1000,
    });
};
