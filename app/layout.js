"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ClerkProvider, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { CartProvider } from "./_context/CartContext";

const inter = Roboto({ subsets: ["latin"], weight: ["500", "700", "900"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideLayout = pathname === "/sign-in" || pathname === "/sign-up";

  return (
    <ClerkProvider>
      <CartProvider>
      <html lang="en">
        <body className={inter.className}>
          {!hideLayout && (
            <Header className="flex items-center justify-end h-16 gap-4 p-4">
              <SignedOut>
                
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Header>
          )}

          <main>{children}</main>

          {!hideLayout && <Footer />}
        </body>
      </html>
      </CartProvider>
    </ClerkProvider>
  );
}

