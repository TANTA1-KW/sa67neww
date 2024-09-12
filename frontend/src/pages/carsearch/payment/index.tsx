import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Button, Typography, message } from "antd";
import { UpdateRentById, DeleteRentById } from "../../../services/https"; // Import from your service

const { Title, Text } = Typography;

const PaymentPage = () => {
    const { bookingId } = useParams<{ bookingId: string }>(); // Get bookingId from URL
    const location = useLocation();
    const navigate = useNavigate();
    const { price } = location.state as { price: number }; // Get price from state

    const handlePayment = async () => {
        try {
            await UpdateRentById(Number(bookingId), { status: 'paymented' });
            message.success("การชำระเงินสำเร็จ!");
            navigate("/rent");
        } catch (error) {
            console.error('Error updating rent status:', error);
            message.error("การชำระเงินล้มเหลว: " + error.message);
        }
    };
    
    const handleCancel = async () => {
        try {
            await DeleteRentById(Number(bookingId));
            message.success("การยกเลิกการจองสำเร็จ!");
            navigate("/rent");
        } catch (error) {
            console.error('Error deleting rent:', error);
            message.error("การยกเลิกการจองล้มเหลว: " + error.message);
        }
    };
    

    const phoneNumber = "0844102215";
    const amount = price ? price.toFixed(2) : "0.00";
    const qrCodeUrl = `https://promptpay.io/${phoneNumber}/${amount}`;

    return (
        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ maxWidth: '600px', width: '100%', textAlign: 'center' }}>
                <Title level={3} style={{ textAlign: 'center' }}>Payment for Booking</Title>
                <Text>Total Amount: {price ? `${price} THB` : "Price not available"}</Text><br />
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                    <img src={qrCodeUrl} alt="PromptPay QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <Button type="primary" onClick={handlePayment} style={{ marginRight: '10px' }}>
                        Process Payment
                    </Button>
                    <Button type="default" onClick={handleCancel}>
                        Cancel
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
