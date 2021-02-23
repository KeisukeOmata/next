import { FC } from 'react'
import { ToastContainer, Flip } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useTheme } from 'next-themes'
import s from './Toast.module.css'

export const Toast: FC = () => {
  const { theme } = useTheme()

  return (
    <ToastContainer
      toastClassName={theme == 'dark' ? s.dark : s.light}
      bodyClassName={'text-sm font-med block p-3'}
      autoClose={3000}
      position="top-center"
      hideProgressBar={true}
      closeOnClick={true}
      draggable={false}
      pauseOnHover={false}
      pauseOnFocusLoss={false}
      transition={Flip}
    />
  )
}
