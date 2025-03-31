"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import UserService from "../services/UserService";

export default function isNotAuth(Component: any) {
  return function IsNotAuth(props: any) {
    const auth = UserService.isLoggedIn();
    console.log('auth',auth)
    useEffect(() => {
      if (auth) {
        return redirect("/admin/home");
      }
    }, []);


    if (!auth) {
      return <Component {...props} />;
    }

    return redirect("/admin/home");
  };
}