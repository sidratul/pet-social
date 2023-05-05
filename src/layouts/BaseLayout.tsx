import React, { useState, createContext, ReactNode, useEffect, useContext } from 'react'
import { User, UserCredential } from 'firebase/auth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { firebaseLogout, getUserSession } from '@/services/firebase';

interface BaseLayoutContextProps {
  user?: User;
  userLogin: (user: UserCredential) => void;
  logout: () => void;
}

const BaseLayoutContext = createContext<BaseLayoutContextProps>({} as BaseLayoutContextProps);

export const BaseLayout = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState<User>();

  const userLogin = async (user: UserCredential) => {
    setUser(user.user);
  }

  const logout = () => {
    setUser(undefined);
    firebaseLogout();
  }

  useEffect(()=>{
    getUserSession()
      .then(userData=> setUser(userData))
      .catch(_ => console.log('no user'));
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

