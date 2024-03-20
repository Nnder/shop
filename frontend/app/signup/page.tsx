"use client"
import FormRegister from "@/src/4_features/Forms/Register/FormRegister";
import GoogleAuth from "@/src/4_features/GoogleAuth/GoogleAuth";
import YandexAuth from "@/src/4_features/YandexAuth/YandexAuth";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
export default function SignUp() {
    const session = useSession()
    
    if(session.status === "authenticated")
        redirect('/')

  return (
   <Container sx={{pt: 8}}>
        <Paper sx={{p: 8,mx: [0, 3], my: 3}} elevation={8}>
            <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                <Typography sx={{fontSize: [20, 30]}}>Регистрация</Typography>
                <FormRegister/>
                <Typography  sx={{fontSize:['12px', '15px', '18'], textAlign: 'center'}}>
                    Или войти через
                    </Typography>
                <Box sx={{display: 'flex', flexDirection: 'column', height: 100, justifyContent: 'space-evenly'}}>
                    <YandexAuth/>
                    <GoogleAuth/>
                </Box>
            </Box>
        </Paper>
   </Container>
  );
}