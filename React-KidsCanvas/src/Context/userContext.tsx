
import { createContext, ReactElement, useContext, useEffect, useState } from "react";
import { user } from "../models/User";

type typeContext = {
    MyUser: user | null,
    setMyUser: (MyUser: user | null) => void,
    users: user[] | null,
    setUsers: (users: user[]) => void,
};

export const userContext = createContext<typeContext>({
    MyUser: null,
    setMyUser: () => {},
    users: [],
    setUsers: () => {},
});

const UUserContext = ({ children }: { children: ReactElement }) => {
    const [user, setUser] = useState<user | null>(null);
    const [users, setAllUsers] = useState<user[] | null>(null);

    useEffect(() => {
        const savedUser = sessionStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const setMyUser = (user: user | null) => {
        setUser(user);
        if (user) {
            sessionStorage.setItem("user", JSON.stringify(user));
        } else {
            sessionStorage.removeItem("user");
        }
    };

    const setUsers = (users: user[]) => {
        setAllUsers(users);
    }

    return (
        <userContext.Provider value={{ MyUser: user, setMyUser , users, setUsers }}>
            {children}
        </userContext.Provider>
    );
};
export const useUserContext = () => useContext(userContext);
export default UUserContext;
