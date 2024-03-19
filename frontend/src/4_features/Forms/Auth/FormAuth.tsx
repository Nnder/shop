"use client"
import Button from "@/src/6_shared/ui/Buttons/Button";
import Input from "@/src/6_shared/ui/Inputs/Input";
import PasswrodInput from "@/src/6_shared/ui/Inputs/PasswrodInput";
import { Box} from "@mui/material";
import { Mail } from "lucide-react";
export default function FormAuth() {

  return (
    <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: [200, 250, 300, 350]
    }}>
        <Box sx={{m: 1}}>
            <Input icon={<Mail/>}/>
        </Box>

        <Box sx={{m: 1}}>
            <PasswrodInput/>
        </Box>

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '100%',
            m: 1}}>
            <Button variant="contained" sx={{width: ['80%']}}>Вход</Button>
        </Box>
    </Box>
  );
}





