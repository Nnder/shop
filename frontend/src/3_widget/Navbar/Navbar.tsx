"use client"
import { useTheme } from "@emotion/react";
import {Typography, Box, Button, AppBar, Toolbar} from "@mui/material";
import {ShoppingBasket, } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
            {/* <Beef width={35} height={35}/> */}
        </Link>

        <Link href={'/'} passHref>
            <Button sx={{
                color: (theme)=>`${theme.palette.secondary.main}`
            }}>Главная</Button>
        </Link>

        <Link href={'products'} passHref>
            <Button sx={{
                color: (theme)=>`${theme.palette.secondary.main}`
            }}>Продукция</Button>
        </Link>

        <Link href={'about'} passHref>
            <Button sx={{
                color: (theme)=>`${theme.palette.secondary.main}`
            }}>О нас</Button>
        </Link>

        <Link href={'contacts'} passHref>
            <Button sx={{
                color: (theme)=>`${theme.palette.secondary.main}`
            }}>Контакты</Button>
        </Link>
    </Box>
    <Box sx={{

    }}>
        <Button sx={{
            color: (theme)=>`${theme.palette.secondary.main}`
        }}>
            <ShoppingBasket size={35}/>
        </Button>
       
        <Button>
            <Typography sx={{
                color: (theme)=>`${theme.palette.secondary.main}`
            }}>Вход</Typography>
            
        </Button>
        
    </Box>

    </Toolbar>
    
   </AppBar>
  );
}
