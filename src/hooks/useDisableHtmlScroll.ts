import { useEffect } from 'react'

const useDisableHtmlScroll = (isDisable: boolean) => {
  useEffect(() => {
    const htmlElement = document.getElementsByTagName('html')
    if (!htmlElement) return
    if (!isDisable) {
      return
    }

    htmlElement[0].style.overflowY = 'hidden'

    return () => {
      htmlElement[0].style.overflowY = 'auto'
    }
  }, [isDisable])
}

export default useDisableHtmlScroll
