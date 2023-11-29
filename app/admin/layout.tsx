"use client";
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";
import "../globals.css"
import Loading from "@/components/shared/loading";
const RootLayout = (props: {
    children: React.ReactNode;
}) => {

    const [kcInitialized, setKcInitialized] = useState(false);
    const [isLoading, setIsloading] = useState(false);
    useEffect(() => {
        const initKeycloak = async () => {
            //other code
            try {
                setIsloading(true)
                if (!kcInitialized) {
                    console.log('initKeycloak')
                    await UserService.initKeycloak();
                    setKcInitialized(true);
                }
                setIsloading(false)
            } catch (e) {
                console.log(e);
                setIsloading(false)
            }
        };
        initKeycloak();
    }, [])
    return <html lang="en" className="!scroll-smooth ">
        <body className="w-screen h-screen bg-gray-50 dark:bg-slate-900">
            {isLoading ? <Loading/> : props.children}
        </body>
    </html>
}


export default RootLayout;