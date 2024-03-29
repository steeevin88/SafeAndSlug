"use client"
import { useUser } from "@auth0/nextjs-auth0/client";
import classNames from "classnames";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import slug from "../app/icon.png"
import Image from "next/image"
import Link from "next/link";

export default function Navbar({loggedIn} : {loggedIn? : boolean}) {
    const [toggled, setToggled] = useState(false);
    const {user, isLoading} = useUser();
    return (
        <nav className={classNames("bg-primary text-xl absolute top-0 w-full lg:flex overflow-hidden lg:justify-between lg:items-center px-8 py-2 lg:py-6 pb-6 transition-all duration-200 ease-in-out", {"max-h-screen lg:max-h-16": toggled, "max-h-16": !toggled})}>
            <div className="flex justify-between">
                    <Link className="flex gap-2 items-center" href={loggedIn ? "/events" : "/"}>
                        <Image src={slug} alt="logo" className="w-12 h-12 p-2" width="64" height="64"/>
                        <span className="text-2xl font-bold">Safe and Slug</span>
                    </Link>
                <div className="flex items-center lg:hidden" onClick={() => setToggled(!toggled)}>
                    <IoMenu className="h-8 w-8"/>
                </div>
            </div>
            {loggedIn && <div className="flex flex-col lg:flex-row gap-8 mt-4 mb-8 lg:my-0">
                <Link href="/events" onClick={() => setToggled(!toggled)}>Home</Link>
                <Link href="/addEvent" onClick={() => setToggled(!toggled)}>Create Event</Link>
                <Link href="/account" onClick={() => setToggled(!toggled)}>Update Profile</Link>
            </div>}
            <div>
                {isLoading ? 
                    <div className="loading loading-spinner"></div> :
                    <div className="flex items-center gap-2 md:gap-4">
                        {user?.picture && <Link href="/account"><img className="rounded-full h-8 md:h-12" src={user.picture}/></Link>}
                        <a href={user ? "/api/auth/logout" : "/api/auth/login"}>{user ? "Logout" : "Login"}</a>
                    </div>
                }
            </div>
        </nav>
    )
}
