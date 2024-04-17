import { Box, Container, Paper, Typography } from "@mui/material";
import { ArrowBigDown, ArrowBigRight } from "lucide-react";

export default function Home() {
  return (
      <Container>
      <Paper elevation={16} sx={{marginTop:2}}>
        <Box sx={{height: '50vh', background: '#201E1F', p: 3, display: 'flex', justifyContent:'center', alignItems:'center'}}>
          <Typography variant={'h1'} sx={{fontSize: [24,30,30,35,40], color:'#FEEFDD'}} textAlign={'center'}>
            Продажа мясной продукции в Нижнем Тагиле, с доставкой.
          </Typography>
        </Box>
        
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: 1}}>

          <Typography sx={{fontSize:[26,28,30,34], my: 2}}>
            Как мы работаем
          </Typography>

          <Box sx={{display: 'flex', justifyContent:'center', alignItems:'center', width: 1, flexDirection:{xs:'column', sm:'row', marginBottom: 8}}}>
            <Paper elevation={8} sx={{p:1}}>
              <Typography sx={{fontSize: {xs: 20, sm: 13, md: 20}, width:{xs: 200, sm: 'inherit'}}} textAlign={'center'}>Авторизуйтесь</Typography>
            </Paper>
            
            <Box sx={{display: {xs: 'none', sm: 'block'}}}>
              <ArrowBigRight/>
            </Box>
            <Box sx={{display: {xs: 'block', sm: 'none'}}}>
              <ArrowBigDown/>
            </Box>

            <Paper elevation={8} sx={{p:1}}>
              <Typography sx={{fontSize: {xs: 20, sm: 13, md: 20}, width:{xs: 200, sm: 'inherit'}}} textAlign={'center'}>Выберите продукт</Typography>
            </Paper>
            
            <Box sx={{display: {xs: 'none', sm: 'block'}}}>
              <ArrowBigRight/>
            </Box>
            <Box sx={{display: {xs: 'block', sm: 'none'}}}>
              <ArrowBigDown/>
            </Box>

            <Paper elevation={8} sx={{p:1}}>
              <Typography sx={{fontSize: {xs: 20, sm: 13, md: 20}, width:{xs: 200, sm: 'inherit'}}} textAlign={'center'}>Создайте заявку</Typography>
            </Paper>

            <Box sx={{display: {xs: 'none', sm: 'block'}}}>
              <ArrowBigRight/>
            </Box>
            <Box sx={{display: {xs: 'block', sm: 'none'}}}>
              <ArrowBigDown/>
            </Box>
            <Paper elevation={8} sx={{p:1}}>
              <Typography sx={{fontSize: {xs: 20, sm: 13, md: 20}, width:{xs: 200, sm: 'inherit'}}} textAlign={'center'}>Обратная связь</Typography>
            </Paper>
          </Box>
        </Box>

        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', p:{xs:1, sm:2}}}>
          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', my:2}}>
            <Typography sx={{fontSize:[22,24,26,28,32], marginBottom:1 }} textAlign={'center'}>
              Наслаждайтесь Высоким Качеством и Свежестью
            </Typography>
            <Typography sx={{fontSize:[16,18,20,22,24]}} textAlign={'center'}>
              Перед вами уникальная возможность обогатить свой стол свежими и натуральными мясными продуктами премиум-класса. Наши продукты представляют собой идеальное сочетание качества, вкуса и питательных свойств, чтобы удовлетворить самые изысканные вкусы.
            </Typography>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', my:2}}>
            <Typography sx={{fontSize:[22,24,26,28,32], marginBottom:1 }} textAlign={'center'}>
              Разнообразие Высококачественной продукции
            </Typography>
            <Typography sx={{fontSize:[16,18,20,22,24]}} textAlign={'center'}>
              Изысканные мясные деликатесы, свежие мясные полуфабрикаты, нежнейшие стейки, аппетитные колбасы и многое другое ждут вас на нашем сайте. Мы гордимся своим богатым ассортиментом продукции, гарантируя вам только лучшее.
            </Typography>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', my:2}}>
            <Typography sx={{fontSize:[22,24,26,28,32], marginBottom:1 }} textAlign={'center'}>
              Гарантированное Качество
            </Typography>
            <Typography sx={{fontSize:[16,18,20,22,24]}} textAlign={'center'}>
              Мы тщательно следим за качеством каждого продукта, начиная с выбора ингредиентов и заканчивая упаковкой. Наши продукты проходят строгий контроль качества, чтобы обеспечить вам только лучшее.
            </Typography>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', my:2}}>
            <Typography sx={{fontSize:[22,24,26,28,32] , marginBottom:1 }} textAlign={'center'}>
              Быстрая Доставка и Удобные Опции Оплаты
            </Typography>
            <Typography sx={{fontSize:[16,18,20,22,24]}} textAlign={'center'}>
              Мы ценим ваше время и удобство, поэтому предлагаем быструю доставку и различные удобные способы оплаты. Откройте для себя удовольствие покупок без хлопот!
            </Typography>
          </Box>

          <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', my:2}}>
            <Typography sx={{fontSize:[22,24,26,28,32], marginBottom:1 }} textAlign={'center'}>
              Откройте Для Себя Мир Истинного Вкуса
            </Typography>
            <Typography sx={{fontSize:[16,18,20,22,24]}} textAlign={'center'}>
              Присоединяйтесь к нам и окунитесь в мир настоящего вкуса и качества. Позвольте вашему столу радовать вас свежестью и ароматом наших мясных продуктов.
            </Typography>
          </Box>
        </Box>
        
      </Paper>
    </Container>
  );
}
