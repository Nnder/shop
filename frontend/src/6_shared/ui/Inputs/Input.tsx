"use client"
import { FilledInput, FormControl, FormControlProps, IconButton, InputAdornment, InputLabel} from "@mui/material";
import { IInput } from "./types.Input";

export default function Input({sx, icon, label = "", ...props}: IInput) {
  return (
        <FormControl variant="filled" {...props as FormControlProps}>
            <InputLabel htmlFor="mail">{label}</InputLabel>
            <FilledInput sx={{...sx}}
            id="mail"
            type='text'
            endAdornment={
            <InputAdornment position="end">
                <IconButton
                aria-label="icon"
                edge="end"
                >
                {icon}
                </IconButton>
            </InputAdornment>
            }
            />
        </FormControl> 
  );
}

