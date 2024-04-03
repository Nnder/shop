"use client"
import { useTheme } from "@emotion/react";
import {Box, Button, AppBar, Toolbar} from "@mui/material";
import {ShoppingBasket} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignButton from "@/src/6_shared/ui/Buttons/Sign/Sign";
import ButtonLink from "@/src/6_shared/ui/Buttons/Link/ButtonLink";
import NavbarMobileMenu from "@/src/4_features/NavbarMobileMunu/NavbarMobileMenu";


export default function Navbar() {
   const theme = useTheme();

  return (
   <AppBar sx={{px: [0,0,10]}}>
    <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
    }}>
        <NavbarMobileMenu/>
        
        <Box sx={{
            display: {xs: 'none', sm: 'none', md: 'flex' },
            justifyContent: 'center',
            alignItems: 'center'
            }}>
            <Link href={'/'} passHref 
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '20px'}}>
                <Image width={60} height={60} src={'/faviconStroke.svg'} alt="Meat"/>
            </Link>

            <ButtonLink href={'/'} sx={{fontSize:["0.8rem", "0.8rem","0.875rem"]}}>Главная</ButtonLink>
            <ButtonLink href={'/products'}>Продукция</ButtonLink>
            <ButtonLink href={'/about'}>О нас</ButtonLink>
            <ButtonLink href={'/contacts'}>Контакты</ButtonLink>
        </Box>

        <Box>
            <Button sx={{color: (theme)=>`${theme.palette.secondary.main}`}}>
                <ShoppingBasket size={35}/>
            </Button>
            <SignButton/>
        </Box>
    </Toolbar>
   </AppBar>
  );
}
