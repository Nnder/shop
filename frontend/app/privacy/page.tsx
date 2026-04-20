import { Box, Container, Typography, Paper, Divider } from "@mui/material";

export default function PrivacyPolicy() {
  const currentYear = new Date().getFullYear();

  return (
    <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: '100vh', py: 8 }}>
      <Container maxWidth="md">
        <Paper elevation={0} sx={{ 
          p: { xs: 3, md: 6 }, 
          borderRadius: 'var(--border-radius-lg)', 
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-md)'
        }}>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, textAlign: 'center' }}>
            Политика конфиденциальности
          </Typography>
          
          <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 4, textAlign: 'center' }}>
            Последнее обновление: {currentYear} год
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>1. Общие положения</Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Настоящая политика обработки персональных данных составлена в соответствии с требованиями Федерального закона от 27.07.2006. №152-ФЗ «О персональных данных» и определяет порядок обработки персональных данных и меры по обеспечению безопасности персональных данных, предпринимаемые ИП «УПК МЯСО» (далее — Оператор).
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>2. Состав собираемых данных</Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Мы собираем только те данные, которые необходимы для выполнения ваших заказов:
              </Typography>
              <Box component="ul" sx={{ mt: 1, pl: 4 }}>
                <li>Имя и фамилия;</li>
                <li>Номер мобильного телефона;</li>
                <li>Адрес электронной почты;</li>
                <li>Адрес доставки заказа.</li>
              </Box>
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>3. Цели обработки данных</Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Ваши данные используются исключительно для:
              </Typography>
              <Box component="ul" sx={{ mt: 1, pl: 4 }}>
                <li>Оформления и подтверждения заказа;</li>
                <li>Доставки продукции по указанному адресу;</li>
                <li>Информирования о статусе заказа;</li>
                <li>Улучшения качества обслуживания.</li>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>4. Безопасность данных</Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Оператор обеспечивает сохранность персональных данных и принимает все возможные меры, исключающие доступ к персональным данным неуполномоченных лиц. Ваши данные никогда не будут переданы третьим лицам, за исключением случаев, связанных с исполнением действующего законодательства.
              </Typography>
            </Box>

            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>5. Заключительные положения</Typography>
              <Typography variant="body1" sx={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
                Пользователь может получить любые разъяснения по интересующим вопросам, касающимся обработки его персональных данных, обратившись к Оператору с помощью электронной почты dedkov.roma@gmail.ru.
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
