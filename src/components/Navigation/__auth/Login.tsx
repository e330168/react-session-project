import { useState } from "react";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import { login } from "../../../api";
import { useAuth } from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login(){

    const[username, setUsername]= useState<string>("");
    const[password, setPassword]= useState<string>("");
    const {login:authLogin}= useAuth();
    const navigate= useNavigate();

    const handleSubmit= async(e:React.FormEvent)=>{
      e.preventDefault();

      if(!username) return alert("Invalid credentials");
      
      const user= await login(username,password);

      if(user){
          authLogin(user);
          navigate("/sessions");
      }else{
        alert("Invalid credentials");
        setUsername("");
        setPassword("");
      }

    };

    return(
            <div className="flex flex-col items-center p-10" id="home-page">
                <form onSubmit={handleSubmit}
                    className="w-full max-w-sm">

                        <div className="md:flex md:items-center mb-6">
                            <Input label="username"
                                   id="username"
                                   type="text"
                                   value={username}
                                   placeholder="Enter username"
                                   onChange={(e)=>setUsername(e.target.value)}
                                   />
                        </div>

                        <div className="md:flex md:items-center mb-6">
                            <Input label="password"
                                   id="password"
                                   type="password"
                                   value={password}
                                   placeholder="Enter password"
                                   onChange={(e)=>setPassword(e.target.value)}
                                   />
                        </div>


                        <div>
                            <Button type="submit">
                                Login
                            </Button>
                        </div>

                 </form>
            </div>
        
    )
}