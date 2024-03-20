"use client"
import { YMaps, Map, Placemark } from "react-yandex-maps";
import React, { useRef, useEffect } from 'react';


export default function YandexMap({ center = [55.751574, 37.573856], zoom = 10 }) {

  // const mapRef = useRef<Props | null>(null); // Define mapRef type explicitly
  const apiKey = "30b08209-6155-4d95-a3ea-1af21767b63d";
  const mapRef = useRef<any>(null!);

  useEffect(() => {
    if (mapRef.current) {
      // You can perform any map-related logic here using mapRef.current
    }
  }, []);

  return (
    <YMaps preload={true} query={{apikey: apiKey, lang: 'ru_RU'}} >
      <Map width={"100%"} defaultState={{
      center: [55.75, 37.57],
      zoom: 9,
      controls: ['zoomControl', 'fullscreenControl'],
    }} modules={['control.ZoomControl', 'control.FullscreenControl']}
    instanceRef={(ref) => (mapRef.current = ref)} >
        <Placemark defaultGeometry={[55.75, 37.57]} />
      </Map>
  </YMaps>  
  )
}