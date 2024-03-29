import { Form, Modal } from 'antd';
import CompanyForm from './CompanyForm';
import { CompanyType } from '../types/company.type';

const CompanyCreateForm = ({
    open,
    onCreate,
    onCancel,
}: {
    open: boolean;
    onCreate: (values: CompanyType) => void;
    onCancel: () => void;
}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            open={open}
            title="Create a new company"
            okText="Create"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={async () => {
                form.validateFields({ validateOnly: true })
                    .then((values) => {
                        onCreate(values);
                        form.resetFields();
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            width={1000}
        >
            <CompanyForm form={form} variant="create" />
        </Modal>
    );
};

export default CompanyCreateForm;
