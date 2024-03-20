import YandexMap from '@/src/4_features/YandexMap/YandexMap'
import { Box, Container, Paper, Typography } from '@mui/material'

export default function Contacts() {
  return (
    <Container sx={{
        pt: 8,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
       }}>
        <Paper sx={{display: 'flex', flexDirection: 'column'}}>
          <Typography variant={'h4'} sx={{p:3}}>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam, ab cupiditate incidunt soluta ducimus corporis eum praesentium molestias voluptatum provident adipisci ratione non quidem qui sit? Quos mollitia consectetur sequi?
          </Typography>

            <Box sx={{width: '100%'}}>
                <YandexMap/>
            </Box>
          
        </Paper>
          
        
       </Container>
  )
}
