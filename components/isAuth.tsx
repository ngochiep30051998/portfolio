"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import UserService from "../services/UserService";

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const auth = UserService.isLoggedIn();
    useEffect(() => {
      if (!auth) {
        return redirect("/admin/login");
      }
    }, []);


    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}