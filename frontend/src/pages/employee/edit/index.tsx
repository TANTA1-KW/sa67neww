import { useEffect, useState } from "react";
import {
  Space,
  Button,
  Col,
  Row,
  Divider,
  Form,
  Input,
  Card,
  message,
  Typography,
  DatePicker,
  InputNumber,
  Select,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { UsersInterface } from "../../../interfaces/IUser";
import { GetUsersById, UpdateUsersById } from "../../../services/https/index";
import { useNavigate, Link, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { RcFile } from "antd/es/upload/interface";

const { Title } = Typography;
const { Option } = Select;

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [image, setImage] = useState<string | undefined>();

  const getUserById = async (id: string) => {
    try {
      const res = await GetUsersById(id);
      if (res.ID) {
        form.setFieldsValue({
          roles: res.roles,
          first_name: res.first_name,
          last_name: res.last_name,
          email: res.email,
          birthday: dayjs(res.birthday),
          age: res.age,
          gender_id: res.gender?.ID,
          address: res.address,
          phone: res.phone,
          picture: res.picture, // Add picture field if needed
        });
        setImage(res.picture); // Set the image if available
      } else {
        messageApi.open({
          type: "error",
          content: "ไม่พบข้อมูลผู้ใช้",
        });
        setTimeout(() => {
          navigate("/employee");
        }, 2000);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการดึงข้อมูล",
      });
    }
  };

  const onFinish = async (values: UsersInterface) => {
    let payload = {
      ...values,
      price: parseFloat(values.price || "0"), // Example for price
      picture: image, // Use the base64 image if available
    };

    try {
      const res = await UpdateUsersById(id, payload);
      if (res.status === 200) {
        messageApi.open({
          type: "success",
          content: "บันทึกข้อมูลสำเร็จ",
        });
        setTimeout(() => {
          navigate("/employee");
        }, 2000);
      } else {
        messageApi.open({
          type: "error",
          content: `เกิดข้อผิดพลาดในการบันทึกข้อมูล: ${res.error}`, // More detailed error message
        });
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการบันทึกข้อมูล",
      });
    }
  };

  useEffect(() => {
    if (id) {
      getUserById(id);
    }
  }, [id]);

  const handleImageUpload = (file: RcFile) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    return false; // Prevent the default upload behavior
  };

  return (
    <div
      style={{
        fontFamily: "Kanit, sans-serif",
        padding: "20px",
        width: "80%",
        margin: "0 auto", // Center the component
      }}
    >
      {contextHolder}
      <Card>
        <Title level={2} style={{ fontSize: "24px", color: "#003366", fontFamily: "Kanit, sans-serif" }}>
          แก้ไขข้อมูลผู้ดูแลระบบ
        </Title>
        <Divider />
        <Row justify="center">
          <Col>
            {image && (
              <div
                style={{
                  width: "300px",
                  height: "200px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #003366",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={image}
                  alt="User"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}
          </Col>
        </Row>
        <Form name="basic" form={form} layout="vertical" onFinish={onFinish} autoComplete="off">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>ชื่อจริง</span>}
                name="first_name"
                rules={[{ required: true, message: "กรุณากรอกชื่อ!" }]}
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>นามสกุล</span>}
                name="last_name"
                rules={[{ required: true, message: "กรุณากรอกนามสกุล!" }]}
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
            <Form.Item
  label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>ตำแหน่ง</span>}
  name="roles"
  rules={[{ required: true, message: "กรุณากรอกตำแหน่ง!" }]}
>
  <Select
    style={{ width: "100%", fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }}
  >
    <Option value={0}>Admin</Option>
    <Option value={2}>Employee</Option>
  </Select>
</Form.Item>

            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>อายุ</span>}
                name="age"
                rules={[{ required: true, message: "กรุณากรอกอายุ!" }]}
              >
                <InputNumber
                  min={0}
                  max={99}
                  style={{ width: "100%", fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>วัน/เดือน/ปี เกิด</span>}
                name="birthday"
                rules={[{ required: true, message: "กรุณาเลือกวัน/เดือน/ปี เกิด!" }]}
              >
                <DatePicker style={{ width: "100%", fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>เพศ</span>}
                name="gender_id"
                rules={[{ required: true, message: "กรุณาเลือกเพศ!" }]}
              >
                <Select
                  style={{ width: "100%", fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }}
                >
                  <Option value="1">Male</Option>
                  <Option value="2">Female</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>อีเมล</span>}
                name="email"
                rules={[
                  { type: "email", message: "กรุณากรอกอีเมลที่ถูกต้อง!" },
                  { required: true, message: "กรุณากรอกอีเมล!" }
                ]}
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>เบอร์โทรศัพท์</span>}
                name="phone"
                rules={[{ required: true, message: "กรุณากรอกเบอร์โทรศัพท์!" }]}
              >
                <Input style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} />
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Form.Item
                label={<span style={{ fontSize: '16px', color: '#003366', fontFamily: 'Kanit, sans-serif' }}>ที่อยู่</span>}
                name="address"
              >
                <Input.TextArea style={{ fontSize: '16px', borderRadius: '8px', border: '1px solid #003366' }} />
              </Form.Item>
            </Col>

          </Row>
          <Row justify="end">
            <Col style={{ marginTop: "40px" }}>
              <Form.Item>
                <Space>
                  <Link to="/employee">
                    <Button
                      htmlType="button"
                      style={{
                        marginRight: "10px",
                        fontSize: "16px",
                        backgroundColor: "#FFD700",
                        borderColor: "#FFD700",
                        color: "#003366",
                        borderRadius: "8px",
                      }}
                    >
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="primary"
                    htmlType="submit"
                    icon={<PlusOutlined />}
                    style={{
                      fontSize: "16px",
                      borderRadius: "8px",
                      backgroundColor: "#003366",
                      borderColor: "#003366",
                    }}
                  >
                    Save
                  </Button>
                </Space>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}

export default EditEmployee;
