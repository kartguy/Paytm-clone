import { useRecoilState } from "recoil";
import { Input } from "../components/Input";
import { emailAtom, firstNameAtom, lastNameAtom, passAtom } from "../store/signupCred";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup(){
    const[fName,setFname]=useRecoilState(firstNameAtom);
    const[lName,setLname]=useRecoilState(lastNameAtom);
    const[email,setEmail]=useRecoilState(emailAtom);
    const[pass,setPass]=useRecoilState(passAtom);

    const navigate=useNavigate();
        

    return <div className="p-5 shadow-lg rounded-lg w-2/4 ">
        <div className="text-center mb-6">
            <div>
                <h1 className=" text-4xl font-bold">Sign Up</h1>
            </div>
            
            <div className="mt-3 px-6">
                <h1 className="text-xl ">Enter your information to create an account</h1>
            </div>
        </div>

        <div>
            <Input type="text" name="First Name" 
            onChange={(e)=>{
                setFname(e.target.value);
            }}/>

            <Input type="text" name="Last Name" onChange={(e=>{
                setLname(e.target.value);
            })}/>

            <Input type="email" name="Email"onChange={(e)=>{
                setEmail(e.target.value);
            }}
            />

            <Input type="password" name="Password" onChange={(e)=>{
                setPass(e.target.value);
            }}/>
            
            <div className="p-2">
                <button className="bg-black w-full h-10 rounded-lg text-white text-lg"
                onClick={async ()=>{
                    try {
                        const response= await axios.post("http://localhost:5000/api/user/signup",{
                            fName: fName,
                            email: email,
                            lName: lName,
                            password: pass
                    })

                    const token=response.data.token;

                    localStorage.setItem("token", token)

                    navigate('/dashboard')
                    setTimeout(() => {
                        alert(response.data.msg);
                    }, 100);
                    
                        
                    } catch (error) {
                        console.log(error.response.data);
                        alert("Wrong Inputs");
                    }
                    
                }}
                >Sign up</button>
            </div>

            <div className=" text-center text-md font-semibold">
                <h1>Already have an account? <a className=" underline text-lg" href="/signin">Login</a></h1>
            </div>
        </div>
        
        
    </div>
}