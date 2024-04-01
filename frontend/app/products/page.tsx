import CardList from "@/src/3_widget/CardList/CardList";
import {Box, Container, Paper} from "@mui/material";

export default function About() {

  return (
   <Container>
    <Paper elevation={16} sx={{px: [0,1], py: 4, minHeight: "100px"}}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: [1,2,3,4]
    }}>
        <CardList/>
      </Box>
    </Paper>
   </Container>
  );
}