import { useState, type ReactNode } from "react";
import type { User } from "./AuthType";
import { AuthContext } from "./AuthContext";

export const AuthProvider= ({children}:{children: ReactNode})=>{

    const[user,setUser]= useState<User | null>(()=>{
      const storedUser= localStorage.getItem("user");
      return storedUser? JSON.parse(storedUser): null
    });

    const login= (userData:User)=>{
      setUser(userData);
      localStorage.setItem("user",JSON.stringify(userData));
    }

    const logout= ()=>{
      setUser(null);
      localStorage.removeItem("user");
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