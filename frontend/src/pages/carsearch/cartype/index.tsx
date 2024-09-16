import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetCars } from "../../../services/https";
import { CarInterface } from "../../../interfaces/ICar";
import { Card, Row, Col, Typography, message, Select } from "antd";

const { Title, Text } = Typography;
const { Option } = Select;

const provinces = [
  "ภูเก็ต", "นครสวรรค์", "นครราชสีมา",
  // เพิ่มชื่อจังหวัดอื่น ๆ ตามต้องการ
];

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #003366',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Kanit, sans-serif', // Apply Kanit font to container
  },
  title: {
    fontSize: '36px',
    fontFamily: 'Kanit, sans-serif', // Apply Kanit font to title
    marginBottom: '20px',
  },
  select: {
    width: '100%',
    marginBottom: '20px',
    fontFamily: 'Kanit, sans-serif', // Apply Kanit font to select
  },
  card: {
    cursor: 'pointer',
    height: '100%',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Kanit, sans-serif', // Apply Kanit font to card
  },
  cardImage: {
    height: '180px',
    objectFit: 'cover',
  },
  cardDescription: {
    fontSize: '14px',
    fontFamily: 'Kanit, sans-serif', // Apply Kanit font to card description
  },
  cardMeta: {
    fontFamily: 'Kanit, sans-serif', // Apply Kanit font to card meta
  },
};

const CarType = () => {
  const { type } = useParams<{ type: string }>(); // รับค่า type จาก URL
  const [cars, setCars] = useState<CarInterface[]>([]);
  const [filteredCars, setFilteredCars] = useState<CarInterface[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string | undefined>(undefined);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับการนำทาง

  const getCarsByType = async () => {
    try {
      const res = await GetCars(); // เรียก API เพื่อดึงข้อมูลรถยนต์
      if (res.length > 0) {
        // กรองข้อมูลตาม type ที่ส่งผ่าน URL และสถานะที่พร้อมใช้งาน
        const allCars = res.filter(car => 
          car.type === type &&
          car.status === 'พร้อมใช้งาน' // กรองเฉพาะรถที่พร้อมใช้งาน
        );
        setCars(allCars);
        setFilteredCars(allCars);

        if (allCars.length === 0) {
          messageApi.info(`ตอนนี้ไม่มีรถว่าง`); // แสดงข้อความเมื่อไม่พบข้อมูล
        }
      } else {
        setCars([]);
        setFilteredCars([]);
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
  }, [type]); // เรียกใหม่เมื่อ type เปลี่ยน

  useEffect(() => {
    // กรองข้อมูลตามจังหวัดที่เลือก
    if (selectedProvince) {
      setFilteredCars(cars.filter(car => car.province === selectedProvince));
    } else {
      setFilteredCars(cars);
    }
  }, [selectedProvince, cars]); // เรียกใหม่เมื่อ selectedProvince หรือ cars เปลี่ยน

  const handleProvinceChange = (value: string) => {
    setSelectedProvince(value); // เก็บค่าจังหวัดที่เลือก
  };

  const handleCardClick = (car: CarInterface) => {
    // นำทางไปยังหน้าเลือกเวลาเพื่อทำการจองรถ
    navigate(`/rent/booking/${car.ID}`);
  };

  return (
    <div style={styles.container}>
      {contextHolder}
      <Title level={2} style={styles.title}>{type}</Title>

      {/* Select Dropdown สำหรับเลือกจังหวัด */}
      <Select
        placeholder="เลือกจังหวัด"
        style={styles.select}
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
        {filteredCars.map(car => (
          <Col xs={24} sm={12} md={8} lg={6} key={car.ID}>
            <Card
              cover={<img src={car.picture} alt={car.license_plate} style={styles.cardImage} />}
              onClick={() => handleCardClick(car)} // เมื่อคลิกที่การ์ด
              style={styles.card}
            >
              <Card.Meta
                title={<Text style={styles.cardMeta}>{car.license_plate}</Text>} // แสดงเลขทะเบียนรถ
                description={
                  <div style={styles.cardDescription}>
                    <Text style={styles.cardMeta}>Brand: {car.brands}</Text><br />
                    <Text style={styles.cardMeta}>Model Year: {car.model_year}</Text><br />
                    <Text style={styles.cardMeta}>Province: {car.province}</Text> {/* แสดงจังหวัด */}
                  </div>
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
