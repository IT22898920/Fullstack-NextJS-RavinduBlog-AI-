import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ravindu Blog",
  description: "The best SEO blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >        
          <Header/>
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
