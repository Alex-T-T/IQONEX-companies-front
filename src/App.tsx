import { Col, Divider, Row } from 'antd';
import './App.css';
import CompaniesList from './components/CompaniesList';
import Layout, { Content, Footer, Header } from 'antd/es/layout/layout';
import Text from 'antd/es/typography/Text';
import Title from 'antd/es/typography/Title';

function App() {
    return (
        <Layout>
            <Header
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'transparent',
                }}
            >
                <Title>IQUNEX test</Title>
            </Header>
            <Divider />
            <Content>
                <Row>
                    <Col xs={24} md={{ span: 22, offset: 1 }}>
                        <CompaniesList />
                    </Col>
                </Row>
            </Content>
            <Divider />
            <Footer>
                <Text>Created as a test task for IQUNEX</Text>
            </Footer>
        </Layout>
    );
}

export default App;
