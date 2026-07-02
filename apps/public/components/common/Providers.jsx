'use client'

import { Toaster } from 'react-hot-toast'

export default function Providers({ children }) {
  return (
    <>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#2D1B3D',
            color: '#FAF7F2',
            borderRadius: '12px',
          },
        }}
      />
    </>
  )
}
