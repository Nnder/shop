"use client"
import FormAuth from "@/src/4_features/Forms/Auth/FormAuth";
import GoogleAuth from "@/src/4_features/GoogleAuth/GoogleAuth";
import YandexAuth from "@/src/4_features/YandexAuth/YandexAuth";
import { Box, Container, Typography, Divider } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function SignIn() {
    const session = useSession()
    
    if(session.status === "authenticated")
        redirect('/')

    return (
        <Box sx={{ 
            minHeight: 'calc(100vh - var(--navbar-height))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'var(--bg-cream)',
            py: 8
        }}>
            <Container maxWidth="sm">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <FormAuth/>
                    
                    <Box sx={{ mt: 4, width: '100%', maxWidth: '400px' }}>
                        <Typography variant="body2" sx={{ textAlign: 'center', mb: 2, color: 'var(--text-muted)' }}>
                            Или войти через
                        </Typography>
                        <Box sx={{ 
                            display: 'flex', 
                            flexDirection: 'column', 
                            gap: 2,
                            width: '100%'
                        }}>
                            <YandexAuth/>
                            <GoogleAuth/>
                        </Box>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}
