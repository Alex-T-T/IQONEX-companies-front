import {
    Col,
    DatePicker,
    Form,
    FormInstance,
    Input,
    InputNumber,
    Row,
} from 'antd';
import { CompanyType } from '../types/company.type';

import dayjs from 'dayjs';

type companyFormVariantType = 'update' | 'create';

function CompanyForm({
    form,
    variant,
    data,
}: {
    form: FormInstance<any>;
    variant: companyFormVariantType;
    data?: CompanyType;
}) {
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
            form={form}
            validateTrigger="onBlur"
            autoComplete="off"
            layout="vertical"
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
                        <InputNumber
                            type="number"
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
