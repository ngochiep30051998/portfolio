"use client";
import isAuth from "@/components/isAuth";
import UserService from "@/services/UserService";
import { useEffect } from "react";

const DashboardLayout = (props: {
    children: React.ReactNode;
}) => {
    return (
        <div>
            <header>Header</header>
            <aside>Sidebar</aside>
            {props.children}
            <footer>Footer</footer>
        </div>
    )
}


export default isAuth(DashboardLayout);