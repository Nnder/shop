"use client"
import FormAuth from "@/src/4_features/Forms/Auth/FormAuth";
import { Box, Container, Paper, Typography } from "@mui/material";
export default function Sign() {
  return (
   <Container sx={{pt: 8}}>
        <Paper sx={{p: 8,m: 3}} elevation={8}>
            <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                <Typography>Авторизация</Typography>
                <FormAuth/>
            </Box>
        </Paper>
   </Container>
  );
}