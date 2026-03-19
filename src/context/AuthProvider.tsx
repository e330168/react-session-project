import { useState, type ReactNode } from "react";
import type { User } from "./AuthType";
import { AuthContext } from "./AuthContext";

export const AuthProvider= ({children}:{children: ReactNode})=>{

    const[user,setUser]= useState<User | null>(null);

    const login= (userData:User)=>{
      setUser(userData);
    }

    const logout= ()=>{
      setUser(null);
    }

    const hasPermission= (permission:string)=>{
      return user?.permissions?.includes(permission) || false;
    }

    return(
        <AuthContext.Provider value={{user,login,logout,hasPermission}}>
            {children}
        </AuthContext.Provider>
    )
};