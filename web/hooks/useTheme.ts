import { Cookie } from '@/tools'
import { useEffect, useState } from 'react'

interface IUseTheme {
  (): [boolean, (theme: string) => void]
}

const themeId = "theme-link"
const useTheme: IUseTheme = () => {
  const [loading, setLoading] = useState(false)

  const setTheme = (theme: string) => {
    const themeHref = `/themes/${theme}.css`
    let link = document.getElementById(themeId) as HTMLLinkElement
    if (!link) {
      link = document.createElement('link')
      link.rel = "stylesheet"
      link.href = themeHref
      link.id = themeId
      document.getElementsByTagName('body')[0].appendChild(link)
    }
    link.href = themeHref
    Cookie.setCookie('theme', theme);
  }

  useEffect(() => {
    let link: any = document.getElementById(themeId)
    if (link) return
    const theme = Cookie.getCookie('theme')
    theme && setTheme(theme)
  }, [])

  return [loading, setTheme]
}

export default useTheme
