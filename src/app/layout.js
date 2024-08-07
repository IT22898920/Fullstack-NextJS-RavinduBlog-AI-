import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "components/footer/Footer";
import { ToastContainer, toast } from "react-toastify";
import { AuthProvider } from "./AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import ProgressBarProvider from "./ProgressBarProvider";

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
          <ProgressBarProvider>
          <ToastContainer />
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
          </ProgressBarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
