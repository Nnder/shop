"use client"
import { useTheme } from "@emotion/react";
import {Box, Button, AppBar, Toolbar, Typography} from "@mui/material";
import {ShoppingBasket} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SignButton from "@/src/6_shared/ui/Buttons/Sign/Sign";
import ButtonLink from "@/src/6_shared/ui/Buttons/Link/ButtonLink";
import NavbarMobileMenu from "@/src/4_features/NavbarMobileMunu/NavbarMobileMenu";
import { useBidStore } from "@/src/5_entities/bid/bid";


export default function Navbar() {
   const theme = useTheme();
   const {products} = useBidStore()

  return (
   <AppBar position="sticky" sx={{
        background: 'rgba(32, 30, 31, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(254, 239, 221, 0.1)',
        boxShadow: 'none',
        borderRadius: '0px',
        px: [0, 0, 4, 10],
        height: 'var(--navbar-height)',
        justifyContent: 'center'
   }}>
    <Toolbar sx={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
    }}>
        <NavbarMobileMenu/>
        
        <Box sx={{
            display: {xs: 'none', sm: 'none', md: 'flex' },
            gap: 2,
            alignItems: 'center'
            }}>
            <Link href={'/'} passHref 
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center', paddingRight: '20px', transition: 'var(--transition)'}}>
                <Image width={50} height={50} src={'/faviconStroke.svg'} alt="Meat" style={{filter: 'drop-shadow(0 0 8px rgba(255, 64, 0, 0.3))'}}/>
            </Link>

            <ButtonLink href={'/'} sx={{fontSize: "1rem", fontWeight: 500}}>Главная</ButtonLink>
            <ButtonLink href={'/products'} sx={{fontSize: "1rem", fontWeight: 500}}>Продукция</ButtonLink>
            <ButtonLink href={'/about'} sx={{fontSize: "1rem", fontWeight: 500}}>О нас</ButtonLink>
            <ButtonLink href={'/contacts'} sx={{fontSize: "1rem", fontWeight: 500}}>Контакты</ButtonLink>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Link href="/bucket" style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '8px' }}>
                <ShoppingBasket size={28} color="#FEEFDD" />
                {products.length > 0 && (
                    <Box sx={{
                        position: 'absolute',
                        top: -2,
                        right: -4,
                        backgroundColor: 'var(--accent)',
                        color: 'white',
                        borderRadius: '50%',
                        width: '20px',
                        height: '20px',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '11px',
                        fontWeight: 700,
                        border: '2px solid var(--primary)'
                    }}>
                        {products.length}
                    </Box>
                )}
            </Link>
            <SignButton/>
        </Box>
    </Toolbar>
   </AppBar>
  );
}