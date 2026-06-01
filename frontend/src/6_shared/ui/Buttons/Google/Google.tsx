import Button from "@/src/6_shared/ui/Buttons/Button";
import {Typography } from "@mui/material";
import Image from "next/image";
import { IButton } from "../types.Button";

export default function GoogleButton( {...props}: IButton) {
  return (
    <Button {...props} sx={{
      display: 'flex',
      justifyContent: 'space-evenly',
      alignItems: 'center',
    }}>
     <Image src={'img/google.svg'} width={25} height={25} alt="Я"/>
     <Typography sx={{pt: '4px', fontSize: '16px', width: 100}}>Google</Typography>
    </Button>
  )
}
