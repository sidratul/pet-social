import React, { useState, createContext, ReactNode, useEffect, useContext } from 'react'
import { User, UserCredential } from 'firebase/auth';
import { getCookie, setCookie, removeCookie } from 'typescript-cookie';
import { ToastContainer } from 'react-toastify';
import { logout as firebaseLogout } from '@/services/user';
import 'react-toastify/dist/ReactToastify.css';
import { getUserSession } from '@/services/firebase';

interface BaseLayoutContextProps {
  user?: User;
  userLogin: (user: UserCredential) => void;
  logout: () => void;
}

const IDtoken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU3OTMwMjdkYWI0YzcwNmQ2ODg0NGI4MDk2ZTBlYzQzMjYyMjIwMDAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGV0LXNvY2lhbC1mNjllZSIsImF1ZCI6InBldC1zb2NpYWwtZjY5ZWUiLCJhdXRoX3RpbWUiOjE2ODMwMzYyNDcsInVzZXJfaWQiOiJLbzV6am9OQVVJaEN3NDRYTkg3aGRZa3NrZ0kyIiwic3ViIjoiS281empvTkFVSWhDdzQ0WE5IN2hkWWtza2dJMiIsImlhdCI6MTY4MzAzNjI0NywiZXhwIjoxNjgzMDM5ODQ3LCJlbWFpbCI6Im11aGFtbWFkLm1vY2hpQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJtdWhhbW1hZC5tb2NoaUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.T2kWyag6MIUHEbrnLT1GVAjzLgBm4QoOzLuLcWEAV8hABRcdQirmAC8rWqEISYXn5JNdGFXphfuCgrcXzN5Qia3zwlFLOMNLfViMSaSHmfqbWfZNxYpst5cuYdnSjZHNO2HXsC0a447fglYVCdcJDDnwi9Soertd0Fa-xrpUGWy8u175HctVOTVumylS80MEZZ0gE4YRi3rIXf3DwMYMp2og7EBx_rGldt6StJiQTMuWHxgmk6e2xcDnbQakiAkcFiaWhk9N9Ro-5GBl9-EAaFWrtPiDEO5yOM1YulXTT6UVfFMtu2R89Y6G_dgNtkaejN4bf8pi36GU3agnOrwasA";

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

