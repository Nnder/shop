"use client"
import { restClient } from "@/src/6_shared/api/api.fetch";
import { useState } from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
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

            <div className={styles.slider_wrapper}>
                {images.map((item: any, index: number) => 
                <PhotoView key={index} src={restClient.getMediaUrl(item.url)}>
                    <div style={{ position: 'relative', width: '100px', height: '100px' }} className={styles.image_slide}>
                        <Image 
                            src={restClient.getMediaUrl(item?.formats?.medium ? item.formats.medium.url : item.url)} 
                            alt={item.name} 
                            fill
                            style={{ objectFit: 'cover' }}
                            onPointerEnter={()=>setHoverImg(item.url)}
                        />
                    </div>
                </PhotoView>
                )}
            </div>
        </PhotoProvider>
    </div>
  )
}