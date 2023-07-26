import React from "react";
import { useAtom } from "jotai";
import { darkTheme } from "@/data/atoms/theme";
import Header from "./header";
import Footer from "./footer";

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
