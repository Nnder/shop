import ImageViewer from "@/src/4_features/ImageViewer/ImageViewer";
import { Box, Container, Paper, Typography } from "@mui/material";
import 'react-photo-view/dist/react-photo-view.css';

export default function About() {
  return (
   <Container sx={{
    pt: 8
   }}>
    <Paper elevation={16} sx={{p: [1,2]}}>
      <Typography variant={'h1'} sx={{fontSize: ['20px', '25px', '40px'], textAlign: 'center', my: 1}}>
        О нас
      </Typography>
      <Box>
        <Typography variant="h2" sx={{fontSize: ['12px', '15px', '20px'], my: 1}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium voluptas quos, perferendis, aut cupiditate saepe tempora impedit dicta praesentium explicabo minima. Quidem error ipsam autem. Facilis neque tempore vero reprehenderit!
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mb: 2
      }}>
       <ImageViewer src="https://new-world-rpg.ru/wp-content/uploads/d/e/5/de5b6d3deb5540650d56e6415e191714.jpeg" 
       width={'90%'} height={'100%'} alt="Документ 1"/>

        <Typography>Элемент 1</Typography>
      </Box>

      <Box>
        <Typography variant="h2" sx={{fontSize: ['12px', '15px', '20px'], my: 1}}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium voluptas quos, perferendis, aut cupiditate saepe tempora impedit dicta praesentium explicabo minima. Quidem error ipsam autem. Facilis neque tempore vero reprehenderit!
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mb: 2
      }}>

        <ImageViewer src="https://alternativa-sar.ru/images/Rats_v_kolbas/Tab_105.jpg" 
        width={'90%'} height={'100%'} alt="Документ 1"/>

        <Typography>Элемент 2</Typography>
      </Box>
    </Paper>
   </Container>
  );
}