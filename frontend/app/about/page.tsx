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
        УПК - это семейная компания, основанная в 2005 году в живописном регионе Свердловской области. Мы специализируемся на производстве и продаже высококачественной мясной продукции, соблюдая традиции и стандарты крафтового производства.
        </Typography>

        <Typography variant="h2" sx={{fontSize: ['12px', '15px', '20px'], my: 1}}>
          Наш ассортимент включает свежие мясные деликатесы, колбасы ручной работы, вяленое мясо, домашние консервы и готовые блюда. Мы используем только натуральные ингредиенты и следим за качеством каждого этапа производства.
        </Typography>

        <Typography variant="h2" sx={{fontSize: ['12px', '15px', '20px'], my: 1}}>
          Наша миссия - радовать клиентов вкусными и качественными мясными изделиями, способствуя здоровому и сбалансированному питанию каждой семьи. Мы стремимся стать лучшим партнером для наших клиентов и создать атмосферу доверия и удовлетворения.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h2" sx={{fontSize: ['12px', '15px', '20px'], my: 1}}>
          Ниже представлен план здания нашей фирмы (рисунок 1).
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mb: 2
      }}>
       <ImageViewer src="/img/plan.jpeg" 
       width={"90%"} height={"100%"} alt="Документ 1"/>

        <Typography sx={{mt:2}}>рисунок 1 - План здания УПК</Typography>
      </Box>

      <Box>
        <Typography variant="h2" sx={{fontSize: ['12px', '15px', '20px'], my: 1}}>
          Показатели содержания элементов в вареной колбасе (рисунок 2).
        </Typography>
      </Box>

      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        mb: 2
      }}>

        <ImageViewer src="/img/img1.jpg" 
        width={"90%"} height={"100%"} alt="Документ 1"/>

        <Typography sx={{mt:2}}>рисунок 2 - Показатели</Typography>
      </Box>
    </Paper>
   </Container>
  );
}