"use client"
import { restClient } from "@/src/6_shared/api/api.fetch";
import Image from "mui-image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import 'react-photo-view/dist/react-photo-view.css';


export default function ProductImages({images}: any) {
    console.log(images[0])
  return (
    <div>
        <PhotoProvider>
            {/* <PhotoView src={images[0].src}>
                <Image src={images[0].src} alt="docs" width={500} height={500}/>
            </PhotoView> */}

            <div className="foo">
                {images.map((item: any, index: number) => (
                <PhotoView key={index} src={restClient.getMediaUrl(item.url)}>
                    <img src={restClient.getMediaUrl(item.url)} alt={item.name} width={100} height={100}/>
                </PhotoView>
                ))}
            </div>
        </PhotoProvider>
    </div>
  )
}
