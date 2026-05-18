import { Box, Container, Typography, Grid, Paper, Button } from "@mui/material";
import { ArrowBigRight, ShieldCheck, Truck, Utensils, Award } from "lucide-react";
import Link from "next/link";
import YandexMap from "@/src/4_features/YandexMap/YandexMap";

export const dynamic = 'force-static';

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
          Надежный поставщик мяса и колбас
        </Typography>
        <Typography variant="h5" sx={{ 
          fontSize: { xs: '1.1rem', md: '1.5rem' }, 
          maxWidth: '800px', 
          mb: 4, 
          opacity: 0.9,
          fontWeight: 400
        }}>
          Производство и поставка свежего мяса и колбасных изделий в Нижнем Тагиле и по всей Свердловской области. Готовы к долгосрочному сотрудничеству с розничными сетями и общепитом.
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
            { step: '01', title: 'Выберите продукт', desc: 'Широкий ассортимент свежего мяса и колбас' },
            { step: '02', title: 'Добавьте в корзину', desc: 'Укажите необходимое количество продукции' },
            { step: '03', title: 'Оформите заказ', desc: 'Укажите контакты для связи и доставки' },
            { step: '04', title: 'Получите заказ', desc: 'Доставка по Нижнему Тагилу и области' },
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
            { icon: <ShieldCheck size={40} />, title: 'Надежный поставщик', desc: 'Стабильные поставки свежего мяса и колбасных изделий по Нижнему Тагилу и всей Свердловской области с 2005 года.' },
            { icon: <Truck size={40} />, title: 'Собственная логистика', desc: 'Оперативная доставка по графику, соблюдение условий хранения и температурного режима при транспортировке.' },
            { icon: <Utensils size={40} />, title: 'Собственное производство', desc: 'Изготовление колбасных изделий из проверенного сырья по ГОСТ стандартам. Полный контроль качества на каждом этапе.' },
            { icon: <Award size={40} />, title: 'B2B партнерство', desc: 'Готовы к долгосрочному сотрудничеству с розничными сетями, ресторанами и точками общепита на выгодных условиях.' },
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

      {/* Map Section */}
      <Container sx={{ mt: 10 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Наше местоположение</Typography>
          <Box sx={{ width: '60px', height: '4px', bgcolor: 'var(--accent)', mx: 'auto' }} />
        </Box>
        <Paper elevation={0} sx={{
          borderRadius: 'var(--border-radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          height: '450px',
          width: '100%',
          position: 'relative'
        }}>
          <YandexMap />
        </Paper>
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
