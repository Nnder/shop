"use client"

import { ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";


const theme = createTheme({
    palette: {
      primary: {
        main: "#201E1F",
      },
      secondary: {
        main: "#FEEFDD",
      },
    },
  })

export default function MainProvider({children}: PropsWithChildren) {
  return (
   <ThemeProvider theme={theme}>
    {children}
   </ThemeProvider>
  );
}
