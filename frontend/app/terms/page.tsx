import { Box, Container, Typography, Paper } from '@mui/material';

export default function TermsPage() {
  return (
    <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: 'calc(100vh - var(--navbar-height))', py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: 'var(--border-radius-lg)', border: '1px solid var(--border-color)' }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, textAlign: 'center', color: 'var(--text-primary)' }}>
            Пользовательское соглашение
          </Typography>

          <Typography variant="body1" paragraph>
            Использование сайта «УПК МЯСО» означает ваше согласие с условиями данного соглашения.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            1. Регистрация
          </Typography>
          <Typography variant="body1" paragraph>
            Пользователь обязуется предоставлять достоверную информацию при регистрации и оформлении заказа. Администрация имеет право заблокировать аккаунт в случае предоставления заведомо ложных данных.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            2. Интеллектуальная собственность
          </Typography>
          <Typography variant="body1" paragraph>
            Все материалы, представленные на сайте (фотографии товаров, описания, логотипы), являются собственностью магазина. Использование материалов без согласия правообладателя запрещено.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            3. Ответственность
          </Typography>
          <Typography variant="body1" paragraph>
            Сайт предоставляется «как есть». Мы не несем ответственности за временные перебои в работе сайта, связанные с техническими работами или проблемами на стороне хостинг-провайдера.
          </Typography>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 4, mb: 2 }}>
            4. Изменение условий
          </Typography>
          <Typography variant="body1" paragraph>
            Администрация оставляет за собой право изменять данное соглашение в одностороннем порядке. Новая редакция вступает в силу с момента ее публикации.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}
