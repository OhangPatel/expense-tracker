"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.log("Logout failed", error.message);

            toast.error(error.message);
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log(res.data);

        setData(res.data.data._id);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">Profile Page</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className="p-1 rounded bg-green-100 text-black ">
                {data === "nothing" ? (
                    "Nothing"
                ) : (
                    <Link href={`/profile/${data}`}>{data}</Link>
                )}
            </h2>
            <hr />
            <button
                onClick={logout}
                className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
                Logout
            </button>

            <hr />
            <button
                onClick={getUserDetails}
                className="p-2 bg-green-200 text-black rounded hover:bg-blue-700"
            >
                Get User Details
            </button>
        </div>
    );
}
