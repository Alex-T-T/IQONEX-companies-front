import { useEffect, useState } from 'react';

import { Button, Table, message } from 'antd';
import Title from 'antd/es/typography/Title';
import Text from 'antd/es/typography/Text';
import type { PaginationProps, TableColumnsType } from 'antd';
import { AxiosError } from 'axios';

import { companiesApi } from '../API/companies.api';
import { CompanyType } from '../types/company.type';
import ActionButtons from './ActionButtons';
import { showDeleteConfirm } from './confirms/Delete.confirm';
import { ShowEditConfirm } from './confirms/Edit.confirm';
import dayjs from 'dayjs';
import { PlusCircleTwoTone } from '@ant-design/icons';
import CompanyCreateForm from './CompanyCreateForm';

type keyType = {
    key: React.Key;
};
export type DataType = keyType & CompanyType;

function CompaniesList() {
    const [companies, setCompanies] = useState<CompanyType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [total, setTotal] = useState(0);
    const [curentPage, setCurrentPage] = useState(1);
    const [messageApi, contextHolder] = message.useMessage();
    const [isCreateModal, setIsCreateModal] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        companiesApi
            .getCompanies()
            .then((res) => {
                setCompanies(res?.data);
                setTotal(res?.length);
            })
            .catch((error: AxiosError) => console.log(error.message))
            .finally(() => setIsLoading(false));
    }, []);

    const columns: TableColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: '',
            width: 100,
            key: 'number',
            fixed: 'left',
            render: (_, record: { key: React.Key }, index) =>
                companies.length >= 1 && (
                    <Text>{index + 1 + (curentPage - 1) * 100}</Text>
                ),
        },
        {
            title: 'Company name',
            dataIndex: 'companyname',
            width: 150,
            key: 'companyname',
            fixed: 'left',
        },
        {
            title: 'Registration Date',
            dataIndex: 'registration_date',
            key: 'registration_date',
            width: 100,
            render: (_, record) =>
                record.registration_date
                    ? dayjs(record.registration_date).format('YYYY-MM-DD')
                    : '',
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            width: 150,
        },
        {
            title: 'City',
            dataIndex: 'city',
            key: 'city',
            width: 150,
        },
        {
            title: 'Postalcode',
            dataIndex: 'postalcode',
            key: 'postalcode',
            width: 110,
        },
        {
            title: 'Street',
            dataIndex: 'street',
            key: 'street',
            width: 150,
        },
        {
            title: 'Housenumber',
            dataIndex: 'housenumber',
            key: 'housenumber',
            width: 100,
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
            width: 150,
        },
        {
            title: 'Object of the company',
            dataIndex: 'object_of_the_company',
            key: 'object_of_the_company',
            width: 400,
        },
        {
            title: 'Action',
            dataIndex: '',
            key: 'x',
            fixed: 'right',
            width: 220,
            render: (_, record) => (
                <ActionButtons
                    onEditClick={() =>
                        ShowEditConfirm(
                            record,
                            setIsLoading,
                            setCompanies,
                            successMessage,
                            errorMessage
                        )
                    }
                    onDeleteClick={() =>
                        showDeleteConfirm(
                            record.companyname,
                            setIsLoading,
                            setCompanies,
                            successMessage,
                            errorMessage
                        )
                    }
                />
            ),
        },
    ];

    const dataSource: DataType[] = companies.map((company) => ({
        ...company,
        key: company.companyname,
    }));

    const onPaginationChange = (page: number, limit: number) => {
        setIsLoading(true);
        companiesApi
            .getCompanies(page, limit)
            .then((res) => {
                setCompanies(res?.data);
                setTotal(res?.length);
            })
            .catch((error: AxiosError) => console.log(error.message))
            .finally(() => setIsLoading(false));
    };

    const showTotal: PaginationProps['showTotal'] = (total) =>
        `Total ${total} items`;

    const successMessage = (notification: string) => {
        messageApi.open({
            type: 'success',
            content: notification,
            duration: 5,
        });
    };

    const errorMessage = (notification: string) => {
        messageApi.open({
            type: 'error',
            content: notification,
            duration: 5,
        });
    };

    const onCreate = async (values: any) => {
        console.log('Received values of form: ', values);
        companiesApi
            .createCompany(values)
            .then(() =>
                successMessage(
                    `Company ${values.companyname} successfully created`
                )
            )
            .catch((error) => errorMessage(error))
            .finally(() => setIsCreateModal(false));
    };

    return (
        <>
            {contextHolder}
            <Table
                title={() => (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Title level={3}>Companies</Title>
                        <Button
                            type="primary"
                            icon={<PlusCircleTwoTone />}
                            onClick={
                                () => setIsCreateModal(true)
                                // () =>
                                // ShowCreateConfirm(
                                //     setIsLoading,
                                //     setCompanies,
                                //     successMessage,
                                //     errorMessage
                                // )
                            }
                        >
                            Add
                        </Button>
                        <CompanyCreateForm
                            open={isCreateModal}
                            onCreate={onCreate}
                            onCancel={() => {
                                setIsCreateModal(false);
                            }}
                        />
                    </div>
                )}
                columns={columns}
                dataSource={dataSource}
                pagination={{
                    defaultCurrent: 1,
                    defaultPageSize: 100,
                    showSizeChanger: false,
                    total: total,
                    showTotal: showTotal,
                    onChange: (page: number, pageSize: number) => {
                        onPaginationChange(page, pageSize);
                        setCurrentPage(page);
                    },
                    position: ['topRight', 'bottomRight'],
                }}
                scroll={{ x: 1500, y: 500 }}
                bordered
                loading={{
                    size: 'large',
                    tip: 'Loading...',
                    spinning: isLoading,
                }}
            />
        </>
    );
}

export default CompaniesList;
