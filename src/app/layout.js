import { Inter, Bebas_Neue } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import PaymentModal from "@/components/PaymentModal";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata = {
  title: "Largo Pizzeria — Pune's Cozy Pizza Garden",
  description: "Known for our 18-inch thin-crust monster pizzas and warm outdoor night-garden vibes in Viman Nagar, Baner, and Koregaon Park.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${bebasNeue.variable} font-body bg-largo-bg-base text-largo-text-primary antialiased min-h-screen flex flex-col`}>
        <CartProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <CartDrawer />
          <PaymentModal />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
