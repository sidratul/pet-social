import React, { useState, createContext, ReactNode, useEffect, useContext } from 'react'
import { UserCredential } from 'firebase/auth';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface BaseLayoutContextProps {
  user?: UserCredential;
  userLogin: (user: UserCredential) => void;
  logout: () => void;
}

const BaseLayoutContext = createContext<BaseLayoutContextProps>({} as BaseLayoutContextProps);

export const BaseLayout = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<UserCredential>();

  const userLogin = (user: UserCredential) => {
    setUser(user);
    setCookie('user', JSON.stringify(user));
  }

  const logout = () => {
    setUser(undefined);
    removeCookie('user');
  }

  useEffect(()=>{
    const user = getCookie('user');
    if(user) {
      setUser(JSON.parse(user));
    }
  },[])

  return (
    <BaseLayoutContext.Provider
      value={{
        user,
        userLogin,
        logout,
      }}
    >
      {children}
      <ToastContainer/>
    </BaseLayoutContext.Provider>
  )
}

export const useLayoutContext = () => useContext(BaseLayoutContext);

