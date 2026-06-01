"use client"
import GoogleButton from "@/src/6_shared/ui/Buttons/Google/Google"
import { signIn } from "next-auth/react"

export default function GoogleAuth() {
  return (
    <GoogleButton onClick={()=> signIn('google')}/>
  )
}
