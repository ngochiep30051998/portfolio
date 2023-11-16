"use client";
import isNotAuth from "@/components/isNotAuth";
import UserService from "@/services/UserService";

const LoginPage = () => {
    const onSubmit = () => {
        UserService.doLogin();
    }
    return <>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onSubmit}>
            Login
        </button>
    </>
}


export default isNotAuth(LoginPage);