"use client"
import { Container, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function Home() {

  const sessin = useSession()
  const user = sessin.data?.user;
  
  return (
   <Container>
    <Paper elevation={16}>
    {sessin.status}
      <Typography variant={'h1'}>
        Hello {user?.email}
      </Typography>
    </Paper>
   </Container>
  );
}
