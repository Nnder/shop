import {Button as MuiButton} from "@mui/material";
import { IButton } from "./types.Button";

export default function Button({children, sx, variant = 'contained', ...props}: IButton) {
    return (
            <MuiButton sx={{...sx}} variant={variant} {...props}>
                {children}
            </MuiButton>
    );
  }