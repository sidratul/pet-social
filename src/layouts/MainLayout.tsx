import { Inter } from 'next/font/google'
import React, { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const MainLayout = ({children}: {children: ReactNode}) => {
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
