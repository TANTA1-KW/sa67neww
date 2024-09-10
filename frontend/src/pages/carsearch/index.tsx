import React, { useState, useEffect } from "react";
import { Button, Row, Col, Typography } from "antd";
import { useNavigate } from 'react-router-dom';
import { GetCars } from "../../services/https";
import { CarInterface } from "../../interfaces/ICar";

const { Title, Text } = Typography;

const styles = {
  fontFamily: 'Kanit, sans-serif',
  button: {
    width: '100%',
    height: '300px',
    borderRadius: '8px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '10px',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
};

function CarSearch() {
  const [cars, setCars] = useState<CarInterface[]>([]);
  const [imagesByType, setImagesByType] = useState<Record<string, string[]>>({
    'Eco car': [],
    'Van': [],
    'Motorcycle': []
  });
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<string, number>>({
    'Eco car': 0,
    'Van': 0,
    'Motorcycle': 0
  });
  const [intervals, setIntervals] = useState<Record<string, NodeJS.Timeout | null>>({
    'Eco car': null,
    'Van': null,
    'Motorcycle': null
  });
  const navigate = useNavigate();

  const getCars = async () => {
    try {
      const res = await GetCars();
      if (res.length > 0) {
        setCars(res);
        const groupedImages: Record<string, string[]> = {
          'Eco car': [],
          'Van': [],
          'Motorcycle': []
        };
        res.forEach((car: { type: string | number; picture: string; }) => {
          if (groupedImages[car.type]) {
            groupedImages[car.type].push(car.picture);
          }
        });
        setImagesByType(groupedImages);
      } else {
        setCars([]);
        setImagesByType({
          'Eco car': [],
          'Van': [],
          'Motorcycle': []
        });
      }
    } catch (error) {
      console.error("Failed to fetch car data", error);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  useEffect(() => {
    Object.keys(imagesByType).forEach(type => {
      if (imagesByType[type].length > 0) {
        const interval = setInterval(() => {
          setCurrentImageIndex(prevState => ({
            ...prevState,
            [type]: (prevState[type] + 1) % imagesByType[type].length
          }));
        }, 3000);

        // Clear existing interval before setting a new one
        if (intervals[type]) {
          clearInterval(intervals[type] as NodeJS.Timeout);
        }

        setIntervals(prevState => ({
          ...prevState,
          [type]: interval
        }));
      }
    });

    return () => {
      // Clean up all intervals on unmount
      Object.values(intervals).forEach(interval => {
        if (interval) {
          clearInterval(interval);
        }
      });
    };
  }, [imagesByType]);

  const handleTypeClick = (type: string) => {
    navigate(`/rent/type/${type}`);
  };

  return (
    <div style={{ fontFamily: styles.fontFamily, padding: '20px' }}>
      <Title level={1}>Car Search</Title>
      <Row gutter={16} style={{ marginBottom: '20px' }}>
        {['Eco car', 'Van', 'Motorcycle'].map(type => (
          <Col xs={24} sm={12} md={8} lg={8} xl={8} style={{ textAlign: 'center' }} key={type}>
            <Button
              style={{
                ...styles.button,
                backgroundImage: `url(${imagesByType[type][currentImageIndex[type]] || ''})`
              }}
              onClick={() => handleTypeClick(type)}
            >
              <Text>{type}</Text>
            </Button>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CarSearch;
