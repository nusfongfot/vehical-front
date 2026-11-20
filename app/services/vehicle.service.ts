import { api } from "./axios";
import { CreateVehiclePayload } from "../types/vehicle.types";

export const vehicleService = {
  getAll: () => api.get("/vehicles"),

  getOne: (id: string) => api.get(`/vehicles/${id}`),

  create: (payload: CreateVehiclePayload) => api.post("/vehicles", payload),

  update: (id: string, payload: Partial<CreateVehiclePayload>) =>
    api.patch(`/vehicles/${id}`, payload),

  remove: (id: string) => api.delete(`/vehicles/${id}`),
};
