"use client"
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel } from "@mui/material";
import { Eye, EyeOff } from "lucide-react";
import { PropsWithChildren, useState } from "react";

interface IPasswordInput {
    sx?: Record<string, any>
}

export default function PasswrodInput({sx}: PropsWithChildren<IPasswordInput>) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
        <FormControl variant="filled">
            <InputLabel htmlFor="filled-adornment-password">Пароль</InputLabel>
            <FilledInput sx={{...sx}}
            id="filled-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
  );
}

{/* <FormControl variant="filled">
<InputLabel htmlFor="mail">Почта</InputLabel>
<FilledInput
id="mail"
type='text'
endAdornment={
  <InputAdornment position="end">
    <IconButton
      aria-label="toggle password visibility"
      edge="end"
    >
      <Mail/>
    </IconButton>
  </InputAdornment>
}
/>
</FormControl> */}