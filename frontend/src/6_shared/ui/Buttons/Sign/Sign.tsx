"use client"
import { Button } from "@mui/material";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { LogIn, LogOut } from "lucide-react";

export default function SignButton() {
    const session = useSession()
    const isAuthenticated = session.status === 'authenticated';
  
    if (!isAuthenticated) {
        return (
            <Link href='/signin' passHref>
                <Button 
                    variant="outlined" 
                    startIcon={<LogIn size={18} />}
                    sx={{
                        color: 'var(--secondary)',
                        borderColor: 'rgba(254, 239, 221, 0.3)',
                        px: 3,
                        '&:hover': {
                            borderColor: 'var(--secondary)',
                            bgcolor: 'rgba(254, 239, 221, 0.1)'
                        }
                    }}
                >
                    Вход
                </Button>
            </Link>
        );
    }

    return (
        <Button 
            onClick={() => signOut()}
            variant="text"
            startIcon={<LogOut size={18} />}
            sx={{
                color: 'var(--secondary)',
                px: 2,
                '&:hover': {
                    bgcolor: 'rgba(255, 64, 0, 0.1)',
                    color: 'var(--accent)'
                }
            }}
        >
            Выход
        </Button>
    );
}
