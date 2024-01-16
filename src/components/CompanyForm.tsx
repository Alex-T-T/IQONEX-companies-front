import { Col, DatePicker, Form, Input, Row } from 'antd';
import { CompanyType } from '../types/company.type';
import { DataType } from './CompaniesList';
import dayjs from 'dayjs';

type companyFormVariantType = 'update' | 'create';

function CompanyForm({
    onSubmit,
    formId,
    data,
    variant,
}: {
    onSubmit: (...args: any[]) => any;
    formId: string;
    variant: companyFormVariantType;
    data?: DataType;
}) {
    // const handleSubmit = async (values: CompanyType) => {
    //     console.log('values: ', values);
    //     onSubmit(values);
    // };

    // const [form] = Form.useForm();
    // const handleSubmit = async (
    //     // event: React.FormEvent<HTMLInputElement>,
    //     values: CompanyType
    // ) => {
    //     // event.preventDefault();
    //     console.log('values: ', values);
    //     try {
    //         const values = await form.validateFields();
    //         onSubmit(values);
    //     } catch (errorInfo) {
    //         console.log('Validation failed:', errorInfo);
    //     }
    // };

    const initialValues =
        variant === 'update' && data
            ? {
                  companyname: data.companyname,
                  registration_date: data.registration_date
                      ? dayjs(data.registration_date, 'YYYY-MM-DD')
                      : '',
                  country: data.country ? data.country : '',
                  city: data.city ? data.city : '',
                  postalcode: data.postalcode ? data.postalcode : '',
                  street: data.street ? data.street : '',
                  housenumber: data.housenumber ? data.housenumber : '',
                  state: data.state ? data.state : '',
                  object_of_the_company: data.object_of_the_company
                      ? data.object_of_the_company
                      : '',
              }
            : {
                  companyname: '',
                  registration_date: '',
                  country: '',
                  city: '',
                  postalcode: '',
                  street: '',
                  housenumber: '',
                  state: '',
                  object_of_the_company: '',
              };

    return (
        <Form
            // form={form}
            // validateTrigger="onBlur"
            // onFinish={handleSubmit}
            autoComplete="off"
            layout="vertical"
            id={formId}
            initialValues={initialValues}
        >
            <Row gutter={32}>
                <Col span={10} offset={1}>
                    <Form.Item
                        label="Company name"
                        name="companyname"
                        rules={[
                            {
                                min: 3,
                                required: true,
                                message: 'Please input the company name!',
                            },
                        ]}
                    >
                        <Input
                            type="text"
                            variant="outlined"
                            name="companyname"
                            // required
                        />
                    </Form.Item>
                    <Form.Item
                        label="Registration date"
                        name="registration_date"
                    >
                        <DatePicker
                            variant="outlined"
                            name="registration_date"
                        />
                    </Form.Item>
                    <Form.Item label="Country" name="country">
                        <Input type="text" variant="outlined" name="country" />
                    </Form.Item>
                    <Form.Item label="City" name="city">
                        <Input type="text" variant="outlined" name="city" />
                    </Form.Item>
                    <Form.Item label="Postal code" name="postalcode">
                        <Input
                            type="text"
                            variant="outlined"
                            name="postalcode"
                        />
                    </Form.Item>
                </Col>
                <Col span={10} offset={1}>
                    <Form.Item label="Street" name="street">
                        <Input type="text" variant="outlined" name="street" />
                    </Form.Item>
                    <Form.Item label="House number" name="housenumber">
                        <Input
                            type="text"
                            variant="outlined"
                            name="housenumber"
                        />
                    </Form.Item>
                    <Form.Item label="State" name="state">
                        <Input type="text" variant="outlined" name="state" />
                    </Form.Item>
                    <Form.Item
                        label="Object of the company"
                        name="object_of_the_company"
                    >
                        <Input.TextArea
                            variant="outlined"
                            name="object_of_the_company"
                            autoSize
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}

export default CompanyForm;
