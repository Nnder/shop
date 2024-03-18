"use client"
import { useTheme } from "@emotion/react";
import {Button as MuiButton} from "@mui/material";
import { PropsWithChildren } from "react";

interface ISignButton{
    sx?: Record<string, any>
}

export default function Button({children, sx, ...props}: PropsWithChildren<ISignButton>) {
    const theme = useTheme()

    return (
            <MuiButton sx={{...sx}} {...props}>
                {children}
            </MuiButton>
    );
  }
  

