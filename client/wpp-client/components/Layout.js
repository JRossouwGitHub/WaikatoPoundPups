import React from "react";
import globalStyle from "../src/app/globals.css";
import MUIThemeProvider from "./MUIThemeProvide";
import NavBar from "./NavBar";
import Meta from "./Meta";

export default function Layout({meta = {title: '', description: ''}, children}) {
    return (
        <MUIThemeProvider>
            <Meta title={meta.title} description={meta.description} />
            <NavBar />
            {children}
        </MUIThemeProvider>
    );
}