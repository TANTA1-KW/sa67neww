import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Form,
  Input,
  Checkbox,
  Button,
  Divider,
  message,
  Typography,
  DatePicker,
  Select,
  InputNumber,
  Row,
  Col,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { CreateUser } from '../../../services/https';
import { UsersInterface } from '../../../interfaces/IUser';
import { useState } from 'react';
import logo from "../../../assets/logo.png";

const { Title, Text } = Typography;

const SignUpPages = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: UsersInterface) => {
    try {
      setLoading(true);
      let res = await CreateUser(values);
      if (res.message) {
        message.success("Sign-up successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      message.error("An error occurred during sign-up");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Kanit, sans-serif',
      }}
    >
      <video
        src="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      />

      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          width: '100%',
          maxWidth: '500px',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          zIndex: 1,
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <img src={logo} alt="TWN Rent Car" style={{ height: '40px', marginBottom: '16px' }} />
          <Title level={3} style={{ color: 'white', marginBottom: '8px', fontFamily: 'Kanit, sans-serif' }}>
            TWN Rent Car
          </Title>
          <Text style={{ color: 'white', fontFamily: 'Kanit, sans-serif' }}>
            Create your account
          </Text>
        </div>

        <Form
          name="signup"
          onFinish={onFinish}
          layout="vertical"
        >
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: 'white', fontFamily: 'Kanit, sans-serif' }}>First Name</span>}
                name="first_name"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input
                  size="large"
                  placeholder="First Name"
                  style={{ borderRadius: '4px', backgroundColor: 'white', color: 'black', fontFamily: 'Kanit, sans-serif' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: 'white', fontFamily: 'Kanit, sans-serif' }}>Last Name</span>}
                name="last_name"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input
                  size="large"
                  placeholder="Last Name"
                  style={{ borderRadius: '4px', backgroundColor: 'white', color: 'black', fontFamily: 'Kanit, sans-serif' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: 'white', fontFamily: 'Kanit, sans-serif' }}>Email</span>}
                name="email"
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { type: 'email', message: 'The input is not a valid email!' },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Email"
                  style={{ borderRadius: '4px', backgroundColor: 'white', color: 'black', fontFamily: 'Kanit, sans-serif' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: 'white', fontFamily: 'Kanit, sans-serif' }}>Password</span>}
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password
                  size="large"
                  placeholder="Password"
                  style={{ borderRadius: '4px', backgroundColor: 'white', color: 'black', fontFamily: 'Kanit, sans-serif' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: 'white', fontFamily: 'Kanit, sans-serif' }}>Date of Birth</span>}
                name="birthday"
                rules={[{ required: true, message: 'Please select your date of birth!' }]}
              >
                <DatePicker
                  style={{ width: '100%', borderRadius: '4px', backgroundColor: 'white', color: 'black', fontFamily: 'Kanit, sans-serif' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: 'white', fontFamily: 'Kanit, sans-serif' }}>Age</span>}
                name="age"
                rules={[{ required: true, message: 'Please input your age!' }]}
              >
                <InputNumber
                  min={0}
                  max={99}
                  defaultValue={0}
                  style={{ width: '100%', borderRadius: '4px', backgroundColor: 'white', color: 'black', fontFamily: 'Kanit, sans-serif' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: 'white', fontFamily: 'Kanit, sans-serif' }}>Gender</span>}
                name="gender_id"
                rules={[{ required: true, message: 'Please select your gender!' }]}
              >
                <Select
                  defaultValue=""
                  style={{ width: '100%', borderRadius: '4px', backgroundColor: 'white', color: 'black', fontFamily: 'Kanit, sans-serif' }}
                  options={[
                    { value: "", label: "Please select gender", disabled: true },
                    { value: 1, label: "Male" },
                    { value: 2, label: "Female" },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: 'white', fontFamily: 'Kanit, sans-serif' }}>Address</span>}
                name="address"
                rules={[{ required: true, message: 'Please input your address!' }]}
              >
                <Input.TextArea
                  rows={4}
                  style={{ borderRadius: '4px', backgroundColor: 'white', color: 'black', fontFamily: 'Kanit, sans-serif' }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                width: '100%',
                height: '40px',
                fontSize: '16px',
                borderRadius: '8px',
                marginTop: '16px',
                fontFamily: 'Kanit, sans-serif',
              }}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <center>
          <Text style={{ fontSize: 12, color: '#FFD700', fontFamily: 'Kanit, sans-serif' }}>
            <a onClick={() => navigate("/signin")} style={{ color: '#FFD700' }}>
              Sign in now!
            </a>
          </Text>
        </center>
      </div>
    </div>
  );
};

export default SignUpPages;
