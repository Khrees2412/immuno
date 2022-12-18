import React, { createContext, useState } from "react";
import { supabase } from "./supabaseClient";

// Initializing context
export const AppContext = createContext();

export function AppContextProvider({ children }) {
    const [loading, setLoading] = useState(false);

    // Resets the session and logs out the current user
    const logOutAccount = async () => {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <AppContext.Provider
            value={{
                loading,
                signInAccount,
                logOutAccount,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
