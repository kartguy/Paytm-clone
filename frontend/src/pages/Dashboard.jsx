import { useRecoilState } from "recoil";
import { AppBar } from "../components/Appbar";
import { Input } from "../components/Input";
import { SearchResults } from "../components/SearchList";
import { balanceAtom, filterAtom, searchListAtom, userAtom } from "../store/dashboard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function DashBoard(){
    const[user,setUser]=useRecoilState(userAtom);
    const[balance,setBalance]=useRecoilState(balanceAtom);
    const[filter,setFilter]=useRecoilState(filterAtom);
    const [userlist,setUserlist]=useRecoilState(searchListAtom);
    const token=localStorage.getItem("token");
    const navigate=useNavigate();

    useEffect(()=>{
        if(!token){
            setTimeout(() => {
                alert("Please Login.")
            }, 100);
            navigate('/signin')
        }
    })

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.post("http://localhost:5000/api/user/me", {
              token
            });
    
            console.log(response.data.msg);
    
            if (response.data.msg === "1") {
              navigate('/signin');
            } else {
              setUser(response.data.result.fName);
            }
          } catch (error) {
            console.log(error.response.data);
          }
        };
    
        fetchData();
      }, []);

    useEffect(()=>{
        axios.get("http://localhost:5000/api/account/balance",{
            headers:{
                Authorization:"Bearer "+token
            }
        }).then(response=>{
            setBalance(response.data.balance)
        })
    })

    let dVal=useDebounce(filter);
    useEffect(()=>{
        axios.get("http://localhost:5000/api/user/bulk",{
            params:{
                filter:filter
            }
        }).then(response=>{
            setUserlist(response.data.users);
        })
        
    },[dVal])
    
    return (
        <div>
            <AppBar name={user} />
            <div className=" p-4">
                <h1 className="text-4xl font-bold">Your Balance: ₹ {balance}</h1>
            </div>

            <div className="p-4">
                <Input name="Users" 
                place="Search Users..." 
                type="search" 
                onChange={(e)=>{
                    setFilter(e.target.value);
                }}
                />
            </div>

            <div className="m-4">
                {userlist.map(user=> <SearchResults 
                fName={user.firstName} 
                lName={user.lastName}
                tag={user.firstName[0].toUpperCase()}
                onClick={()=>{
                    navigate("/send?id="+user.userId+"&name="+user.firstName)
                }} 
                />)}
                
            </div>
            
        </div>
    )
}

function useDebounce(value){
    const[debouncedValue,setDebouncedValue]=useState(value);

    useEffect(()=>{
        let timerID=setTimeout(()=>{
            setDebouncedValue(value);
        },500)

        return ()=>{
            clearTimeout(timerID);
        }
    },[value])

    return debouncedValue;
}