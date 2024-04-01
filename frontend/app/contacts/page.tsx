import YandexMap from '@/src/4_features/YandexMap/YandexMap'
import { Box, Container, Paper, Typography } from '@mui/material'
import { BriefcaseBusiness, CalendarDays, Mail, Smartphone } from 'lucide-react'

export default function Contacts() {
  return (
    <Container sx={{
        pt: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: [0.5,2]
       }}>
        <Paper sx={{display: 'flex', flexDirection: 'column', maxWidth: '100%'}} elevation={8}>
          <Typography variant={'h1'} sx={{fontSize: ['20px', '25px', '40px'], textAlign: 'center', my: 1}}>
            Контакты
          </Typography>

          <Typography variant={'caption'} sx={{px:[1,3], fontSize: ['10px','16px','20px']}}>
            Мы всегда рады общению с нашими клиентами. Если у вас есть вопросы, пожелания или предложения, не стесняйтесь обращаться к нам. Наши контактные данные ниже:
          </Typography>

          <Box sx={{ p: [1,3]}}>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
              <Smartphone size={30}/>
              <Typography variant={'h5'} sx={{ml:1, fontSize:["0.7rem","1rem","1.25rem","1.5rem"]}}>Телефон: +7 (995) 542-40-24</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
              <BriefcaseBusiness size={30}/>
              <Typography variant={'h5'} sx={{ml:1, fontSize:["0.7rem","1rem","1.25rem","1.5rem"]}}>Адрес: ул. Краснознаменая 132а г. Нижний Тагил</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
              <CalendarDays size={30}/>
              <Typography variant={'h5'} sx={{ml:1, fontSize:["0.7rem","1rem","1.25rem","1.5rem"]}}>График работы: Пн-Сб 9:00 - 22:00</Typography>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'start', alignItems: 'center'}}>
              <Mail size={30}/>
              <Typography variant={'h5'} sx={{ml:1, fontSize:["0.7rem","1rem","1.25rem","1.5rem"]}}>Почта: dedkov.roma@gmail.ru</Typography>
            </Box>
          </Box>

          

          <Box sx={{maxWidth: '100%'}}>
            <YandexMap/>
          </Box>
        </Paper>
       </Container>
  )
}
