"use client"
import { Container, Paper, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {

  const sessin = useSession()
  const user = sessin.data?.user;
  const router = useRouter()
  router.push('/products')

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
