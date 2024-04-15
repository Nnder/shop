import {Paper } from "@mui/material";
import Input from "@/src/6_shared/ui/Inputs/Input";
import { Search } from "lucide-react";
import { IInput } from "@/src/6_shared/ui/Inputs/types.Input";

export default function Find({sx, icon = <Search/>, label = "", onChange,...props}: IInput) {
  return (
    <Paper sx={{mb:2, width: ["75vw", "400px", "500px", "600px"], ...sx}} elevation={16}>
        <Input 
        icon={icon} label={label} 
        sx={{width: ["75vw", "400px", "500px", "600px"], ...sx}} 
        onChange={onChange}/>
    </Paper>
  )
}
