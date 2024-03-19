import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

interface IInput {
    sx?: Record<string, any>
    icon: ReactNode
}

export default function Input({sx, icon, ...props}: PropsWithChildren<IInput>) {
  return (
        <FormControl variant="filled">
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

