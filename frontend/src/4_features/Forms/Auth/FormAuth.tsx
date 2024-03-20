"use client"
import Button from "@/src/6_shared/ui/Buttons/Button";
import Input from "@/src/6_shared/ui/Inputs/Input";
import PasswrodInput from "@/src/6_shared/ui/Inputs/Password/PasswrodInput";
import { Box} from "@mui/material";
import { Mail } from "lucide-react";
export default function FormAuth() {

  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: [200, 250, 350]
    }}>
        <Box sx={{m: 1}}>
            <Input icon={<Mail/>} onChange={(e)=>console.log(e.target.value)}/>
        </Box>

        <Box sx={{m: 1}}>
            <PasswrodInput onChange={(e)=>console.log(e.target.value)}/>
        </Box>

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            m: 1}}>
            <Button sx={{width: ['80%']}}>Вход</Button>
        </Box>

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            m: 1}}>
                <Button href="/signup" sx={{width: ['80%']}}>Регистрация</Button>
            </Box>
    </Box>
  );
}





