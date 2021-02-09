import { FC, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import Moon from 'components/icons/Moon'
import Sun from 'components/icons/Sun'

export const DarkMode: FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      aria-label="ダークモードとライトモードを入れ替える"
      onClick={() => {
        theme === 'dark' ? setTheme('light') : setTheme('dark')
      }}
    >
      <div>{theme == 'dark' ? <Moon /> : <Sun />}</div>
    </button>
  )
}
