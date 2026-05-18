"use client"
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { useState, useEffect } from "react";
import { Box } from '@mui/material';

export default function YandexMap({ center = [57.942389, 59.912006], zoom = 10 }) {
  const apiKey = process.env.YANDEX_APIKEY_MAP
  const [showOverlay, setShowOverlay] = useState(true)

  const handleMapClick = () => {
    setShowOverlay(false)
  }

  const handleScroll = () => {
    setShowOverlay(true)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      <YMaps preload={true} query={{apikey: apiKey, lang: 'ru_RU'}} >
        <Map width={"100%"} height={"100%"} defaultState={{
        center: [57.942389, 59.912006],
        zoom: 9,
        controls: ['zoomControl', 'fullscreenControl'],
      }} modules={['control.ZoomControl', 'control.FullscreenControl']} >
          <Placemark defaultGeometry={[57.942389, 59.912006]} />
        </Map>
      </YMaps>

      {showOverlay && (
        <Box
          onClick={handleMapClick}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'transparent',
            cursor: 'grab',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'opacity 0.3s ease',
          }}
        >
          <Box
            sx={{
              bgcolor: 'rgba(32, 30, 31, 0.8)',
              color: 'var(--secondary)',
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontSize: '0.9rem',
              pointerEvents: 'none',
            }}
          >
            Нажмите для взаимодействия с картой
          </Box>
        </Box>
      )}
    </Box>
  )
}