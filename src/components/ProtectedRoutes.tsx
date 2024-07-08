import React, {PropsWithChildren, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

const ProtectedRoutes:React.FC<PropsWithChildren> = ({children}) => {
    const isAthenticated = localStorage.getItem("key")
    const navigate = useNavigate()
    useEffect(()=> {
        if(!isAthenticated){
        navigate('/login') 
        }

    },[isAthenticated,navigate])
  return isAthenticated ? <>{children}</> : null
}

export default ProtectedRoutes;
