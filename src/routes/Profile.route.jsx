import { GlobalContext } from "../GlobalContext"
import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Profile() {
    const {login, setLogin} = useContext(GlobalContext)  // global login status
    const [userInfo, setUserInfo] = useState([])
    const currentUser = login
    const redirect = useNavigate()
    
    useEffect(() => {
        const fetchUser = async () => {
        const response = await fetch('http://localhost:8000/users');
        const users = await response.json();
        const match = users.find((user) => user.email === currentUser)
        if (match === undefined) {console.log("error with profile - user not found")}
        setUserInfo(match)
        };
        fetchUser();
      }, []);


    return <>
        <h1>Welcome {userInfo.name}</h1>
        <button className="btn btn-primary">Edit account info</button>
        <button className="btn btn-secondary" onClick={()=>{setLogin(null); redirect("/")}}>Logout</button>
    </>
}