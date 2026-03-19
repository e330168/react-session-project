import { createContext } from "react";
import type { AuthContextType } from "./AuthType";

export const AuthContext= createContext<AuthContextType | null>(null);