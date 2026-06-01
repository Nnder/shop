"use client"
import React, { useState, useEffect, useContext, createContext, PropsWithChildren } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Link as MuiLink, Box, useMediaQuery, useTheme, Paper } from '@mui/material';
import Link from 'next/link';

interface CookieConsentContextType {
  consent: 'accepted' | 'declined' | null;
  hasInteracted: boolean;
  setConsent: (consent: 'accepted' | 'declined') => void;
  resetConsent: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export const CookieConsentProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [consent, setConsentState] = useState<'accepted' | 'declined' | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const storedConsent = localStorage.getItem('cookieConsent');
    if (storedConsent === 'accepted' || storedConsent === 'declined') {
      setConsentState(storedConsent);
      setHasInteracted(true);
    }
  }, []);

  const setConsent = (newConsent: 'accepted' | 'declined') => {
    localStorage.setItem('cookieConsent', newConsent);
    setConsentState(newConsent);
    setHasInteracted(true);
  };

  const resetConsent = () => {
    localStorage.removeItem('cookieConsent');
    setConsentState(null);
    setHasInteracted(false);
  };

  return (
    <CookieConsentContext.Provider value={{ consent, hasInteracted, setConsent, resetConsent }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
};

export const CookieConsentBanner: React.FC = () => {
  const { consent, hasInteracted, setConsent } = useCookieConsent();
  const [isVisible, setIsVisible] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!hasInteracted) {
      setIsVisible(true);
    }
  }, [hasInteracted]);

  const handleAccept = () => {
    setConsent('accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsent('declined');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.tooltip + 1, // Ensure it's on top of most elements
        display: 'flex',
        justifyContent: 'center',
        p: { xs: 1, sm: 2 }, // Padding around the banner
        // Animation for appearance
        transform: isVisible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease-out',
      }}
    >
      <Paper
        sx={{
          borderRadius: 'var(--border-radius-lg)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--shadow-lg)',
          p: { xs: 2, sm: 3 },
          bgcolor: '#fff',
          maxWidth: 'sm', // Equivalent to maxWidth="sm"
          width: '100%',
        }}
      >
        <Box sx={{ pb: { xs: 1, sm: 1 }, textAlign: 'center', fontWeight: 700, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          Использование файлов cookie
        </Box>
        <DialogContentText sx={{ color: 'var(--text-muted)', fontSize: isMobile ? '0.875rem' : '1rem', mb: { xs: 1.5, sm: 2 } }}>
          Наш сайт использует файлы cookie для улучшения вашего опыта и сбора анонимной статистики. 
          Вы можете принять или отклонить использование файлов cookie. 
          Подробную информацию можно найти в нашей <Link href="/privacy-policy" passHref><MuiLink component="span" sx={{ color: 'var(--accent)', cursor: 'pointer', fontWeight: 600 }}>Политике конфиденциальности</MuiLink></Link>.
        </DialogContentText>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 1, sm: 2 } }}>
          <Button 
            onClick={handleAccept} 
            variant="contained" 
            fullWidth 
            sx={{ 
              bgcolor: 'var(--accent)', 
              color: 'var(--secondary)', 
              '&:hover': { bgcolor: 'var(--accent-hover)' }, 
              flex: 1,
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              py: isMobile ? 1 : 1.5,
              borderRadius: 'var(--border-radius-sm)'
            }}
          >
            Принять
          </Button>
          <Button 
            onClick={handleDecline} 
            variant="outlined" 
            fullWidth 
            sx={{ 
              borderColor: 'var(--border-color)', 
              color: 'var(--text-primary)', 
              '&:hover': { borderColor: 'var(--accent)', color: 'var(--accent)', bgcolor: 'transparent' }, 
              flex: 1,
              fontSize: isMobile ? '0.8rem' : '0.9rem',
              py: isMobile ? 1 : 1.5,
              borderRadius: 'var(--border-radius-sm)'
            }}
          >
            Отказаться
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};
