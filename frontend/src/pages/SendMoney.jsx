import { useEffect } from "react";
import { Input } from "../components/Input";
import { ProfileIcon } from "../components/ProfileIcon";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { amountAtom} from "../store/sendMoney";

export function Sendmoney(){
    const [searchParams]=useSearchParams();
    const [amount,setAmount]=useRecoilState(amountAtom)
    const id=searchParams.get("id");
    const name=searchParams.get("name");
    const token=localStorage.getItem("token")
    const navigate=useNavigate();

    useEffect(()=>{
        if(!token){
            setTimeout(() => {
                alert("Please Login.")
            }, 100);
            navigate('/signin')
        }

        if(!id || !name){
            navigate('/dashboard')
        }
    })
    

    useEffect(()=>{
        try {
            axios.post("http://localhost:5000/api/user/me",{
                token
            }).then(response=>{
                console.log(response.data);
            })
        } 
        catch (error) {
            console.log(error.response.data);
        }
        
    })



    return (
        <div className="p-5 w-96 shadow-xl rounded-lg px-8 m-auto mt-64">
            <div className="text-center mb-20">
                <div>
                    <h1 className=" text-4xl font-extrabold font-sans">Send Money</h1>
                </div>
            </div>

            <div className="flex">
                <div className="pl-2 w-12 h-12">
                    <ProfileIcon label={name[0].toUpperCase()} />
                </div>

                <div className="p-1 ml-2">
                    <h1 className="text-3xl font-semibold">{name}</h1>
                </div>

            </div>
            <div>
                <Input name="Amount in Rs:" 
                type="number"
                onChange={(e)=>{
                    if(e.target.value!==""){
                        setAmount(parseFloat(e.target.value))
                    }
                }}
                 />
            </div>
            
            <div className="p-2">
                <button className="bg-green-500 w-full h-10 rounded-lg text-white text-md font-sans"
                onClick={async ()=>{
                    try {
                        const response=await axios.post("http://localhost:5000/api/account/transfer",{
                        to:id,
                        amount:amount
                    },{
                        headers:{
                            "Authorization":"Bearer "+token
                        }
                    })
                        console.log(response.data);
                        navigate('/dashboard')
                        setTimeout(() => {
                            alert("Transfer Successfull")
                        }, 100);
                        
                    } catch (error) {
                        console.log(error.response.data);
                        alert(error.response.data.msg);
                    }
                    
                }}
                >Initiate Transfer</button>
            </div>
        </div>
    )
}