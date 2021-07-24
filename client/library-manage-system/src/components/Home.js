import React from "react";

import { Image, Form, Button, Typography, Row, Col, Input } from "antd";

import Logo from "../picture/logo.png";

const { Text, Title } = Typography;

export default function Home() {
  const labelWrapperCol = {
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  };

  const formStyleLibrarian = {
    style: {
      backgroundColor: "#92A3FF",
      borderRadius: "20px",
      padding: "20px 20px 0 0",
    },
  };

  const formStyleStudent = {
    style: {
      backgroundColor: "#FF7777",
      borderRadius: "20px",
      padding: "20px 20px 0 0",
    },
  };
  return (
    <>
      <Row justify="center">
        <Col>
          <Image src={Logo} width={400} />
        </Col>
      </Row>
      <Row justify="space-around">
        <Col>
          <Row justify="center">
            <Title level={2} strong underline>
              บรรณารักษ์
            </Title>
          </Row>
          <Row>
            <Col {...formStyleLibrarian}>
              <Form {...labelWrapperCol} initialValues={{ remember: true }}>
                <Form.Item
                  label="ชื่อผู้ใช้"
                  name="username"
                  rules={[
                    { required: true, message: "กรุณากรอกชื่อผู้ใช้ของคุณ!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="รหัสผ่าน"
                  name="password"
                  rules={[
                    { required: true, message: "กรุณากรอกรหัสผ่านของคุณ!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    htmlType="submit"
                    shape="round"
                    size="large"
                    style={{ color: "#405EFF" }}
                  >
                    ยืนยัน
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col>
          <Row justify="center">
            <Title level={2} strong underline>
              นักเรียน
            </Title>
          </Row>
          <Row>
            <Col {...formStyleStudent}>
              <Form {...labelWrapperCol} initialValues={{ remember: true }}>
                <Form.Item
                  label="ชื่อผู้ใช้"
                  name="username"
                  rules={[
                    { required: true, message: "กรุณากรอกชื่อผู้ใช้ของคุณ!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="รหัสผ่าน"
                  name="password"
                  rules={[
                    { required: true, message: "กรุณากรอกรหัสผ่านของคุณ!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    htmlType="submit"
                    shape="round"
                    size="large"
                    style={{ color: "#FF3C3C" }}
                  >
                    ยืนยัน
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}
