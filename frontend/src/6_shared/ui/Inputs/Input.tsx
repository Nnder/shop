"use client"
import { FilledInput, FormControl, FormControlProps, IconButton, InputAdornment, InputLabel} from "@mui/material";
import { IInput } from "./types.Input";
import { ChangeEvent } from "react";

export default function Input({sx, icon, ...props}: IInput) {
  return (
        <FormControl variant="filled" {...props as FormControlProps}>
            <InputLabel htmlFor="mail">Почта</InputLabel>
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

