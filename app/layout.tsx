import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import Preloader from './components/preloader';
import SiteNavbar from './components/SiteNavbar';
import Footer from "./components/Footer";


const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta-sans', // Opsional: untuk variabel CSS
});


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className={plusJakartaSans.className}>
      <body className="min-h-full flex flex-col">
        <Preloader />
        <SiteNavbar />
        {children}
        <Footer />
        </body>
    </html>
  );
}
