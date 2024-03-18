"use client"
import Button from "@/src/6_shared/ui/Buttons/Button";
import Input from "@/src/6_shared/ui/Inputs/Input";
import PasswrodInput from "@/src/6_shared/ui/Inputs/PasswrodInput";
import { Box, Container, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Paper, Typography } from "@mui/material";
import { Mail } from "lucide-react";
import { useState } from "react";

export default function Sign() {

  return (
   <Container sx={{
    pt: 8
   }}>
    <Box>
        <Typography>Авторизация</Typography>

        <div>
            <Box>
                <Input icon={<Mail/>}/>
            </Box>

            <Box>
                <PasswrodInput/>
            </Box>

            <Box>
                <Button>Вход</Button>
            </Box>
        </div>
        

        
      
    </Box>
   </Container>
  );
}
