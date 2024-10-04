import type { FC, PropsWithChildren } from 'react'
import { createContext } from 'react'

import { Modal, message } from 'antd'
import type { MessageInstance } from 'antd/es/message/interface'
import type { HookAPI } from 'antd/es/modal/useModal'

interface IPopupProviderProps extends PropsWithChildren {}

interface IPopupContext {
  message: MessageInstance
  modal: HookAPI
}

export const PopupContext = createContext<Partial<IPopupContext>>({})

const PopupProvider: FC<IPopupProviderProps> = ({ children }) => {
  const [messageApi, messageContextHolder] = message.useMessage()
  const [modalApi, modalContextHolder] = Modal.useModal()

  return (
    <PopupContext.Provider
      value={{
        message: messageApi,
        modal: modalApi,
      }}
    >
      {messageContextHolder}
      {modalContextHolder}
      {children}
    </PopupContext.Provider>
  )
}

export default PopupProvider
