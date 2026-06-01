import Button from "@/src/6_shared/ui/Buttons/Button";
import {Typography } from "@mui/material";
import Image from "next/image";
import { IButton } from "../types.Button";

export default function YandexButton( {...props}: IButton) {
  return (
    <Button {...props} sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: [160, 200],
   }}>
       <Image src={'img/yandex.svg'} width={25} height={25} alt="Я"/>
       <Typography sx={{pt: '4px', fontSize: '16px', width: 100}}>Яндекс ID</Typography>
   </Button>
  )
}
