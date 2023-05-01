import { Inter } from 'next/font/google'
import React, { ReactNode, useEffect } from 'react'
import { useLayoutContext } from './BaseLayout';
import { useRouter } from 'next/router';

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
      <div className="container mx-auto px-6 py-8">
        {children}
      </div>
    </main>
  )
}
