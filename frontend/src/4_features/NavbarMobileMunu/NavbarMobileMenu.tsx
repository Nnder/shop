import {Box, MenuItem, Typography, Menu, IconButton} from '@mui/material'
import {MenuIcon} from "lucide-react";
import Link from "next/link";
import { useState } from 'react';

export default function NavbarMobileMenu() {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
  return (
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
                <MenuIcon size={40}/>

            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
            
                <Link href={'/'} style={{textDecoration: 'none'}}>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="left" sx={{color: '#201E1F', fontSize:{xs:'18px',sm:'20px'}, width: '200px'}}>Главная</Typography>
                    </MenuItem>
                </Link>

                <Link href={'/products'} style={{textDecoration: 'none'}}>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="left" sx={{color: '#201E1F', fontSize:{xs:'18px',sm:'20px'}, width: '200px'}}>Продукция</Typography>
                    </MenuItem>
                </Link>

                <Link href={'/about'} style={{textDecoration: 'none'}}>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="left" sx={{color: '#201E1F', fontSize:{xs:'18px',sm:'20px'}, width: '200px'}}>О нас</Typography>
                    </MenuItem>
                </Link>

                <Link href={'/contacts'} style={{textDecoration: 'none'}}>
                    <MenuItem onClick={handleCloseNavMenu}>
                        <Typography textAlign="left" sx={{color: '#201E1F', fontSize:{xs:'18px',sm:'20px'}, width: '200px'}}>Контакты</Typography>
                    </MenuItem>
                </Link>

            </Menu>
        </Box>
  )
}