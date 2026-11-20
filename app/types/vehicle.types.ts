export interface Vehicle {
  _id: string;
  vehiclePlate: string;
  carBrand: string;
  model: string;
  notes?: string;
  energyType: "GASOLINE" | "DIESEL" | "HYBRID" | "EV";
  createdAt: string;
  updatedAt: string;
}

export type CreateVehiclePayload = Omit<
  Vehicle,
  "_id" | "createdAt" | "updatedAt"
>;

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export const ENERGY_TYPE_OPTIONS: {
  value: CreateVehiclePayload["energyType"];
  label: string;
}[] = [
  { value: "GASOLINE", label: "เบนซิน" },
  { value: "DIESEL", label: "ดีเซล" },
  { value: "HYBRID", label: "ไฮบริด" },
  { value: "EV", label: "ไฟฟ้าล้วน" },
];
