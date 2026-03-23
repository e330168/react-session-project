export interface User{
    id:number;
    username:string;
    password:string;
    role:string;
    permissions:string[]
}

export interface AuthContextType{
    user: User | null;
    login: (userData: User)=> void;
    logout: ()=> void;
    hasPermission: (permission:string)=> boolean;
}