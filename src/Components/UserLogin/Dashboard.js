import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            // Authorization: apiKey,
            "Accept":"application/json",
            "text/plain":"/",
            "Content-Type": "multipart/form-data"}
          
        //   axios.get(url, { headers });
          const url = "https://mernback-6nkm.onrender.com/auth/verify";
          axios.get(url, { headers })
        // axios.get('http://localhost:3001/auth/verify')
        .then(res=> {
            if(res.data.status) {

            } else {
                navigate('/')
            }
            console.log(res)
        })
    }, [])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard