import { Col, Row, Card, Statistic, Table } from "antd";
import { CarOutlined, CalendarOutlined, TagOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";

interface DataType {
  key: string;
  carModel: string;
  dailyRate: number;
  available: boolean;
}

const columns: ColumnsType<DataType> = [
  {
    title: "รุ่นรถ",
    dataIndex: "carModel",
    key: "carModel",
  },
  {
    title: "อัตราค่าเช่าต่อวัน",
    dataIndex: "dailyRate",
    key: "dailyRate",
    render: (text: number) => `$${text.toFixed(2)}`,
  },
  {
    title: "สถานะ",
    dataIndex: "available",
    key: "available",
    render: (text: boolean) => (text ? "พร้อมให้เช่า" : "ไม่พร้อมให้เช่า"),
  },
];

const data: DataType[] = [
  {
    key: '1',
    carModel: 'Toyota Camry',
    dailyRate: 50,
    available: true,
  },
  {
    key: '2',
    carModel: 'Honda Civic',
    dailyRate: 45,
    available: false,
  },
  {
    key: '3',
    carModel: 'Ford Focus',
    dailyRate: 55,
    available: true,
  },
  {
    key: '4',
    carModel: 'Chevrolet Malibu',
    dailyRate: 60,
    available: true,
  },
];

export default function HomePage() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center" style={{ padding: '20px' }}>
        <Col span={24} style={{ textAlign: 'center' }}>
          <h1 style={{ marginBottom: '20px' }}>Welcome to TWN Rent Car</h1>
          <p>Find the perfect car for your next adventure</p>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={18}>
          <Card bordered={false} style={{ backgroundColor: "#F5F5F5", marginBottom: '20px' }}>
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card
                  bordered={false}
                  style={{
                    textAlign: 'center',
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    marginBottom: '16px',
                  }}
                >
                  <Statistic
                    title="รถยนต์ทั้งหมด"
                    value={250}
                    prefix={<CarOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Card
                  bordered={false}
                  style={{
                    textAlign: 'center',
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    marginBottom: '16px',
                  }}
                >
                  <Statistic
                    title="โปรโมชันปัจจุบัน"
                    value={5}
                    prefix={<TagOutlined />}
                  />
                </Card>
              </Col>

              <Col xs={24} sm={12} md={8}>
                <Card
                  bordered={false}
                  style={{
                    textAlign: 'center',
                    boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                    marginBottom: '16px',
                  }}
                >
                  <Statistic
                    title="การจองวันนี้"
                    value={15}
                    prefix={<CalendarOutlined />}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24} xl={18}>
          <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>รถยนต์ที่พร้อมให้เช่า</h3>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 5 }}
            style={{ margin: '0 auto' }}
          />
        </Col>
      </Row>
    </>
  );
}
