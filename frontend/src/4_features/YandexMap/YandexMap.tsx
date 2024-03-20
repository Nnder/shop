"use client"
import { YMaps, Map, Placemark } from "react-yandex-maps";
import React, { useRef, useEffect } from 'react';

export default function YandexMap({ center = [57.942389, 59.912006], zoom = 10 }) {

  // const mapRef = useRef<Props | null>(null); // Define mapRef type explicitly
  const apiKey = "d224c45f-431b-4a41-b48d-17cbcb27cbd0";
  const mapRef = useRef<any>(null!);

  useEffect(() => {
    if (mapRef.current) {
      // You can perform any map-related logic here using mapRef.current
    }
  }, []);

  

  return (
    <YMaps preload={true} query={{apikey: apiKey, lang: 'ru_RU'}} >
      <Map width={"100%"} defaultState={{
      center: [57.942389, 59.912006],
      zoom: 9,
      controls: ['zoomControl', 'fullscreenControl'],
    }} modules={['control.ZoomControl', 'control.FullscreenControl']}
    instanceRef={(ref) => (mapRef.current = ref)} >
        <Placemark defaultGeometry={[57.942389, 59.912006]} />
      </Map>
  </YMaps>  
  )
}