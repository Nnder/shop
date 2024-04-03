"use client"
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";

export interface Image {
    src: string
    width: number | string
    height: number | string
    alt: string
}

export default function ImageViewer({src, width, height}: Image ){
  return (
    <PhotoProvider>
        <PhotoView src={src}>
            <Image src={src} alt="docs" width={500} height={500} style={{width, height}}/>
        </PhotoView>
    </PhotoProvider>
  )
}
