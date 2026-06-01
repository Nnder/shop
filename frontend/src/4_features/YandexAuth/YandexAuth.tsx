"use client"
import YandexButton from "@/src/6_shared/ui/Buttons/Yandex/Yandex"
import { signIn } from "next-auth/react"

export default function YandexAuth() {
  return (
    <YandexButton onClick={()=> signIn('yandex')}/>
  )
}
