import { Box, Container, Typography, Grid, Paper, Divider } from "@mui/material";
import { CheckCircle2, Award, Zap, HeartPulse, ShieldCheck } from "lucide-react";
import ImageViewer from "@/src/4_features/ImageViewer/ImageViewer";

export default function About() {
  const nutritionData = [
    { label: "Белки", value: "18-22г", desc: "Строительный материал для мышц", color: "#FF4000" },
    { label: "Жиры", value: "12-15г", desc: "Источник энергии и витаминов", color: "#FEEFDD" },
    { label: "Углеводы", value: "0г", desc: "Натуральный состав без добавок", color: "#201E1F" },
    { label: "Калории", value: "180-220", desc: "Ккал на 100 грамм продукта", color: "rgba(32, 30, 31, 0.5)" },
  ];

  const features = [
    { icon: <Zap size={32} />, title: "Свежесть", desc: "Поставки каждый день прямо с производства" },
    { icon: <ShieldCheck size={32} />, title: "Контроль", desc: "Строгая проверка качества на всех этапах" },
    { icon: <HeartPulse size={32} />, title: "Польза", desc: "Без ГМО, сои и лишних консервантов" },
    { icon: <Award size={32} />, title: "Качество", desc: "Проверенные рецепты с 2005 года" },
  ];

  return (
    <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: '100vh', pb: 10 }}>
      {/* Hero Section */}
      <Box sx={{ 
        bgcolor: 'var(--primary)', 
        color: 'var(--secondary)', 
        py: { xs: 8, md: 12 }, 
        textAlign: 'center',
        mb: 8
      }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>Об организации УПК</Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, fontWeight: 400, lineHeight: 1.6 }}>
            Организация по поставке мяса из Свердловской области, специализирующаяся на производстве 
            высококачественной колбасы с 2005 года.
          </Typography>
        </Container>
      </Box>

      <Container>
        {/* Story Section */}
        <Grid container spacing={6} sx={{ mb: 10, alignItems: 'center' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 3 }}>Поставка мяса и производство колбасы</Typography>
            <Typography variant="body1" sx={{ color: 'var(--text-muted)', mb: 2, fontSize: '1.1rem', lineHeight: 1.8 }}>
              Мы специализируемся на оптовых и розничных поставках мяса, а также на производстве 
              колбасных изделий, соблюдая все государственные стандарты качества. 
              Наш основной профиль — это создание вкусной и натуральной колбасы.
            </Typography>
            <Typography variant="body1" sx={{ color: 'var(--text-muted)', mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
              Наша миссия — обеспечивать клиентов свежим мясом и качественной колбасой. 
              Мы используем только проверенное сырье и контролируем каждый этап производства.
            </Typography>
            <Grid container spacing={2}>
              {features.map((f, i) => (
                <Grid item xs={6} key={i}>
                  <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                    <Box sx={{ color: 'var(--accent)', mt: 0.5 }}>{f.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{f.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>{f.desc}</Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ 
              p: 2, 
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--border-radius-lg)',
              bgcolor: '#fff'
            }}>
              <ImageViewer src="/img/plan.jpeg" width="100%" height="auto" alt="План производства" />
              <Typography sx={{ mt: 2, textAlign: 'center', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                План производственного здания УПК
              </Typography>
            </Paper>
          </Grid>
        </Grid>

        {/* Meat Quality Indicators */}
        <Box sx={{ mb: 10 }}>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Показатели качества мяса</Typography>
            <Typography variant="h6" sx={{ color: 'var(--text-muted)', fontWeight: 400 }}>Средние значения на 100г продукции премиум-класса</Typography>
            <Box sx={{ width: '60px', height: '4px', bgcolor: 'var(--accent)', mx: 'auto', mt: 3 }} />
          </Box>
          <Grid container spacing={3}>
            {nutritionData.map((item, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper sx={{ 
                  p: 4, 
                  textAlign: 'center', 
                  height: '100%',
                  border: '1px solid var(--border-color)',
                  transition: 'var(--transition)',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: 'var(--shadow-md)' }
                }}>
                  <Typography variant="h4" sx={{ color: 'var(--accent)', fontWeight: 800, mb: 1 }}>{item.value}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>{item.label}</Typography>
                  <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>{item.desc}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Certificates & Documents */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>Сертификаты и документы</Typography>
          <Typography variant="h6" sx={{ color: 'var(--text-muted)', fontWeight: 400 }}>Мы гарантируем безопасность и соответствие ГОСТ</Typography>
          <Box sx={{ width: '60px', height: '4px', bgcolor: 'var(--accent)', mx: 'auto', mt: 3 }} />
        </Box>
        
        <Grid container spacing={3} justifyContent="center">
          {[
            { src: "/img/img1.jpg", alt: "Сертификат соответствия 1" },
            { src: "/img/img1.jpg", alt: "Сертификат соответствия 2" },
            { src: "/img/img1.jpg", alt: "Результаты исследований" },
            { src: "/img/img1.jpg", alt: "Лицензия производства" },
          ].map((cert, i) => (
            <Grid item xs={6} sm={4} md={3} key={i}>
              <Paper elevation={0} sx={{ 
                p: 1, 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--border-radius-md)',
                bgcolor: '#fff',
                transition: 'var(--transition)',
                cursor: 'pointer',
                '&:hover': { transform: 'scale(1.02)', borderColor: 'var(--accent)' }
              }}>
                <ImageViewer src={cert.src} width="100%" height="150px" alt={cert.alt} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
