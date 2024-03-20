import { InputProps } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";



export interface IInput extends PropsWithChildren<InputProps> {
    icon?: ReactNode
}