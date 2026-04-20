import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MainProvider from "@/src/1_app/MainProvider";
import Navbar from "@/src/3_widget/Navbar/Navbar";
import Footer from "@/src/3_widget/Footer/Footer";
import "@/src/1_app/globals.css";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Мясная лавка | Нижний Тагил",
  description: "Доставка свежей мясной продукции в Нижнем Тагиле",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/faviconStroke.svg" sizes="any"/>
      </head>
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <MainProvider>
          <Navbar/>
          <Box component="main" sx={{ flexGrow: 1 }}>
            {children}
          </Box>
          <Footer/>
        </MainProvider>
      </body>
    </html>
  );
}
