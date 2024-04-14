import {Button as MuiButton} from "@mui/material";
import { IButton } from "./types.Button";
import Link from "next/link";

export default function Button({children, sx, variant = 'contained', href, ...props}: IButton) {
    if(href) {
        return (
            <MuiButton sx={{...sx}} variant={variant} {...props}>
                <Link href={href} style={{textDecoration:'none', color: '#fff'}}>
                    {children}
                </Link>
            </MuiButton>
    );
    }
    
    return (
            <MuiButton sx={{...sx}} variant={variant} {...props}>
                {children}
            </MuiButton>
    );
  }