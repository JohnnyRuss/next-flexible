import React from "react";

import "./globals.css";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Flexible",
  description: "Showcase and discover reparably developer projects",
};

interface layoutType {
  children: React.ReactNode;
}

const layout: React.FC<layoutType> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default layout;
