import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vehicleService } from "../services/vehicle.service";
import { CreateVehiclePayload } from "../types/vehicle.types";

export const VEHICLE_KEYS = {
  all: ["vehicles"] as const,
  detail: (id: string) => ["vehicles", id] as const,
};

export function useVehicles() {
  return useQuery({
    queryKey: VEHICLE_KEYS.all,
    queryFn: async () => {
      const res = await vehicleService.getAll();
      return res.data;
    },
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: VEHICLE_KEYS.detail(id),
    queryFn: async () => {
      const res = await vehicleService.getOne(id);
      return res.data;
    },
    enabled: Boolean(id),
  });
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: Partial<CreateVehiclePayload>;
    }) => vehicleService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: VEHICLE_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: VEHICLE_KEYS.detail(variables.id),
      });
    },
  });
}

export function useCreateVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateVehiclePayload) =>
      vehicleService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VEHICLE_KEYS.all });
    },
  });
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => vehicleService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: VEHICLE_KEYS.all });
    },
  });
}
