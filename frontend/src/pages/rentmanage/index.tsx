import React, { useState, useEffect } from 'react';
import { Button, Table, Typography, message, Modal, Form, Input, DatePicker, Space, Select } from 'antd';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { GetRents, UpdateRentById, DeleteRentById, GetUsers, GetCars } from '../../services/https';
import { RentInterface } from '../../interfaces/IRent';
import { UserInterface } from '../../interfaces/IUser';
import { CarInterface } from '../../interfaces/ICar';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    border: '2px solid #003366',  // Blue border
    borderRadius: '8px',          // Rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Elevated shadow
  },
  headerTitle: {
    fontSize: '36px',
    fontFamily: 'Kanit, sans-serif',
  },
  addButton: {
    fontSize: '16px',
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
    fontFamily: 'Kanit, sans-serif',
  },
  searchInput: {
    fontSize: '16px',
    width: '100%',
    marginBottom: '16px',
    fontFamily: 'Kanit, sans-serif',
  },
  filterSelect: {
    width: '100%',
    marginBottom: '16px',
    fontFamily: 'Kanit, sans-serif',
  },
  table: {
    marginTop: '20px',
  },
  editButton: {
    backgroundColor: '#003366',
    color: '#fff',
    border: 'none',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    border: 'none',
    color: '#ffffff',
  },
};

const ManageRentPage = () => {
    const [rents, setRents] = useState<RentInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [cars, setCars] = useState<CarInterface[]>([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentRent, setCurrentRent] = useState<RentInterface | null>(null);
    const [form] = Form.useForm();
    const [searchName, setSearchName] = useState<string>('');
    const [searchLicensePlateProvince, setSearchLicensePlateProvince] = useState<string>('');
    const [searchStatus, setSearchStatus] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchUsers();
        fetchCars();
        fetchRents();
    }, [searchName, searchLicensePlateProvince, searchStatus]);

    const fetchUsers = async () => {
        try {
            const response = await GetUsers();
            setUsers(response);
        } catch (error) {
            message.error('Failed to fetch user data');
        }
    };

    const fetchCars = async () => {
        try {
            const response = await GetCars();
            setCars(response);
        } catch (error) {
            message.error('Failed to fetch car data');
        }
    };

    const fetchRents = async () => {
        try {
            const response = await GetRents();
            const [searchFirstName, searchLastName] = searchName.split(' ');

            const filteredRents = response.filter(rent => {
                const user = users.find(u => u.ID === rent.user_id);
                const car = cars.find(c => c.ID === rent.car_id);
                const userFirstName = user ? user.first_name : '';
                const userLastName = user ? user.last_name : '';
                const carLicensePlate = car ? car.license_plate : '';
                const carProvince = car ? car.province : '';
                const [searchLicensePlate, searchProvince] = searchLicensePlateProvince.split(',');

                return (
                    (searchFirstName ? userFirstName.toLowerCase().includes(searchFirstName.toLowerCase()) : true) &&
                    (searchLastName ? userLastName.toLowerCase().includes(searchLastName.toLowerCase()) : true) &&
                    (searchLicensePlate ? carLicensePlate.toLowerCase().includes(searchLicensePlate.trim().toLowerCase()) : true) &&
                    (searchProvince ? carProvince.toLowerCase().includes(searchProvince.trim().toLowerCase()) : true) &&
                    (searchStatus ? rent.Status === searchStatus : true)
                );
            });
            setRents(filteredRents);
        } catch (error) {
            message.error('Failed to fetch rent data');
        }
    };

    const handleEdit = (rent: RentInterface) => {
        setCurrentRent(rent);
        form.setFieldsValue({
            carID: rent.car_id,
            userID: rent.user_id,
            start_rent: dayjs(rent.start_rent),
            end_rent: dayjs(rent.end_rent),
            price: rent.price,
            status: rent.Status,
        });
        setIsEditModalVisible(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await DeleteRentById(id);
            message.success('Rent record deleted successfully');
            fetchRents();
        } catch (error) {
            message.error('Failed to delete rent record');
        }
    };

    const handleEditSubmit = async (values: any) => {
        if (currentRent) {
            const updatedRent = {
                car_id: values.carID,
                user_id: values.userID,
                start_rent: values.start_rent.format('YYYY-MM-DD'),
                end_rent: values.end_rent.format('YYYY-MM-DD'),
                price: values.price,
                status: values.status,
            };

            try {
                await UpdateRentById(currentRent.ID, updatedRent);
                message.success('Rent record updated successfully');
                fetchRents();
                setIsEditModalVisible(false);
            } catch (error) {
                message.error('Failed to update rent record');
            }
        }
    };

    const getUserName = (userID: number) => {
        const user = users.find(u => u.ID === userID);
        return user ? `${user.first_name} ${user.last_name}` : 'Unknown';
    };

    const getCarDetails = (carID: number) => {
        const car = cars.find(c => c.ID === carID);
        return car ? `${car.license_plate}, ${car.province}` : 'Unknown';
    };

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'user_id',
            key: 'user_id',
            render: (userID: number) => getUserName(userID),
        },
        {
            title: 'Car Details',
            dataIndex: 'car_id',
            key: 'car_id',
            render: (carID: number) => getCarDetails(carID),
        },
        {
            title: 'Start Date',
            dataIndex: 'start_rent',
            key: 'start_rent',
            render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
        },
        {
            title: 'End Date',
            dataIndex: 'end_rent',
            key: 'end_rent',
            render: (text: string) => dayjs(text).format('YYYY-MM-DD'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Status',
            dataIndex: 'Status',
            key: 'status',
        },
        {
            title: '',
            key: 'actions',
            render: (_: any, record: RentInterface) => (
                <div style={{ textAlign: 'right' }}>
                    <Space size="middle">
                        <Button
                            onClick={() => handleEdit(record)}
                            style={styles.editButton}
                            icon={<EditOutlined />}
                        >
                            Edit
                        </Button>
                        <Button
                            danger
                            onClick={() => handleDelete(record.ID)}
                            style={styles.deleteButton}
                            icon={<DeleteOutlined />}
                        >
                            Delete
                        </Button>
                    </Space>
                </div>
            ),
        },
    ];

    return (
        <div style={styles.container}>
            <Title level={1} style={styles.headerTitle}>Manage Rent Records</Title>
            
            {/* Search Filters */}
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Search by First Name Last Name (e.g., John Doe)"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={styles.searchInput}
                    suffix={<SearchOutlined />}
                />
                <Input
                    placeholder="Search by License Plate, Province (e.g., ABC123, Bangkok)"
                    value={searchLicensePlateProvince}
                    onChange={(e) => setSearchLicensePlateProvince(e.target.value)}
                    style={styles.searchInput}
                    suffix={<SearchOutlined />}
                />
                <Select
                    placeholder="Select status"
                    value={searchStatus}
                    onChange={(value) => setSearchStatus(value)}
                    style={styles.filterSelect}
                >
                    <Option value="">All</Option>
                    <Option value="Pending Payment">Pending Payment</Option>
                    <Option value="paymented">Paymented</Option>
                </Select>
            </div>

            <Table
                dataSource={rents}
                columns={columns}
                rowKey="ID"
                style={styles.table}
            />

            <Modal
                title="Edit Rent Record"
                visible={isEditModalVisible}
                onCancel={() => setIsEditModalVisible(false)}
                footer={null}
            >
                <Form form={form} onFinish={handleEditSubmit} layout="vertical">
                    <Form.Item
                        name="carID"
                        label="Car ID"
                        rules={[{ required: true, message: 'Please input the car ID' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="userID"
                        label="User ID"
                        rules={[{ required: true, message: 'Please input the user ID' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="start_rent"
                        label="Start Rent Date"
                        rules={[{ required: true, message: 'Please select the start rent date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="end_rent"
                        label="End Rent Date"
                        rules={[{ required: true, message: 'Please select the end rent date' }]}
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price"
                        rules={[{ required: true, message: 'Please input the price' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select the status' }]}
                    >
                        <Select>
                            <Option value="Pending Payment">Pending Payment</Option>
                            <Option value="paymented">Paymented</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={styles.addButton}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageRentPage;
