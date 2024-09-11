import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetCarById, CreateRent } from "../../../services/https";
import { CarInterface } from "../../../interfaces/ICar";
import { DatePicker, Button, Typography, message } from "antd";
import { RentInterface } from "../../../interfaces/IRent";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const BookingPage = () => {
    const { carId } = useParams<{ carId: string }>(); // Get carId from URL
    const navigate = useNavigate();
    const [car, setCar] = useState<CarInterface | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [userID, setUserID] = useState<number | null>(null); // State for userID
    const [rentID, setRentID] = useState<number | null>(null); // State for rentID
    const [messageApi, contextHolder] = message.useMessage();

    // Fetch car details
    const fetchCarDetails = async () => {
        try {
            const res = await GetCarById(carId); // Fetch car details
            setCar(res);
            // Extract userID from localStorage
            const storedUserID = localStorage.getItem("id");
            setUserID(storedUserID ? parseInt(storedUserID, 10) : null);
        } catch (error) {
            messageApi.error("Failed to fetch car details");
        }
    };

    useEffect(() => {
        if (carId) {
            fetchCarDetails(); // Fetch car details when carId is available
        }
    }, [carId]);

    const calculatePrice = (): number => {
        if (startDate && endDate && car) {
            // Calculate the difference in days between start and end date
            const diffInDays = dayjs(endDate).diff(dayjs(startDate), 'day');
            // Calculate the total price
            const totalPrice = diffInDays * car.price; // Assuming 'car.price' is the price per day
            return totalPrice;
        }
        return 0;
    };

    const handleBooking = async () => {
        if (startDate && endDate && car && userID) {
            const price = calculatePrice();
            if (price <= 0) {
                messageApi.error("Please ensure that the end date is after the start date");
                return;
            }
    
            try {
                const data: RentInterface = {
                    start_rent: startDate.toISOString(),
                    end_rent: endDate.toISOString(),
                    price: price,
                    car_id: car.ID,
                    user_id: userID,
                    status: 'Pending Payment',
                };
    
                const response = await CreateRent(data);
    
                // ตรวจสอบข้อมูลที่ตอบกลับ
                if (response && response.rent_id) { // ตรวจสอบว่ามี rent_id ในการตอบกลับ
                    messageApi.success("Booking successfully created!");
                    // นำค่า rent_id ที่ได้มาใช้ในการทำงานต่อ
                    navigate(`/rent/payment/${response.rent_id}`, { state: { price: price, car: car } });
                } else {
                    messageApi.error("Failed to create booking. Response does not contain rent_id.");
                }
            } catch (error) {
                console.error('Error creating booking:', error);
                const errorMessage = error instanceof Error ? error.message : "Failed to create booking";
                messageApi.error(`Failed to create booking: ${errorMessage}`);
            }
        } else {
            messageApi.error("Please select start and end dates, and ensure all data is available");
        }
    };
    
    const handleCancel = () => {
        navigate("/rent"); // Navigate to car selection page
    };

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            {contextHolder}
            {car ? (
                <div style={{ maxWidth: '600px', width: '100%' }}>
                    <Title level={3} style={{ textAlign: 'center' }}>{car.license_plate}</Title>
                    <Text>Brand: {car.brands}</Text><br />
                    <Text>Model Year: {car.model_year}</Text><br />
                    <Text>Province: {car.province}</Text><br />
                    <Text>Status: {car.status}</Text><br />
                    <Text>Car ID: {car.ID}</Text><br />
                    <img src={car.picture} alt={car.license_plate} style={{ width: '100%', height: 'auto', marginBottom: '20px' }} />

                    <div style={{ marginBottom: '20px' }}>
                        <DatePicker
                            onChange={(date) => setStartDate(date ? date.toDate() : null)}
                            placeholder="Select Start Date"
                            style={{ marginRight: '10px' }}
                        />
                        <DatePicker
                            onChange={(date) => setEndDate(date ? date.toDate() : null)}
                            placeholder="Select End Date"
                        />
                    </div>

                    <div style={{ textAlign: 'center' }}>
                        <Button
                            type="primary"
                            onClick={handleBooking}
                            style={{ marginRight: '10px' }}
                        >
                            Confirm Booking
                        </Button>
                        <Button
                            type="default"
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            ) : (
                <Text>Loading...</Text>
            )}
        </div>
    );
};

export default BookingPage;
