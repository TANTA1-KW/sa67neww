import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button, Typography, message } from "antd";

const { Title, Text } = Typography;

const PaymentPage = () => {
    const { bookingId } = useParams<{ bookingId: string }>(); // Get bookingId from URL
    const location = useLocation();
    const navigate = useNavigate();
    const { price, car } = location.state as { price: number, car: any }; // Get price and car from state

    const handlePayment = () => {
        // Implement payment logic here

        message.success("Payment successful!");
        navigate("/rent"); // Navigate back to car selection or confirmation page
    };

    return (
        <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ maxWidth: '600px', width: '100%' }}>
                <Title level={3} style={{ textAlign: 'center' }}>Payment</Title>
                <Text>Total Amount: {price ? `${price} THB` : "Price not available"}</Text><br />
                
                {/* Display car details */}
                {car && (
                    <div>
                        <Text>Car License Plate: {car.license_plate}</Text><br />
                        <Text>Brand: {car.brands}</Text><br />
                        <Text>Model Year: {car.model_year}</Text><br />
                        <Text>Province: {car.province}</Text><br />
                        <Text>Status: {car.status}</Text><br />
                        <Text>Price per day: {car.price} THB</Text><br />
                        <img src={car.picture} alt={car.license_plate} style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
                    </div>
                )}

                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type="primary" onClick={handlePayment} style={{ marginRight: '10px' }}>
                        Proceed to Payment
                    </Button>
                    <Button type="default" onClick={() => navigate("/rent")}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
