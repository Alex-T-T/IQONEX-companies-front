import { Modal } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { companiesApi } from '../../API/companies.api';
import { CompanyType } from '../../types/company.type';

export const showDeleteConfirm = (
    name: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setCompanies: React.Dispatch<React.SetStateAction<CompanyType[]>>,
    successMessage: (notification: string) => void,
    errorMessage: (notification: string) => void
) => {
    const { confirm } = Modal;
    confirm({
        title: (
            <Title type="warning" level={4}>
                The company will be deleted!
            </Title>
        ),
        content: (
            <Text>
                Are you sure you want to delete company <br />
                <Text italic>"${name}"</Text>?
            </Text>
        ),
        icon: <ExclamationCircleFilled />,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
            setIsLoading(true);
            companiesApi
                .deleteCompany(name)
                .then(() => {
                    setCompanies((prev) =>
                        prev.filter(
                            (company) =>
                                company.companyname.toLowerCase() !==
                                name.toLowerCase()
                        )
                    );
                    successMessage(
                        `Company "${name}" was successfully deleted!`
                    );
                })
                .catch((error) =>
                    errorMessage(`Something went wrong. ${error.message}`)
                )
                .finally(() => setIsLoading(false));
        },
    });
};
