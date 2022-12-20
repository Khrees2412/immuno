import { supabase } from "../supabaseClient";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(authContext);
};

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        const { error, user } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.log(error);
        }

        return { user };
    };

    const logout = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error);
        }

        setUser(null);
    };

    useEffect(() => {
        const user = supabase.auth.getUser();
        setUser(user);

        const auth = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN") {
                setUser(session.user);
            }

            if (event === "SIGNED_OUT") {
                setUser(null);
            }
        });

        return () => auth.data.unsubscribe();
    }, []);

    return {
        user,
        login,
        logout,
    };
}
