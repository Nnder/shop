"use client"

import { ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";


const theme = createTheme({
    palette: {
    //   primary: {
    //     // main: "#013e87",
    //   },
    //   secondary: {
    //     // main: "#2e74c9",
    //   }
    },
  })

export default function MainProvider({children}: PropsWithChildren) {
  return (
   <ThemeProvider theme={theme}>
    {children}
   </ThemeProvider>
  );
}
