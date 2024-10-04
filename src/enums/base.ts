export enum Order {
  ASC = 'asc', // ascend
  DESC = 'desc', // descend
}

export enum Language {
  TH = 'th', // Thailand / ภาษาไทย / th / th
  EN = 'en', // English / English / en / en
  ZH = 'zh', // China / 中文 / zh / cn
  KM = 'km', // Cambodia / ភាសាខ្មែរ / km / kh
  ID = 'id', // Indonesia / Bahasa Indonesia / id / id
  LO = 'lo', // Laos / ພາສາລາວ / lo / la
  MS = 'ms', // Malaysia / Bahasa Melayu / ms / my
  MY = 'my', // Myanmar / မြန်မာစာ / my / mm
  FIL = 'fil', // Philippines / Filipino / fil / ph
  VI = 'vi', // Vietnam / Tiếng Việt / vi / vn
  PT_BR = 'pt', // Brazil / Português / pt / br
  KO = 'ko', // Korea / 한국어 / ko / kr
  JA = 'ja', // Japan / 日本語 / ja / jp
  PT_PT = 'pt', // Portugal / Português / pt / pt
}

export enum Country {
  TH = 'TH',
  SG = 'SG',
  CN = 'CN',
}

export enum CredentialCurrency {
  THB = 'THB',
  USD = 'USD',
}

export enum Day {
  MONDAY = 'monday',
  TUESDAY = 'tuesday',
  WEDNESDAY = 'wednesday',
  THURSDAY = 'thursday',
  FRIDAY = 'friday',
  SATURDAY = 'saturday',
  SUNDAY = 'sunday',
}

export enum BetType {
  BET = 'bet',
  SETTLE = 'settle',
  CANCEL = 'cancel',
}

export enum ProviderLobbyType {
  GAME_HALL = 'game_hall',
  GAME_LIST = 'game_list',
}

// slot bingo e-casino fish casino graph table sport
export enum ProviderType {
  SLOT = 'slot',
  CASINO = 'casino',
  SPORT = 'sport',
  FISH = 'fish',
  E_CASINO = 'e-casino',
  BINGO = 'bingo',
  GRAPH = 'graph',
  TABLE = 'table',
}

export enum WhiteListIPType {
  API = 'api',
  BACKOFFICE = 'backoffice',
}

export enum CredentialWallet {
  SEAMLESS = 'seamless',
  // TRANSFER = 'transfer',
}
