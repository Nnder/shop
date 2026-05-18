"use client"
import YandexMap from '@/src/4_features/YandexMap/YandexMap'
import { Box, Container, Paper, Typography, Grid, Button, Divider } from '@mui/material'
import { BriefcaseBusiness, CalendarDays, Mail, Smartphone, MapPin, Send } from 'lucide-react'
import { FormInput } from '@/src/6_shared/ui/Inputs/FormInput/FormInput'
import { useState } from 'react'
import toast from 'react-hot-toast'

export const dynamic = 'force-static';

export default function Contacts() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const contactInfo = [
    { icon: <Smartphone size={24} />, label: "Телефон", value: "+7 (995) 542-40-24", sub: "Звоните нам в рабочее время" },
    { icon: <MapPin size={24} />, label: "Адрес", value: "ул. Краснознаменая 132а", sub: "Нижний Тагил, Свердловская обл." },
    { icon: <CalendarDays size={24} />, label: "График работы", value: "Пн-Сб 9:00 - 22:00", sub: "Воскресенье — выходной" },
    { icon: <Mail size={24} />, label: "Почта", value: "dedkov.roma@gmail.ru", sub: "Для официальных запросов" },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        toast.success('Сообщение отправлено!')
        e.currentTarget.reset()
      } else {
        toast.error('Ошибка при отправке сообщения')
      }
    } catch (error) {
      toast.error('Ошибка при отправке сообщения')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box sx={{ bgcolor: 'var(--bg-cream)', minHeight: '100vh', pb: 10 }}>
      {/* Header */}
      <Box sx={{ bgcolor: 'var(--primary)', color: 'var(--secondary)', py: { xs: 8, md: 10 }, textAlign: 'center', mb: 8 }}>
        <Container maxWidth="md">
          <Typography variant="h2" sx={{ fontWeight: 800, mb: 2 }}>Контакты</Typography>
          <Typography variant="h6" sx={{ opacity: 0.8, fontWeight: 400 }}>
            Мы всегда на связи и готовы ответить на любые ваши вопросы о нашей продукции и доставке.
          </Typography>
        </Container>
      </Box>

      <Container>
        <Grid container spacing={6}>
          {/* Contact Details & Form */}
          <Grid item xs={12} lg={7}>
            <Paper elevation={0} sx={{ 
              p: { xs: 3, md: 6 }, 
              borderRadius: 'var(--border-radius-lg)', 
              border: '1px solid var(--border-color)',
              boxShadow: 'var(--shadow-md)',
              height: '100%'
            }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>Напишите нам</Typography>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <FormInput name="name" placeholder="Ваше имя" required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormInput name="email" placeholder="Email" type="email" required />
                  </Grid>
                  <Grid item xs={12}>
                    <FormInput name="subject" placeholder="Тема сообщения" />
                  </Grid>
                  <Grid item xs={12}>
                    <Box sx={{ mt: 2 }}>
                       <FormInput name="message" placeholder="Ваше сообщение" multiline rows={4} required />
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      type="submit"
                      variant="contained" 
                      size="large" 
                      endIcon={<Send size={20} />}
                      disabled={isSubmitting}
                      sx={{ 
                        mt: 2, 
                        px: 6, 
                        py: 1.5, 
                        bgcolor: 'var(--accent)',
                        '&:hover': { bgcolor: 'var(--accent-hover)' }
                      }}
                    >
                      {isSubmitting ? 'Отправка...' : 'Отправить'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          {/* Contact Cards */}
          <Grid item xs={12} lg={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {contactInfo.map((info, i) => (
                <Paper key={i} elevation={0} sx={{ 
                  p: 3, 
                  borderRadius: 'var(--border-radius-md)', 
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  gap: 3,
                  alignItems: 'center',
                  transition: 'var(--transition)',
                  '&:hover': { borderColor: 'var(--accent)', bgcolor: '#fff' }
                }}>
                  <Box sx={{ 
                    bgcolor: 'rgba(255, 64, 0, 0.1)', 
                    color: 'var(--accent)', 
                    p: 2, 
                    borderRadius: 'var(--border-radius-sm)',
                    display: 'flex'
                  }}>
                    {info.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
                      {info.label}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, my: 0.5 }}>{info.value}</Typography>
                    <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>{info.sub}</Typography>
                  </Box>
                </Paper>
              ))}
            </Box>
          </Grid>

          {/* Map Section */}
          <Grid item xs={12}>
            <Box sx={{ mt: 4, textAlign: 'center', mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Как нас найти</Typography>
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
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
