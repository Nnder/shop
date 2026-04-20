"use client"
import { restClient } from "@/src/6_shared/api/api.fetch";
import { useState } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import styles from './ProductImages.module.css'

export default function ProductImages({images}: any) {
    const [hoverImg, setHoverImg] = useState(images[0].url);
    
    return (
        <div>
            <PhotoProvider>
                <PhotoView src={restClient.getMediaUrl(hoverImg)}>
                    <div className={styles.main_image} style={{ position: 'relative', overflow: 'hidden' }}>
                        <Image 
                            src={restClient.getMediaUrl(hoverImg)} 
                            alt={"main"} 
                            fill 
                            style={{ objectFit: 'cover' }}
                            priority
                        />
                    </div>
                </PhotoView>

                <div className={styles.slider_container}>
                    <Swiper
                        modules={[Pagination]}
                        spaceBetween={10}
                        slidesPerView={4}
                                                pagination={{ clickable: true }}
                        breakpoints={{
                            320: {
                                slidesPerView: 2,
                                spaceBetween: 5,
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 8,
                            },
                            768: {
                                slidesPerView: 4,
                                spaceBetween: 10,
                            },
                        }}
                    >
                        {images.map((item: any, index: number) => (
                            <SwiperSlide key={index}>
                                <PhotoView src={restClient.getMediaUrl(item.url)}>
                                    <div 
                                        style={{ 
                                            position: 'relative', 
                                            width: '100%', 
                                            height: '80px',
                                            cursor: 'pointer',
                                            border: hoverImg === item.url ? '2px solid var(--accent)' : '2px solid transparent',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}
                                        onMouseEnter={() => setHoverImg(item.url)}
                                    >
                                        <Image 
                                            src={restClient.getMediaUrl(item?.formats?.medium ? item.formats.medium.url : item.url)} 
                                            alt={item.name} 
                                            fill
                                            style={{ objectFit: 'cover' }}
                                        />
                                    </div>
                                </PhotoView>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </PhotoProvider>
        </div>
    )
}