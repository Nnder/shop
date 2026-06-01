"use client"
import { Button } from "@mui/material";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { usePathname } from 'next/navigation'

interface IButtonLink {
    href: string
    active?: boolean
    sx?: Record<string, any>
}

export default function ButtonLink({ children, href, sx, active, ...props }: PropsWithChildren<IButtonLink>) {
    const pathname = usePathname()

    if (active === undefined) active = pathname === href

    return (
        <Link href={href} passHref style={{ textDecoration: 'none' }}>
            <Button 
                sx={{
                    color: active ? 'var(--accent)' : 'var(--secondary)',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.95rem',
                    px: 2,
                    position: 'relative',
                    transition: 'var(--transition)',
                    '&:hover': {
                        bgcolor: 'transparent',
                        color: 'var(--accent)',
                        '&::after': {
                            width: '80%',
                        }
                    },
                    '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '10%',
                        width: active ? '80%' : '0%',
                        height: '2px',
                        bgcolor: 'var(--accent)',
                        transition: 'var(--transition)',
                        borderRadius: '2px'
                    },
                    ...sx
                }} 
                {...props} 
            >
                {children}
            </Button>
        </Link>
    );
}
