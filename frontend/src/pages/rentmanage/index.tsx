import React, { useState, useEffect } from 'react';
import { Button, Table, Typography, message, Modal, Form, Input, DatePicker, Space, Select } from 'antd';
import { GetRents, UpdateRentById, DeleteRentById } from '../../services/https';
import { RentInterface } from '../../interfaces/IRent';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Option } = Select;

const ManageRentPage = () => {
    const [rents, setRents] = useState<RentInterface[]>([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [currentRent, setCurrentRent] = useState<RentInterface | null>(null);
    const [form] = Form.useForm();
    const [searchUserID, setSearchUserID] = useState<string>('');
    const [searchStatus, setSearchStatus] = useState<string | undefined>(undefined);

    useEffect(() => {
        fetchRents();
    }, [searchUserID, searchStatus]);

    const fetchRents = async () => {
        try {
            const response = await GetRents();
            const filteredRents = response.filter(rent =>
                (searchUserID ? rent.user_id.toString().includes(searchUserID) : true) &&
                (searchStatus ? rent.Status === searchStatus : true)
            );
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
            status: rent.Status, // Change "Status" to "status" for consistency
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
                start_rent: values.start_rent.format('YYYY-MM-DD'), // Format date to match backend
                end_rent: values.end_rent.format('YYYY-MM-DD'), // Format date to match backend
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

    const columns = [
        {
            title: 'User ID',
            dataIndex: 'user_id',
            key: 'user_id',
        },
        {
            title: 'Car ID',
            dataIndex: 'car_id',
            key: 'car_id',
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
            dataIndex: 'Status', // Ensure this matches the data field
            key: 'status',
        },
        {
            title: '',
            key: 'actions',
            render: (_: any, record: RentInterface) => (
                <div style={{ textAlign: 'right' }}>
                    <Space size="middle">
                        <Button onClick={() => handleEdit(record)}>
                            Edit
                        </Button>
                        <Button danger onClick={() => handleDelete(record.ID)}>
                            Delete
                        </Button>
                    </Space>
                </div>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>Manage Rent Records</Title>
            
            {/* Search Filters */}
            <div style={{ marginBottom: '20px' }}>
                <Input
                    placeholder="Search by User ID"
                    value={searchUserID}
                    onChange={(e) => setSearchUserID(e.target.value)}
                    style={{ marginRight: '10px', width: '200px' }}
                />
                <Select
                    placeholder="Select status"
                    value={searchStatus}
                    onChange={(value) => setSearchStatus(value)}
                    style={{ width: '200px' }}
                >
                    <Option value="">All</Option>
                    <Option value="Pending Payment">Pending Payment</Option>
                    <Option value="paymented">paymented</Option>
                </Select>
            </div>

            <Table dataSource={rents} columns={columns} rowKey="id" />

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
                            <Option value="paymented">paymented</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default ManageRentPage;
