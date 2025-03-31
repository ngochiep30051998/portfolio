import React, { ReactNode, useEffect, useRef, useState } from "react";
import { HomeIcon, UsersIcon } from '@heroicons/react/20/solid'

type MenuItem = {
    name: string;
    url?: string;
    icon: ReactNode,
    childs?: MenuItem[];
    key: string;
}
export const menus: MenuItem[] = [
    {
        name: 'Dashboard',
        icon: <HomeIcon className="w-4 h-4" />,
        url: '/admin/home',
        key: 'Dashboard',
    },
    {
        name: 'Users',
        icon: <UsersIcon className="w-4 h-4" />,
        url: '/admin/users',
        key: 'users',
        childs: [
            {
                name: 'Users 1',
                icon: <UsersIcon className="w-4 h-4" />,
                url: '/admin/users/1',
                key: 'users1',
            },
            {
                name: 'Users 2',
                icon: <UsersIcon className="w-4 h-4" />,
                url: '/admin/users/1',
                key: 'users2',
            },
            {
                name: 'Users 3',
                icon: <UsersIcon className="w-4 h-4" />,
                url: '/admin/users/3',
                key: 'users3',
                childs:[
                    {
                        name: 'Users 3 - 1',
                        icon: <UsersIcon className="w-4 h-4" />,
                        url: '/admin/users/3/1',
                        key: 'users3-1',
                    }
                ]
            },

        ]
    },
    {
        name: 'Users4',
        icon: <UsersIcon className="w-4 h-4" />,
        url: '/admin/users4',
        key: 'users4',
        childs: [
            {
                name: 'Users 4-1',
                icon: <UsersIcon className="w-4 h-4" />,
                url: '/admin/users/4/1',
                key: 'users4-1',
            },
        ]
    }
]

function initMenu(items: MenuItem[]) {
    return items.map(item => {
        if (item?.childs && item?.childs?.length > 0) {
            return (


                <li className="hs-accordion" id="projects-accordion" key={item?.key}>
                    <button type="button" className="hs-accordion-toggle w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-blue-600 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
                        {item.icon}
                        {item.name}

                        <svg className="hs-accordion-active:block ms-auto hidden w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>

                        <svg className="hs-accordion-active:hidden ms-auto block w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                    </button>

                    <div id="projects-accordion-sub" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden">
                        <ul className="pt-2 ps-2">
                            {initMenu(item.childs)}
                        </ul>
                    </div>
                </li>
            )
        } else {
            return (
                <li key={item.key}>
                    <a className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                        {item.icon}
                        {item.name}
                    </a>
                </li>
            )
        }
    })
}
const Sidebar = () => {

    return (
        <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-6">
                <a className="flex-none text-xl font-semibold dark:text-white" href="#" aria-label="Brand">Portfolio Admin</a>
            </div>

            <nav className="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
                <ul className="space-y-1.5">
                    {initMenu(menus)}
                </ul>
            </nav>
        </div>
    );
};

export default Sidebar;
