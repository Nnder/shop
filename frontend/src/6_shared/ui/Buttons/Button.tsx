"use client"
import { useTheme } from "@emotion/react";
import {ButtonBaseProps, ButtonOwnProps, Button as MuiButton} from "@mui/material";
import { PropsWithChildren } from "react";

interface ISignButton{
    sx?: Record<string, any>
    variant?: 'outlined' | 'contained' | 'text'
}

export default function Button({children, sx, variant}: PropsWithChildren<ISignButton>) {
    const theme = useTheme()

    return (
            <MuiButton sx={{...sx}} variant={variant}>
                {children}
            </MuiButton>
    );
  }
  

