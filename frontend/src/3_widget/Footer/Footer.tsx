import { Box, Container, Typography, Grid, IconButton, Divider } from "@mui/material";
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: 'var(--primary)', color: 'var(--secondary)', pt: 8, pb: 4, mt: 'auto' }}>
      <Container>
        <Grid container spacing={6}>
          {/* Brand & Mission */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Image width={50} height={50} src={'/faviconStroke.svg'} alt="Meat" style={{ filter: 'drop-shadow(0 0 8px rgba(255, 64, 0, 0.3))' }} />
              <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 1, color: 'var(--accent)' }}>УПК МЯСО</Typography>
            </Box>
            <Typography variant="body1" sx={{ opacity: 0.7, lineHeight: 1.8, mb: 3 }}>
              Мы производим и доставляем свежую мясную продукцию премиум-класса с 2005 года. 
              Традиционные рецепты и строгий контроль качества для вашего стола.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <IconButton key={i} sx={{ 
                  color: 'var(--secondary)', 
                  bgcolor: 'rgba(254, 239, 221, 0.05)',
                  '&:hover': { bgcolor: 'var(--accent)', color: 'white' }
                }}>
                  <Icon size={20} />
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Навигация</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { label: 'Главная', href: '/' },
                { label: 'Продукция', href: '/products' },
                { label: 'О нас', href: '/about' },
                { label: 'Контакты', href: '/contacts' },
              ].map((link) => (
                <Link key={link.href} href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <Typography sx={{ opacity: 0.7, '&:hover': { color: 'var(--accent)', opacity: 1 }, transition: 'var(--transition)' }}>
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Контакты</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <MapPin size={20} color="var(--accent)" />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>г. Нижний Тагил, ул. Краснознаменая 132а</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Phone size={20} color="var(--accent)" />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>+7 (995) 542-40-24</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Mail size={20} color="var(--accent)" />
                <Typography variant="body2" sx={{ opacity: 0.7 }}>dedkov.roma@gmail.ru</Typography>
              </Box>
            </Box>
          </Grid>

          {/* Opening Hours */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>Режим работы</Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <Clock size={20} color="var(--accent)" />
              <Box>
                <Typography variant="body2" sx={{ opacity: 0.7, mb: 1 }}>Пн — Сб: 9:00 - 22:00</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>Вс: Выходной</Typography>
              </Box>
            </Box>
            <Box sx={{ mt: 4, p: 2, border: '1px solid rgba(254, 239, 221, 0.1)', borderRadius: 'var(--border-radius-sm)' }}>
              <Typography variant="caption" sx={{ opacity: 0.5, display: 'block' }}>
                Бесплатная доставка при заказе от 2000 ₽ по всему городу.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 6, bgcolor: 'rgba(254, 239, 221, 0.05)' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ opacity: 0.5 }}>
            © {currentYear} УПК МЯСО. Все права защищены.
          </Typography>
          <Box sx={{ display: 'flex', gap: 4 }}>
            <Link href="/privacy" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography variant="caption" sx={{ opacity: 0.4, cursor: 'pointer', '&:hover': { opacity: 1, color: 'var(--accent)' } }}>
                Политика конфиденциальности
              </Typography>
            </Link>
            <Typography variant="caption" sx={{ opacity: 0.4, cursor: 'pointer', '&:hover': { opacity: 1 } }}>Публичная оферта</Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
