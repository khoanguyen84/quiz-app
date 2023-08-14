import React from "react";
import Navbar from './Navbar';

function MainLayout({children}){
    return (
        <>
            <Navbar/>
            {children}
        </>
    )
}

export default MainLayout