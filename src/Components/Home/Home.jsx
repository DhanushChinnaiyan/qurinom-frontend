import React, { useEffect } from 'react'
import { decodeToken } from 'react-jwt';
import { useNavigate } from 'react-router-dom';
import Base from '../Base/Base';
import Tasks from '../Tasks/Tasks';

const Home = () => {

    const navigate = useNavigate()

    const checkUserToken = () => {
        const userToken = localStorage.getItem("userToken");
    
        if (!userToken) {
          navigate("/login", { replace: true });
        } else {
          try {
            const user = decodeToken(userToken).user;
    
            if(!user._id){
              localStorage.removeItem("userToken");
              navigate("/login", { replace: true }); 
            }
    
          } catch (error) {
    
            console.error("Error decoding token:", error);
            navigate("/login", { replace: true }); 
          }
        }
    }

    useEffect(() => {
        checkUserToken()
      }, [])

  return (
    <Base>
       <div>
        <Tasks/>
       </div>
    </Base>
  )
}

export default Home