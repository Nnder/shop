import { Container, Paper, Typography } from "@mui/material";

export default function Home() {
  console.log(process.env);

  return (
   <Container>
    <Paper elevation={16}>
      <Typography variant={'h1'}>
        About
      </Typography>
    </Paper>
   </Container>
  );
}
