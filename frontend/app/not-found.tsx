"use client"
import {Button, Container, Paper, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const theme = useTheme()
  const router = useRouter()

  return (<Container sx={{
    pt: 8,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
   }}>
    <Paper sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography variant={'h4'} sx={{p:3}}>
          Ошибка 404 страница не найдена
      </Typography>
      <Button variant="contained" onClick={()=>router.back()} 
      sx={{color: (theme)=>`${theme.palette.secondary.main}`}}>Вернутся обратно</Button>
    </Paper>
      
    
   </Container>
)}