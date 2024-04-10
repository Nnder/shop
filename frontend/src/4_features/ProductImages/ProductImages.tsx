"use client"
import { restClient } from "@/src/6_shared/api/api.fetch";
import { useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';
import styles from './ProductImages.module.css'

export default function ProductImages({images}: any) {
    const [hoverImg, setHoverImg] = useState(images[0].url);
  return (
    <div>
        <PhotoProvider>
            <PhotoView src={restClient.getMediaUrl(hoverImg)}>
                <img src={restClient.getMediaUrl(hoverImg)} alt={"main"} width={"100%"} height={"300px"} className={styles.main_image} />
            </PhotoView>

            <div className={styles.slider_wrapper}>
                {images.map((item: any, index: number) => 
                <PhotoView key={index} src={restClient.getMediaUrl(item.url)}>
                    <img src={restClient.getMediaUrl(item?.formats?.medium ? item.formats.medium.url : item.url)} alt={item.name} width={100} height={100} 
                    onPointerEnter={()=>setHoverImg(item.url)} className={styles.image_slide}/>
                </PhotoView>
                )}
            </div>
        </PhotoProvider>
    </div>
  )
}