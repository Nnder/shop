import { Container, Paper, Typography } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
   <Container>
    <Paper elevation={16}>
      <Typography variant={'h1'}>
        Hello
      </Typography>
    </Paper>
   </Container>
  );
}
