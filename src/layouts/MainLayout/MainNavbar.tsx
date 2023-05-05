import React from 'react'
import { useLayoutContext } from '../BaseLayout';

export const MainNavbar = () => {
  const { logout } = useLayoutContext();

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="flex flex-wrap flex-row-reverse items-center mx-auto max-w-screen-xl p-4">
          <div className="flex items-center ">
              <a href="#"
                className="text-sm text-blue-600 dark:text-blue-500"
                onClick={logout}
              >Logout</a>
          </div>
      </div>
  </nav>
  )
}