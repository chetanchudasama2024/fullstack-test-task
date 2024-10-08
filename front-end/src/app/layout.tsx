'use client'
import "./globals.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";
import Menu from "@/app/menu/page";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Provider store={store}>
        <body>
          <Toaster position="top-center" />
          {children}
          <Menu/>
        </body>
      </Provider>
    </html>
  );
}
