import {
  Button,
  Card,
  Form,
  Input,
  message,
  Row,
  Col,
  InputNumber,
  DatePicker,
  Select,
  Typography,
} from "antd";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../../services/https";
import { UsersInterface } from "../../../interfaces/IUser";
import logo from "../../../assets/logo.png";

const { Title, Text } = Typography;

function SignUpPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: UsersInterface) => {
    let res = await CreateUser(values);

    if (res.message) {
      messageApi.open({
        type: "success",
        content: "Sign-up successful",
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontFamily: 'Kanit, sans-serif',
          backgroundColor: '#003366',
          padding: '0 20px', // Adjusted padding for responsiveness
        }}
      >
        <Card
          style={{
            width: '100%',
            maxWidth: '500px', // Adjusted width for consistency
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            padding: '32px',
            textAlign: 'center',
            backgroundColor: '#ffffff',
          }}
        >
          <Row justify="center">
            <Col span={24}>
              <img
                alt="logo"
                src={logo}
                style={{ width: '50%', maxWidth: '150px', marginBottom: '24px' }} // Consistent logo size
              />
            </Col>
            <Col span={24}>
              <Title level={3} style={{ color: '#003366', marginBottom: '24px' }}>
                Sign Up
              </Title>
              <Form
                name="basic"
                layout="vertical"
                onFinish={onFinish}
                autoComplete="off"
                style={{ fontFamily: 'Kanit, sans-serif' }}
              >
                <Row gutter={[16, 16]}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px' }}>ชื่อจริง</span>}
                      name="first_name"
                      rules={[{ required: true, message: "กรุณากรอกชื่อ !" }]}
                    >
                      <Input
                        style={{ fontSize: '16px', padding: '12px', borderRadius: '8px', border: '1px solid #003366' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px' }}>นามสกุล</span>}
                      name="last_name"
                      rules={[{ required: true, message: "กรุณากรอกนามสกุล !" }]}
                    >
                      <Input
                        style={{ fontSize: '16px', padding: '12px', borderRadius: '8px', border: '1px solid #003366' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px' }}>อีเมล</span>}
                      name="email"
                      rules={[
                        { type: "email", message: "รูปแบบอีเมลไม่ถูกต้อง !" },
                        { required: true, message: "กรุณากรอกอีเมล !" }
                      ]}
                    >
                      <Input
                        style={{ fontSize: '16px', padding: '12px', borderRadius: '8px', border: '1px solid #003366' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px' }}>รหัสผ่าน</span>}
                      name="password"
                      rules={[{ required: true, message: "กรุณากรอกรหัสผ่าน !" }]}
                    >
                      <Input.Password
                        style={{ fontSize: '16px', padding: '12px', borderRadius: '8px', border: '1px solid #003366' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px' }}>วัน/เดือน/ปี เกิด</span>}
                      name="birthday"
                      rules={[{ required: true, message: "กรุณาเลือกวัน/เดือน/ปี เกิด !" }]}
                    >
                      <DatePicker style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px' }}>อายุ</span>}
                      name="age"
                      rules={[{ required: true, message: "กรุณากรอกอายุ !" }]}
                    >
                      <InputNumber
                        min={0}
                        max={99}
                        defaultValue={0}
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px' }}>เพศ</span>}
                      name="gender_id"
                      rules={[{ required: true, message: "กรุณาเลือกเพศ !" }]}
                    >
                      <Select
                        defaultValue=""
                        style={{ width: "100%" }}
                        options={[
                          { value: "", label: "กรุณาเลือกเพศ", disabled: true },
                          { value: 1, label: "Male" },
                          { value: 2, label: "Female" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      label={<span style={{ fontSize: '16px' }}>ที่อยู่</span>}
                      name="address"
                      rules={[{ required: true, message: "กรุณากรอกที่อยู่ !" }]}
                    >
                      <Input.TextArea rows={4} />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{
                          width: '100%',
                          backgroundColor: '#003366',
                          borderColor: '#003366',
                          height: '40px',
                          fontSize: '16px',
                          borderRadius: '8px',
                          marginTop: '16px'
                        }}
                      >
                        Sign up
                      </Button>
                      <Text style={{ marginTop: '10px', display: 'block', color: '#ffffff' }}>
                        Or{' '}
                        <a onClick={() => navigate("/")} style={{ color: '#FFD700' }}>
                          signin now!
                        </a>
                      </Text>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default SignUpPages;
