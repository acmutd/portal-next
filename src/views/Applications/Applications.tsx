import React from "react";
import { Layout, Card, Col, Row } from "antd";
import Navbar from "../../components/Navbar/DarkNavbar";
import "./Applications.css";
const { Content } = Layout;
const { Meta } = Card;

const Applications = () => {
  return (
    <Layout>
      <Navbar selectedPage="apps" />
      <Content>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Education Officer Application" bordered={false}>
              do u like 2 educate whoa
            </Card>
          </Col>
          <Col span={8}>
            <Card
              hoverable
              cover={
                <img
                  alt="appImg"
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/ACM_SIGGRAPH_logo.svg/1200px-ACM_SIGGRAPH_logo.svg.png"
                  style={{ height: 200, padding: 20 }}
                />
              }
              actions={[<h3>click here to go to app</h3>]}
            >
              <Meta
                title="Education Officer Application"
                description="whoa wanna be an officer bc this is the best division??"
              />
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
