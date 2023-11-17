"use client";
import isNotAuth from "@/components/isNotAuth";
import UserService from "@/services/UserService";
import { useEffect } from "react";

const LoginPage = () => {
    useEffect(()=>{
        if(!UserService.isLoggedIn()){
            UserService.doLogin();
        }
    },[])
    return <>Redirecting to sso login...</>
}


export default LoginPage;