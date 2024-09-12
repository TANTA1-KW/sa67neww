export interface CarInterface {
  price: number;
  license_plate: ReactNode;
  brands: ReactNode;
  model_year: ReactNode;
  province: ReactNode;
  status: ReactNode;
  picture: string | undefined;
  ID?: number;
  LicensePlate?: string;
  Province?: string;
  Brands?: string;
  Models?: string;
  ModelYear?: string;
  Color?: string;
  VIN?: string;
  VRN?: string;
  Status?: string;
  Type?: string;
  Picture?: string;
}
