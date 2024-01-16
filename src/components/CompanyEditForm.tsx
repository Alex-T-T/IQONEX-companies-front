import { Form, Modal } from 'antd';
import CompanyForm from './CompanyForm';
import { CompanyType } from '../types/company.type';

const CompanyEditForm = ({
    open,
    onEdit,
    onCancel,
    data,
}: {
    open: boolean;
    onEdit: (companyname: string, values: CompanyType) => void;
    onCancel: () => void;
    data: CompanyType | null;
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Edit the company"
            okText="Update"
            cancelText="Cancel"
            onCancel={() => {
                onCancel();
                Modal.destroyAll();
            }}
            onOk={async () => {
                form.validateFields({ validateOnly: true })
                    .then((values) => {
                        onEdit(data?.companyname as string, values);
                        form.resetFields();
                        Modal.destroyAll();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            width={1000}
        >
            <CompanyForm form={form} variant="update" data={data} />
        </Modal>
    );
};

export default CompanyEditForm;
