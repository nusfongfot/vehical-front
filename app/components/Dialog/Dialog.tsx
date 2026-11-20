import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Box, MenuItem, Stack, TextField } from "@mui/material";
import {
  CreateVehiclePayload,
  ENERGY_TYPE_OPTIONS,
} from "@/app/types/vehicle.types";

interface CustomizedDialogs {
  open: boolean;
  title: string;
  formData: CreateVehiclePayload;
  handleClickOpen: () => void;
  handleClose: () => void;
  onsubmit: React.SubmitEventHandler<HTMLFormElement>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DialogForms({
  handleClose,
  open,
  onsubmit,
  title,
  formData,
  handleChange,
}: CustomizedDialogs) {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      open={open}
    >
      <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
        {title}
      </DialogTitle>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers className='w-[90vw] sm:w-[500px]'>
        <Box
          component='form'
          onSubmit={onsubmit}
          sx={{
            maxWidth: 500,
            p: 3,
            border: "1px solid #ddd",
            borderRadius: 2,
          }}
        >
          <Stack spacing={2}>
            <TextField
              label='ทะเบียนรถ'
              name='vehiclePlate'
              value={formData.vehiclePlate}
              onChange={handleChange}
              helperText="เช่น กข 1235 กรุงเทพมหานคร"
              required
              fullWidth
            />

            <TextField
              label='ยี่ห้อรถ'
              name='carBrand'
              value={formData.carBrand}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              label='รุ่น'
              name='model'
              value={formData.model}
              onChange={handleChange}
              required
              fullWidth
            />

            <TextField
              select
              label='ประเภทพลังงาน'
              name='energyType'
              value={formData.energyType}
              onChange={handleChange}
              fullWidth
            >
              {ENERGY_TYPE_OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label='หมายเหตุ'
              name='notes'
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
            />
          </Stack>

          <Stack sx={{ mt: 2 }}>
            <Button autoFocus variant='contained' type="submit">
              Save changes
            </Button>
          </Stack>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
