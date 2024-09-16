import React, { useState, useEffect } from "react";
import { Space, Button, Col, Row, Divider, Form, Input, Card, message, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { UsersInterface } from "../../interfaces/IUser";
import { GetUsers } from "../../services/https/index";
import dayjs from "dayjs";

const { Title } = Typography;

function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<UsersInterface | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const myId = localStorage.getItem("id");

  const getUserById = async (id: string) => {
    try {
      const res = await GetUsers();
      const userData = res.find(user => user.ID === Number(id));
      if (userData) {
        setUser(userData);
        form.setFieldsValue({
          first_name: userData.first_name,
          last_name: userData.last_name,
          age: userData.age,
          birthday: userData.birthday,
          email: userData.email,
          roles: userData.roles,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "ไม่พบข้อมูลผู้ใช้",
        });
        setTimeout(() => {
          navigate("/profile");
        }, 2000);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้",
      });
    }
  };

  useEffect(() => {
    if (myId) {
      getUserById(myId);
    }
  }, [myId]);

  if (!user) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div style={{ fontFamily: 'Kanit, sans-serif', padding: '20px' }}>
      {contextHolder}
      <Card>
        <Title level={2} style={{ fontSize: '24px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>ข้อมูลผู้ใช้</Title>
        <Divider />
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>ชื่อ</span>}
                name="first_name"
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>นามสกุล</span>}
                name="last_name"
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>ตำแหน่ง</span>}
                name="roles"
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>อายุ</span>}
                name="age"
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>วัน/เดือน/ปี เกิด</span>}
                name="birthday"
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} readOnly />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>อีเมล</span>}
                name="email"
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/profile/edit">
                    <Button
                      type="primary"
                      style={{
                        fontSize: '16px',
                        borderRadius: '8px',
                        backgroundColor: '#003366',
                        borderColor: '#003366'
                      }}
                    >
                      แก้ไขข้อมูล
                    </Button>
                  </Link>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default ProfilePage;