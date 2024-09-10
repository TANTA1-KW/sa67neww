    import React, { useState, useEffect } from "react";
    import { useParams, useNavigate } from "react-router-dom";
    import { GetCarById, CreateRent } from "../../../services/https";
    import { CarInterface } from "../../../interfaces/ICar";
    import { DatePicker, Button, Typography, message } from "antd";
    import { RentInterface } from "../../../interfaces/IRent";

    const { Title, Text } = Typography;

    const BookingPage = () => {
    const { carId } = useParams<{ carId: string }>(); // Get carId from URL
    const navigate = useNavigate();
    const [car, setCar] = useState<CarInterface | null>(null);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [userID, setUserID] = useState<number | null>(null); // State for userID
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

    const handleBooking = async () => {
        if (startDate && endDate && car && userID) {
        try {
            const data: RentInterface = {
            start_rent: startDate.toISOString(),
            end_rent: endDate.toISOString(),
            car_id: car.ID, // Use the car's ID from the fetched data
            user_id: userID, // Use the userID from the state
            status: 'Pending Payment', // Set status to "Pending Payment"
            };
            console.log('Booking Data:', data); // Debugging
            await CreateRent(data);
            messageApi.success("Booking successfully created!");
            navigate("/rent"); // Navigate to car selection page
        } catch (error) {
            console.error('Error creating booking:', error); // Debugging
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
            <Text>Car ID: {car.ID}</Text><br /> {/* Display carID */}
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
