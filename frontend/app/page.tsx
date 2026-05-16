import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { ArrowBigRight, ShieldCheck, Truck, Utensils, Award } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <Box sx={{ pb: 8 }}>
      {/* Hero Section */}
      <Box sx={{
        height: '80vh',
        background: 'linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url("/img/plan.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'var(--secondary)',
        px: 2
      }}>
        <Typography variant="h1" sx={{ 
          fontSize: { xs: '2.5rem', md: '4.5rem' }, 
          fontWeight: 800, 
          mb: 2,
          textShadow: '0 4px 12px rgba(0,0,0,0.5)'
        }}>
          Вкус настоящего мяса
        </Typography>
        <Typography variant="h5" sx={{ 
          fontSize: { xs: '1.1rem', md: '1.5rem' }, 
          maxWidth: '800px', 
          mb: 4, 
          opacity: 0.9,
          fontWeight: 400
        }}>
          Поставка свежего мяса и производство колбасных изделий в Нижнем Тагиле. Гарантия качества каждой партии.
        </Typography>
        <Link href="/products" passHref>
          <Button variant="contained" size="large" sx={{ 
            bgcolor: 'var(--accent)', 
            px: 6, 
            py: 2, 
            fontSize: '1.1rem',
            '&:hover': { bgcolor: 'var(--accent-hover)' }
          }}>
            Перейти в каталог
          </Button>
        </Link>
      </Box>

      {/* How It Works Section */}
      <Container sx={{ mt: -8, position: 'relative', zIndex: 2 }}>
        <Grid container spacing={3}>
          {[
            { step: '01', title: 'Авторизуйтесь', desc: 'Войдите в личный кабинет для заказа' },
            { step: '02', title: 'Выберите продукт', desc: 'Широкий ассортимент свежего мяса' },
            { step: '03', title: 'Создайте заявку', desc: 'Оформите заказ в несколько кликов' },
            { step: '04', title: 'Обратная связь', desc: 'Мы свяжемся для подтверждения' },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper sx={{ 
                p: 3, 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: 1,
                border: '1px solid var(--border-color)',
                transition: 'var(--transition)',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: 'var(--shadow-lg)' }
              }}>
                <Typography sx={{ color: 'var(--accent)', fontWeight: 800, fontSize: '1.5rem' }}>{item.step}</Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>{item.title}</Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>{item.desc}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Benefits Section */}
      <Container sx={{ mt: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Почему выбирают нас</Typography>
          <Box sx={{ width: '60px', height: '4px', bgcolor: 'var(--accent)', mx: 'auto' }} />
        </Box>

        <Grid container spacing={4}>
          {[
            { icon: <ShieldCheck size={40} />, title: 'Надежный поставщик', desc: 'Обеспечиваем стабильные поставки свежего мяса, строго соблюдая графики и условия хранения.' },
            { icon: <Truck size={40} />, title: 'Логистика', desc: 'Собственная служба доставки по Нижнему Тагилу и области для оперативного снабжения клиентов.' },
            { icon: <Utensils size={40} />, title: 'Производство колбас', desc: 'Специализируемся на изготовлении колбасных изделий из проверенного сырья по ГОСТ стандартам.' },
            { icon: <Award size={40} />, title: 'Сотрудничество', desc: 'Приглашаем к партнерству розничные сети и точки общественного питания на выгодных условиях.' },
          ].map((benefit, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Box sx={{ display: 'flex', gap: 3, p: 2 }}>
                <Box sx={{ color: 'var(--accent)', flexShrink: 0 }}>{benefit.icon}</Box>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{benefit.title}</Typography>
                  <Typography variant="body1" sx={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{benefit.desc}</Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ 
        mt: 12, 
        py: 10, 
        bgcolor: 'var(--primary)', 
        color: 'var(--secondary)',
        textAlign: 'center'
      }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>Готовы стать вашим партнером</Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.8, fontWeight: 400 }}>
            Мы обеспечиваем бесперебойные поставки мяса и качественной колбасы для вашего бизнеса или личного потребления. Свяжитесь с нами для обсуждения условий поставок.
          </Typography>
          <Link href="/products" passHref>
            <Button variant="outlined" color="secondary" size="large" sx={{ 
              px: 6, 
              py: 1.5,
              borderWidth: '2px',
              '&:hover': { borderWidth: '2px', bgcolor: 'rgba(254, 239, 221, 0.1)' }
            }}>
              В каталог
            </Button>
          </Link>
        </Container>
      </Box>
    </Box>
  );
}
