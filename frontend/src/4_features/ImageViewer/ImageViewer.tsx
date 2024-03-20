"use client"
import { PhotoProvider, PhotoView } from "react-photo-view";

export interface Image {
    src: string
    width: string | number
    height: string | number
    alt: string
}

export default function ImageViewer({src, width, height}: Image ){
  return (
    <PhotoProvider>
        <PhotoView src={src}>
            <img src={src} alt="docs" width={width} height={height}/>
        </PhotoView>
    </PhotoProvider>
  )
}
