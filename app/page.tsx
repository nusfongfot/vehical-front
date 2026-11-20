"use client";
import dynamic from "next/dynamic";
import {
  useVehicles,
  useCreateVehicle,
  useDeleteVehicle,
  useUpdateVehicle,
} from "./hooks/useVehicles";
import {
  AlertColor,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import { type GridColDef } from "@mui/x-data-grid";
import FilledAlerts from "./components/Alerts/Alert";
import { useState } from "react";
import DialogForms from "./components/Dialog/Dialog";
import { CreateVehiclePayload, Vehicle } from "./types/vehicle.types";
import EditIcon from "@mui/icons-material/Edit";

const DataGrid = dynamic(
  () => import("@mui/x-data-grid").then((mod) => mod.DataGrid),
  {
    ssr: false,
    loading: () => <p>กำลังโหลดตาราง...</p>,
  },
);
const INITIAL_FORM: CreateVehiclePayload = {
  vehiclePlate: "",
  carBrand: "",
  model: "",
  energyType: "HYBRID",
  notes: "",
};

export default function HomePage() {
  const { data: vehicles, isLoading, isError, error } = useVehicles();
  const createVehicle = useCreateVehicle();
  const deleteVehicle = useDeleteVehicle();
  const updateVehicle = useUpdateVehicle();

  const [isOpenForm, setIsOpenForm] = useState<boolean>(false);
  const [alertState, setAlertState] = useState<{
    open: boolean;
    title: string;
    type: AlertColor;
  }>({
    open: false,
    title: "",
    type: "success",
  });
  const [formData, setFormData] = useState<CreateVehiclePayload>(INITIAL_FORM);
  const [editingId, setEditingId] = useState<string | null>(null);

  const showAlert = (title: string, type: AlertColor) => {
    setAlertState({ open: true, title, type });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      updateVehicle.mutate(
        { id: editingId, payload: formData },
        {
          onSuccess: () => {
            setIsOpenForm(false);
            showAlert("อัปเดตข้อมูลสำเร็จ!", "success");
          },
          onError: (err) => {
            showAlert(err.message, "error");
          },
        },
      );
    } else {
      createVehicle.mutate(formData, {
        onSuccess: () => {
          showAlert("เพิ่มข้อมูลสำเร็จ", "success");
          setIsOpenForm(false);
          setFormData(INITIAL_FORM);
        },
        onError: (err) => {
          showAlert(err.message, "error");
        },
      });
    }
  };

  const handleClickOpen = () => {
    setIsOpenForm(true);
    setEditingId(null);
    setFormData(INITIAL_FORM)    
  };

  const handleClose = () => {
    setIsOpenForm(false);
  };

  const handleDeleteRow = (id: string) => {
    deleteVehicle.mutate(id, {
      onSuccess: () => {
        showAlert("ลบข้อมูลสำเร็จ!", "success");
      },
      onError: (err) => {
        showAlert(err.message, "error");
      },
    });
  };

  const handleEditRow = (row: Vehicle) => {
    setIsOpenForm(true);
    setEditingId(row._id);
    setFormData({
      vehiclePlate: row.vehiclePlate,
      carBrand: row.carBrand,
      model: row.model,
      energyType: row.energyType,
      notes: row.notes || "",
    });
  };

  const columns: GridColDef[] = [
    { field: "vehiclePlate", headerName: "vehiclePlate", width: 200 },
    { field: "carBrand", headerName: "carBrand", width: 150 },
    { field: "model", headerName: "model", width: 150 },
    { field: "notes", headerName: "notes", width: 250 },
    { field: "energyType", headerName: "energyType", width: 150 },
    {
      field: "action",
      headerName: "action",
      width: 200,
      renderCell: (params) => {
        return (
          <Stack direction='row' spacing={2}>
            <Button
              color='error'
              variant='contained'
              onClick={() => handleDeleteRow(params.row._id)}
            >
              X
            </Button>{" "}
            <Button
              startIcon={<EditIcon />}
              color='info'
              variant='contained'
              onClick={() => handleEditRow(params.row)}
            >
              แก้ไข
            </Button>
          </Stack>
        );
      },
    },
  ];

  const rows = vehicles;

  return (
    <Container maxWidth='lg'>
      <Grid container spacing={2}>
        <Grid size={8}>
          <Typography variant='h4' color='initial' sx={{ mt: 2 }}>
            รายการยานพาหนะทั้งหมด
          </Typography>
        </Grid>
        <Grid size={4}>
          <Button variant='contained' sx={{ mt: 2 }} onClick={handleClickOpen}>
            +เพิ่มข้อมูลรถใหม่
          </Button>
        </Grid>
      </Grid>

      <DialogForms
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={isOpenForm}
        title={"บันทึกข้อมูลรถยนต์"}
        formData={formData}
        handleChange={handleChange}
        onsubmit={(e) => handleSubmit(e)}
      />
      <FilledAlerts
        open={alertState.open}
        title={alertState.title}
        type={alertState.type}
        onClose={() => setAlertState((prev) => ({ ...prev, open: false }))}
      />

      <DataGrid
        rows={rows}
        columns={columns}
        hideFooterPagination
        disableColumnMenu
        disableColumnSorting
        // checkboxSelection
        getRowId={(row) => row._id}
        sx={{ border: 0 }}
        hideFooterSelectedRowCount 
      />
    </Container>
  );
}
