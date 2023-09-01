"use client";
import {useEffect, useState} from "react";
import {api} from "@/app/utils";

export default function useUser() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api("GET", "/user", null, {
            disableError: true,
        }).then((user) => {
            setUser(user);
        });
    }, []);

    return user;
}