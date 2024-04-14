import {ButtonProps} from "@mui/material";
import { PropsWithChildren } from "react";

export type IButton = PropsWithChildren<ButtonProps> & {href?: string}