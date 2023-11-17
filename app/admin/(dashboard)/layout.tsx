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
    return (
        <div className="flex h-screen overflow-hidden">
            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <header>Header</header>
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {props.children}
                    </div>
                </main>

            </div>
        </div>
    )
}


export default isAuth(DashboardLayout);