import { Box, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Divider } from '@mui/material'
import { Menu as MenuIcon, X, Home, ShoppingBag, Info, Phone, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { useState } from 'react';
import { useSession, signOut } from "next-auth/react";

export default function NavbarMobileMenu() {
    const [open, setOpen] = useState(false);
    const session = useSession();
    const isAuthenticated = session.status === 'authenticated';

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const navLinks = [
        { href: '/', label: 'Главная', icon: <Home size={22} /> },
        { href: '/products', label: 'Продукция', icon: <ShoppingBag size={22} /> },
        { href: '/about', label: 'О нас', icon: <Info size={22} /> },
        { href: '/contacts', label: 'Контакты', icon: <Phone size={22} /> },
    ];

    return (
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
                size="large"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ color: 'var(--secondary)', p: 1 }}
            >
                <MenuIcon size={32} />
            </IconButton>

            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: {
                        width: '280px',
                        bgcolor: 'var(--primary)',
                        color: 'var(--secondary)',
                        borderRadius: 0, // No rounding
                    }
                }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--accent)' }}>УПК МЯСО</Typography>
                    <IconButton onClick={toggleDrawer(false)} sx={{ color: 'var(--secondary)' }}>
                        <X size={28} />
                    </IconButton>
                </Box>
                
                <Divider sx={{ bgcolor: 'rgba(254, 239, 221, 0.1)' }} />

                <List sx={{ pt: 2 }}>
                    {navLinks.map((link) => (
                        <ListItem key={link.href} disablePadding>
                            <Link href={link.href} passHref style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}>
                                <ListItemButton 
                                    onClick={toggleDrawer(false)}
                                    sx={{ 
                                        py: 2, 
                                        px: 3,
                                        '&:hover': { bgcolor: 'rgba(255, 64, 0, 0.1)' }
                                    }}
                                >
                                    <Box sx={{ mr: 2, color: 'var(--accent)', display: 'flex' }}>{link.icon}</Box>
                                    <ListItemText primary={link.label} primaryTypographyProps={{ fontWeight: 600, fontSize: '1.1rem' }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>

                <Box sx={{ mt: 'auto', p: 3 }}>
                    {isAuthenticated ? (
                        <ListItemButton 
                            onClick={() => { signOut(); setOpen(false); }}
                            sx={{ 
                                bgcolor: 'rgba(255, 64, 0, 0.1)', 
                                color: 'var(--accent)',
                                borderRadius: 0, // No rounding
                                py: 1.5,
                                justifyContent: 'center'
                            }}
                        >
                            <LogOut size={20} style={{ marginRight: '8px' }} />
                            <Typography sx={{ fontWeight: 700 }}>Выйти</Typography>
                        </ListItemButton>
                    ) : (
                        <Link href="/signin" passHref style={{ textDecoration: 'none' }}>
                            <ListItemButton 
                                onClick={toggleDrawer(false)}
                                sx={{ 
                                    bgcolor: 'var(--accent)', 
                                    color: 'white',
                                    borderRadius: 0, // No rounding
                                    py: 1.5,
                                    justifyContent: 'center',
                                    '&:hover': { bgcolor: 'var(--accent-hover)' }
                                }}
                            >
                                <LogIn size={20} style={{ marginRight: '8px' }} />
                                <Typography sx={{ fontWeight: 700 }}>Войти</Typography>
                            </ListItemButton>
                        </Link>
                    )}
                </Box>
            </Drawer>
        </Box>
    )
}
