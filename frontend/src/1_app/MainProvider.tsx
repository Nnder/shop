"use client"

import { ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import Session from "./Session";


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
    <Session>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
   </Session>
  );
}
