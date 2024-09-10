import { Button, Card, Form, Input, message, Row, Col, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../../services/https";
import { SignInInterface } from "../../../interfaces/SignIn";
import logo from "../../../assets/logo.png";

const { Title, Text } = Typography;

function SignInPages() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values: SignInInterface) => {
    try {
      let res = await SignIn(values);
      if (res.id) {
        messageApi.success("Login successful");
        localStorage.setItem("isLogin", "true");
        localStorage.setItem("page", "dashboard");
        localStorage.setItem("token_type", res.token_type);
        localStorage.setItem("token", res.token);
        localStorage.setItem("id", res.id); // Store user ID
        navigate("/"); // Use navigate instead of location.href
      } else {
        messageApi.error(res.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      messageApi.error("An error occurred during login");
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
          backgroundColor: '#003366', // Changed background color to blue
        }}
      >
        <Card
          style={{
            width: 500,
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            padding: '32px',
            textAlign: 'center',
            backgroundColor: '#ffffff', // Keeping the card white for contrast
          }}
        >
          <Row justify="center">
            <Col span={24}>
              <img
                alt="logo"
                src={logo}
                style={{ width: '60%', marginBottom: '24px' }}
              />
            </Col>
            <Col span={24}>
              <Title level={3} style={{ fontFamily: 'Kanit, sans-serif', marginBottom: '24px', color: '#003366' }}>
                Welcome Back
              </Title>
              <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                layout="vertical"
                style={{ fontFamily: 'Kanit, sans-serif' }}
              >
                <Form.Item
                  label={<span style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>Email</span>}
                  name="email"
                  rules={[{ required: true, message: "Please input your email!" }]}
                >
                  <Input
                    style={{
                      fontSize: '16px',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #003366',
                      backgroundColor: '#f8f9fa',
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label={<span style={{ fontFamily: 'Kanit, sans-serif', fontSize: '16px' }}>Password</span>}
                  name="password"
                  rules={[{ required: true, message: "Please input your password!" }]}
                >
                  <Input.Password
                    style={{
                      fontSize: '16px',
                      padding: '12px',
                      borderRadius: '8px',
                      border: '1px solid #003366',
                      backgroundColor: '#f8f9fa',
                    }}
                  />
                </Form.Item>

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
                      fontFamily: 'Kanit, sans-serif',
                      borderRadius: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    Log in
                  </Button>
                  <Text style={{ fontFamily: 'Kanit, sans-serif', color: '#ffffff' }}>
                    Or{' '}
                    <a onClick={() => navigate("/signup")} style={{ color: '#FFD700' }}>
                      sign up now!
                    </a>
                  </Text>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default SignInPages;
