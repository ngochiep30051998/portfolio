
"use client";
import isNotAuth from "@/components/isNotAuth";
import "../../globals.css";
import UserService from "@/services/UserService";

const AuthLayout = (props: {
    children: React.ReactNode;
}) => {

    return <>{props.children}</>

}

export default isNotAuth(AuthLayout);