import React from "react";
import { Layout, Card, Col, Row } from "antd";
import Navbar from "../../components/Navbar/DarkNavbar";
import "./Applications.css";
const { Content } = Layout;

const Applications = () => {
  return (
    <Layout>
      <Navbar selectedPage="apps" />
      <Content>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Education Officer Application" bordered={false}>
              do u like whoa
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Applications;
