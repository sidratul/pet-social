import { Inter } from 'next/font/google'
import React, { ReactNode, useEffect } from 'react'
import { useLayoutContext } from '../BaseLayout';
import { useRouter } from 'next/router';
import { MainNavbar } from './MainNavbar';

const inter = Inter({ subsets: ['latin'] })

export const MainLayout = ({children}: {children: ReactNode}) => {
  const { user } = useLayoutContext();
  const { push } = useRouter();

  useEffect(()=>{
    if(user){
      return;
    }

    push('/login');
  },[user, push]);

  return (
    <main
      className={`min-h-screen bg-gray-100`}
    >
      <MainNavbar/>
      <div className="container mx-auto px-3 lg:px-6 py-3 lg:py-8">
        {children}
      </div>
    </main>
  )
}
