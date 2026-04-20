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
      background: {
        default: "#ffffff",
        paper: "#ffffff",
      }
    },
    typography: {
      fontFamily: 'inherit',
      h1: { fontWeight: 700 },
      h2: { fontWeight: 700 },
      h3: { fontWeight: 600 },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiContainer: {
        defaultProps: {
          maxWidth: 'lg',
        },
        styleOverrides: {
          root: {
            paddingTop: '80px', // Sync with --navbar-height
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            fontWeight: 500,
            transition: 'all 0.3s ease',
          },
          contained: {
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            }
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
            borderRadius: '12px',
          },
          elevation16: {
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
          }
        }
      }
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
