import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { useAtom } from "jotai";
import { darkTheme } from "@/data/atoms/theme";

const Layout = ({ children }) => {
  const [value] = useAtom(darkTheme);

  return (
    <div data-theme={value === true ? "dark" : "light"}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
