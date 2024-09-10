import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetCars } from "../../../services/https";
import { CarInterface } from "../../../interfaces/ICar";
import { Card, Row, Col, Typography, message, Select } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const provinces = [
  "ภูเก็ท", "นครสวรรค์", "นครราชสีมา",
  // เพิ่มชื่อจังหวัดอื่น ๆ ตามต้องการ
];

const CarType = () => {
  const { type } = useParams<{ type: string }>(); // รับค่า type จาก URL
  const [cars, setCars] = useState<CarInterface[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(undefined);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

  const getCarsByType = async () => {
    try {
      const res = await GetCars(); // เรียก API เพื่อดึงข้อมูลรถยนต์
      if (res.length > 0) {
        // กรองข้อมูลตาม type ที่ส่งผ่าน URL, จังหวัดที่เลือก, และสถานะที่พร้อมใช้งาน
        const filteredCars = res.filter(car => 
          car.type === type &&
          (!selectedProvince || car.province === selectedProvince) &&
          car.status === 'พร้อมใช้งาน' // กรองเฉพาะรถที่พร้อมใช้งาน
        );
        setCars(filteredCars);

        if (filteredCars.length === 0) {
          messageApi.info(`ตอนนี้ไม่มีรถว่าง`); // แสดงข้อความเมื่อไม่พบข้อมูล
        }
      } else {
        setCars([]);
        messageApi.info("No cars available");
      }
    } catch (error) {
      messageApi.error("Failed to fetch car data");
    }
  };

  useEffect(() => {
    if (type) {
      getCarsByType(); // เรียก getCarsByType เมื่อ type มีค่า
    }
  }, [type, selectedProvince]); // เรียกใหม่เมื่อ province หรือ type เปลี่ยน

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value); // เก็บค่าจังหวัดที่เลือก
  };

  const handleCardClick = (car: CarInterface) => {
    // นำทางไปยังหน้าเลือกเวลาเพื่อทำการจองรถ
    navigate(`/rent/booking/${car.ID}`);
  };

  return (
    <div style={{ padding: '20px' }}>
      {contextHolder}
      <Title level={2}>{type} Cars</Title>

      {/* Select Dropdown สำหรับเลือกจังหวัด */}
      <Select
        placeholder="เลือกจังหวัด"
        style={{ width: '100%', marginBottom: '20px' }}
        onChange={handleProvinceChange}
        allowClear
      >
        {provinces.map(province => (
          <Option key={province} value={province}>
            {province}
          </Option>
        ))}
      </Select>

      <Row gutter={16}>
        {cars.map(car => (
          <Col xs={24} sm={12} md={8} lg={6} key={car.ID}>
            <Card
              cover={<img src={car.picture} alt={car.license_plate} />}
              onClick={() => handleCardClick(car)} // เมื่อคลิกที่การ์ด
              style={{ cursor: 'pointer' }} // เปลี่ยนเคอร์เซอร์เมื่อ hover บนการ์ด
            >
              <Card.Meta
                title={<Text>{car.license_plate}</Text>} // แสดงเลขทะเบียนรถ
                description={
                  <>
                    <Text>Brand: {car.brands}</Text><br /> {/* แก้จาก Brands เป็น brand */}
                    <Text>Model Year: {car.model_year}</Text><br /> {/* แก้จาก model_year เป็น modelYear */}
                    <Text>Province: {car.province}</Text> {/* แสดงจังหวัด */}
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CarType;
