export interface ISettingState {
  isCollapsed: boolean
  lang: string
}

export interface ISettingActions {
  setCollapsed: (val: boolean) => void
  setLang: (val: string) => void
  toggleCollapsed: () => void
}
