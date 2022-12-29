import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({setAuth}) => {

    const [email, setEmail] = useState("")
    const [pwd, setPwd] = useState("")
    const Navigate = useNavigate();

    useEffect(() => {
        let auth = localStorage.getItem('user')
        console.log(auth)
        if (auth) {
            Navigate('/add')
        }
    }, [])
    const handleClick = () => {

        setEmail("")
        setPwd("")

        const postData = async () => {
            let post = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({ email, pwd }),
                headers: { 'Content-Type': 'application/JSON' }
            })

            post = await post.json()
            console.log(post)

            if (post?.auth) {
                localStorage.setItem('user', JSON.stringify(post?.User))
                localStorage.setItem('token', JSON.stringify(post?.auth))
                setAuth(post.auth)
                Navigate('/add')
            }
        }

        postData();
    }
    return (
    <div className="main">
        <h4>Login Here</h4>
        <input type="text" onChange={(e) => (setEmail(e.target.value))} placeholder="Enter your email" value={email} className="subclass"/>
        <input type="text" onChange={(e) => (setPwd(e.target.value))} placeholder="Enter password" value={pwd} className="subclass"/>
        <button type="button" onClick={handleClick} className="btn">Login</button>
    </div>
    )
}
export default Login;