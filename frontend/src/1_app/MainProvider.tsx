"use client"
import { ThemeProvider, createTheme } from "@mui/material";
import { PropsWithChildren } from "react";
import Session from "./Session";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Cache from "./Cache";

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const theme = createTheme({
    palette: {
      primary: {
        main: "#201E1F",
      },
      secondary: {
        main: "#FEEFDD",
      },
      info: {
        main: "#FF4000"
      },
    },
    components: {
      MuiContainer: {
        defaultProps: {
          sx: {
            pt: 8
          }
        }
      },
    }
  })

const queryClient = new QueryClient()

export default function MainProvider({children}: PropsWithChildren) {
  return (
    <>
    <Toaster/>
    <Session>
      <QueryClientProvider client={queryClient}>
        <Cache/>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>

        <ReactQueryDevtools initialIsOpen={false} />
        
      </QueryClientProvider>
   </Session>
   </>
  );
}
