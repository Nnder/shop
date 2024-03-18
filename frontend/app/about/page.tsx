import { Container, Paper, Typography } from "@mui/material";

export default function About() {
  return (
   <Container sx={{
    pt: 8
   }}>
    <Paper elevation={16}>
      <Typography variant={'h1'}>
        About
      </Typography>
    </Paper>
   </Container>
  );
}
