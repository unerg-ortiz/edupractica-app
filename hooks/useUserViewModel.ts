import { useState, useEffect } from "react";
import { fetchUserData } from "../services/userService";

interface User {
    name: string;
    email: string;
}

export const useUserViewModel = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserData().then((data) => {
            setUser(data);
            setLoading(false);
        });
    }, []);

    return {
        user,
        loading,
    };
};
