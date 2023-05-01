import { BaseTextInput, Button } from '@/components'
import { Login } from '@/containers/Login';
import { GuestLayout } from '@/layouts/GuestLayout';
import React from 'react'

// export default function Login() {
//   return (
//     <div style={{padding: '20px', display: 'grid', gap: '20px'}}>
//       <Button
//         label='Button'
//         style='primary'
//         size='large'
//         loading
//       />

//       <BaseTextInput
//         type='password'
//         label='label'
//         error='this is an error message'
//         info='Shop name is part of the shop URL going before .my.shopify.com, e.g. for myshop.myshopify.com the shop name is my shop.'
//       />
//     </div>
//   )
// }

export default function LoginPage() {
  return (
    <GuestLayout>
      <Login/>
    </GuestLayout>
  );
}