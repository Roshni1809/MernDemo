import React,{useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";

const SignUp=({setAuth,auth})=>{

    const[name,setName]=useState("");
    const[email,setEmail]=useState("")
    const[pwd,setPwd]=useState("")

    const navigate=useNavigate();
   
      useEffect(() => {
    if(auth)
    {
    navigate('/add')
    }
   
  }, [auth]);


    const handleClick=()=>{
       setName("")
       setEmail("")
       setPwd("")
       const sendData=async()=>{
        const result=await fetch("http://localhost:5000/register",{
            method:"post",
            body:JSON.stringify({name,email,pwd}),
            headers:{
                "Content-Type":"application/json"
            }
        })
       var res=await result.json();
      //  console.log(res)
       localStorage.setItem('user',JSON.stringify(res?.data));
       localStorage.setItem('token',JSON.stringify(res?.auth));
       setAuth(localStorage.getItem('user'))
       }

       sendData();
       
    }
    return(

    <div className="main">
     <h3>Register Here</h3>
     <input type="text" onChange={(e)=>(setName(e.target.value))} placeholder="Enter your name" value={name} className="subclass"/>
     <input type="text" onChange={(e)=>(setEmail(e.target.value))} placeholder="Enter your email" value={email} className="subclass" />
     <input type="text" onChange={(e)=>(setPwd(e.target.value))} placeholder="Enter password" value={pwd} className="subclass" />
     <button type="button" onClick={handleClick} className="btn">SignUp</button>
    </div>
    )
}

export default SignUp;