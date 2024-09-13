export interface RentInterface {
    status: any;
    ID?: number;
    Status?: string; // Make sure to use `?` for optional fields
    StartRent?: Date; // Use Date for date/time fields
    EndRent?: Date; // Use Date for date/time fields
    CarID?: number; // Use number for IDs
    UserID?: number; // Use number for IDs
}