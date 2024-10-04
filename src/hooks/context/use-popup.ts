import { useContext } from 'react'

import { PopupContext } from '@/providers/popup-provider'

const usePopup = () => {
  return useContext(PopupContext)
}

export default usePopup
