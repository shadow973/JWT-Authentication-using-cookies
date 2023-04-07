import Cookies from "universal-cookie";
import { useEffect } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
const cookies = new Cookies();
export default function Home() {
  
  const navigate = useNavigate()
  const token = cookies.get("TOKEN");
  useEffect(() => {
    if (!token){
      navigate('/login')
    } else {
      const configuration = {
      method: "get",
      url: "https://localhost:5000/user",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios(configuration)
    console.log(token)
  }
    
    

  }, []);

  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    navigate('/login')
  }

  return (
    <>
      <h1>Hello!</h1>
      <button onClick={logout}>logout</button>
    </>
  )
}