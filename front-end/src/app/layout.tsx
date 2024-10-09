"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import { store } from "./redux/store";

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
        </body>
      </Provider>
    </html>
  );
}
