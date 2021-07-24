import React from "react";

import {
  Image,
  Form,
  Button,
  Typography,
  Divider,
  Row,
  Col,
  Input,
} from "antd";

const { Title } = Typography;

export default function Librarian() {
  const labelWrapperCol = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const formStyleAddBook = {
    style: {
      backgroundColor: "#60F5FF",
      borderRadius: "20px",
      padding: "20px 20px 0 0",
    },
  };

  const formStyleBorrowBook = {
    style: {
      backgroundColor: "#FFE76B",
      borderRadius: "20px",
      padding: "20px 20px 0 0",
    },
  };

  const formStyleReturnBook = {
    style: {
      backgroundColor: "#A3FF77",
      borderRadius: "20px",
      padding: "20px 20px 0 0",
    },
  };

  return (
    <>
      <Row justify="space-around">
        <Col span={8}>
          <Row justify="center">
            <Col>
              <Title level={3} strong underline>
                เพิ่มหนังสือ
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col {...formStyleAddBook} span={20}>
              <Form {...labelWrapperCol} initialValues={{ remember: true }}>
                <Form.Item
                  label="ชื่อหนังสือ"
                  name="ิbookName"
                  rules={[{ required: true, message: "กรุณากรอกชื่อหนังสือ!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="รหัสหนังสือ"
                  name="bookPassword"
                  rules={[{ required: true, message: "กรุณากรอกรหัสหนังสือ" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="ประเภทหนังสือ"
                  name="bookType"
                  rules={[
                    { required: true, message: "กรุณากรอกประเภทหนังสือ" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    htmlType="submit"
                    shape="round"
                    size="large"
                    style={{ color: "#006066" }}
                  >
                    เพิ่ม
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
        <Col span={8}>
          <Row justify="center">
            <Col>
              <Title level={3} strong underline>
                ยืมหนังสือ
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col {...formStyleBorrowBook} span={24}>
              <Form {...labelWrapperCol} initialValues={{ remember: true }}>
                <Form.Item
                  label="ชื่อหนังสือ"
                  name="ิbookName"
                  rules={[{ required: true, message: "กรุณากรอกชื่อหนังสือ!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="รหัสหนังสือ"
                  name="bookPassword"
                  rules={[{ required: true, message: "กรุณากรอกรหัสหนังสือ" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="รหัสประจำตัวนักเรียน"
                  name="studentId"
                  rules={[
                    {
                      required: true,
                      message: "กรุณากรอกรหัสประจำตัวนักเรียน",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    htmlType="submit"
                    shape="round"
                    size="large"
                    style={{ color: "#CDAC00" }}
                  >
                    ยืม
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={8}>
          <Row justify="center">
            <Col>
              <Title level={3} strong underline>
                คืนหนังสือ
              </Title>
            </Col>
          </Row>
          <Row justify="center">
            <Col {...formStyleReturnBook}>
              <Form {...labelWrapperCol} initialValues={{ remember: true }}>
                <Form.Item
                  label="รหัสหนังสือ"
                  name="bookPassword"
                  rules={[{ required: true, message: "กรุณากรอกรหัสหนังสือ" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button
                    htmlType="submit"
                    shape="round"
                    size="large"
                    style={{ color: "#36A800" }}
                  >
                    คืน
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
