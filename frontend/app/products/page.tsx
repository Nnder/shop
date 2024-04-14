import CardList from "@/src/3_widget/CardList/CardList";
import Loader from "@/src/6_shared/ui/Loader/Loader";
import {Box, Container, Paper} from "@mui/material";
import { Suspense } from "react";

export default function Products() {

  return (
   <Container>
    <Paper elevation={16} sx={{px: [0,1], py: 2, minHeight: "100px"}}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
      <Suspense fallback={<Loader/>}>
        <CardList/>
      </Suspense>
      </Box>
    </Paper>
   </Container>
  );
}