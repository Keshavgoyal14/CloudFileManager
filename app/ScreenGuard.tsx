"use client"
import { ReactNode, useEffect, useState } from "react";

export default function ScreenGuard({children}:{children:ReactNode}){
    const [isLargeScreen,setLargescreen]=useState<boolean>(true);
     useEffect(() => {
    const checkScreen = () => setLargescreen(window.innerWidth >= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
if(!isLargeScreen){
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Screen Size Not Supported</h1>
                <p className="text-gray-600">Please use a larger screen to access this application.</p>
            </div>
        </div>
    );}
    return <>{children}</>
}