"use client";
import isAuth from "@/components/isAuth";
import Sidebar from "@/components/layout/Sidebar";
import UserService from "@/services/UserService";
import { useEffect, useState } from "react";

const DashboardLayout = (props: {
    children: React.ReactNode;
}) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);
    useEffect(() => { import("preline") }, []);

    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className="w-full pt-10 px-4 sm:px-6 md:px-8 lg:ps-72">
                <main>
                    {props.children}
                </main>
            </div>
        </div>
    )
}


export default isAuth(DashboardLayout);