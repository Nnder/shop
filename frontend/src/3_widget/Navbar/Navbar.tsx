"use client"
import { useTheme } from "@emotion/react";
import {Box, Button, AppBar, Toolbar} from "@mui/material";
import {ShoppingBasket, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignButton from "@/src/6_shared/Buttons/Sign/Sign";
import ButtonLink from "@/src/6_shared/Buttons/Link/ButtonLink";

export default function Navbar() {

   const theme = useTheme()

  return (
   <AppBar sx={{
    px: {xs: 0, md: 10},
   }}>

    <Toolbar sx={{
    display: 'flex',
    justifyContent: 'space-between',
   }}>
    

    <Box sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
    }}>
        <Link href={'/'} passHref 
        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '20px'}}>
            <Image width={60} height={60} src={'/faviconStroke.svg'} alt="Meat"/>
        </Link>

        <ButtonLink href={'/'}>Главная</ButtonLink>
        <ButtonLink href={'/products'}>Продукция</ButtonLink>
        <ButtonLink href={'/about'}>О нас</ButtonLink>
        <ButtonLink href={'/contacts'}>Контакты</ButtonLink>
    </Box>
    <Box sx={{

    }}>
        <Button sx={{
            color: (theme)=>`${theme.palette.secondary.main}`
        }}>
            <ShoppingBasket size={35}/>
        </Button>

        <SignButton/>
    </Box>
    </Toolbar>
   </AppBar>
  );
}
